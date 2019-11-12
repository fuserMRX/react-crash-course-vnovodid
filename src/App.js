import React from 'react';
import axios from 'axios';
import Profile from './Profile';
import './App.css';

const CancelToken = axios.CancelToken;
let cancel;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.sendRequest = this.sendRequest.bind(this);
  }

  state = {
    data: null,
    error: null
  }

  async sendRequest() {
    try {
      const response = await axios.get('https://randomuser.me/api/', {
        cancelToken: new CancelToken( function executor(c) {
          cancel = c;
        })
      });
      const user = response.data.results[0];
      this.setState({
        data: {
          avatar: user.picture.large,
          email: user.email,
        },
        error: null
      });
      console.log(response);
    } catch (error) {
      if (axios.isCancel(error)) {
        this.setState({
          data: null,
          error: error.message
        });
        console.log(error.message);
      }
      console.error(error);
    }
  }

  interruptRequest = () => {
    cancel('Operation canceled by the user.');
  }

  render() {
    const { data, error } = this.state;
    return (
      <>
        <Profile sendRequest={this.sendRequest} interruptRequest={this.interruptRequest} data={data} error={error} />
      </>
    )
  }
}

export default App;
