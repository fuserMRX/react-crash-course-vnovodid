import React, { useContext } from 'react';
import { withColor } from './Color'; // Approach with HOC
import { Color } from './Color';
import ProfilePortalBlock from './ProfilePortalBlock';

function Profile(props) {
        const myCtx = useContext(Color);
        const inputRef = React.createRef();
        const { sendRequest, interruptRequest, data, error, handleChangeColor} = props;

        const handleFocus = () => {
            inputRef.current.focus();
        };

        return (
            <>
            <ProfilePortalBlock>
                {/* // <div style={{borderColor: this.props.color, borderStyle: 'solid'}}> // Approach with HOC */}
                <div style={{borderColor: myCtx, borderStyle: 'solid'}}>
                    <>
                        <div> request response app! </div>
                        <button style={{borderColor: 'green', color:'green'}} onClick={() => handleChangeColor('green')}>Change border color to green</button>
                        <button style={{borderColor: 'violet', color:'violet'}} onClick={() => handleChangeColor('violet')}>Change border color to violet</button><br/>
                        <button onClick={() => {sendRequest(); handleFocus()}}>Send request to people api</button>
                        <button ref={inputRef} onClick={interruptRequest}>Interrupt Request</button><br />

                        {data && (
                            <>
                                <img src={data.avatar} alt='Avatar' />
                                <h2>{data.email}</h2>
                            </>
                        )}
                        {error && (
                            <>
                                <h2>{error}</h2>
                                <button onClick={sendRequest}>Send Request one more time</button><br />
                            </>
                        )}
                    </>
                </div>
            </ProfilePortalBlock>
            </>
        )
}

// Approach with HOC
// export default withColor(Profile); 
export default Profile;