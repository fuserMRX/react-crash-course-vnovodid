import React, { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import { Color } from './Color';
import './App.css';
// import Profile from './Profile'; // simple import 
const Profile = React.lazy(() => import('./Profile')); // dynamic import


const CancelToken = axios.CancelToken;
let cancel;


export default function App() {

  const [state, setState] = useState({
    data: null, 
    error: null,
    color: 'coral',
  });

  const sendRequest = async () => {
    try {
      const response = await axios.get('https://randomuser.me/api/', {
        cancelToken: new CancelToken( function executor(c) {
          cancel = c;
        })
      });
      const user = response.data.results[0];
      setState({
        data: {
          avatar: user.picture.large,
          email: user.email,
        },
        error: null
      });
      console.log(response);
    } catch (error) {
      if (axios.isCancel(error)) {
        setState({
          data: null,
          error: error.message
        });
        console.log(error.message);
      }
      console.error(error);
    }
  }


  const interruptRequest = () => {
    cancel('Operation canceled by the user.');
  }

  useEffect( () => {
    return () => {
      interruptRequest();
    }
  })

  const handleChangeColor = (value) => {
    setState({
      data: state.data,
      erorr: state.error,
      color: value
    });
  };

    return (
      <>
      <Suspense fallback={<div>Loading...</div>}>
        {/* If provider here won't be present then we will take red value from Color.js default context value in Consumer*/}
        <Color.Provider value={state.color}>
          <Profile sendRequest={sendRequest}
                  interruptRequest={interruptRequest}
                  data={state.data}
                  error={state.error}
                  handleChangeColor={handleChangeColor}
                  />
        </Color.Provider>
      </Suspense>
      </>
    )
}
