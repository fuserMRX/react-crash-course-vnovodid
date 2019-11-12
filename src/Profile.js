import React from 'react';

class Profile extends React.Component {
    render() {
        const { sendRequest, interruptRequest, data, error } = this.props;
        return (
            <div>
                <>
                    <div> request response app! </div>
                    <button onClick={sendRequest}>Send request to people api</button>
                    <button onClick={interruptRequest}>Interrupt Request</button><br />

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
        )
    }
}

export default Profile;