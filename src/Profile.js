import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, handleChangeColor, interruptRequest } from './rootReducer';
import ProfilePortalBlock from './ProfilePortalBlock';

function Profile(props) {

        const color = useSelector(state => state.color);
        const data = useSelector(state => state.data);
        const error = useSelector(state => state.error);
        const loading = useSelector(state => state.loading);

        const dispatch = useDispatch();

        const inputRef = React.createRef();

        const handleFocus = () => {
            inputRef.current.focus();
        };

        return (
            <>
            {/* <ProfilePortalBlock> */}
                <div style={{borderColor: color, borderStyle: 'solid'}}>
                    <>
                        <div> request response app! </div>
                        <button style={{borderColor: 'green', color:'green'}} onClick={() => dispatch(handleChangeColor('green'))}>Change border color to green</button>
                        <button style={{borderColor: 'violet', color:'violet'}} onClick={() => dispatch(handleChangeColor('violet'))}>Change border color to violet</button><br/>
                        <button class='btn-start' onClick={() => {dispatch(fetchUsers()); handleFocus()}}>Send request to people api</button>
                        <button ref={inputRef} class='btn-stop' onClick={ () => dispatch(interruptRequest())}>Interrupt Request</button><br />

                        <h3>{loading ? 'Loading user...' : ''}</h3>

                        {data && (
                            <>
                                <img class ='user-image' src={data.picture.large} alt='Avatar' />
                                <h2 class='user-email'>{data.email}</h2>
                            </>
                        )}
                        {error && (
                            <>
                                <h2>{error}</h2>
                                <button onClick={() => dispatch(fetchUsers())}>Send Request one more time</button><br />
                            </>
                        )}
                    </>
                </div>
            {/* </ProfilePortalBlock> */}
            </>
        )
}

export default Profile;