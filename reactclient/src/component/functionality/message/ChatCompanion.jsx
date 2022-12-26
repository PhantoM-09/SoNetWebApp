import React from 'react'

const ChatCompanion = ({chatCompanion}) => {

    return (
        <div className='row-md'>
            <div className="row">
                <div className="col-md-1">
                    <img src={'https://localhost:7132/' + chatCompanion.userProfileImage
                    } style={{ cursor: 'pointer', borderRadius: 500, height: 70, width: 70, objectFit: 'cover', marginLeft: '35%', marginTop: '30%' }}  />
                </div>
                <div className='col-md' style={{ fontSize: '14pt', marginLeft: '3%', marginTop: '1%' }}>
                    <div className='row-md'>
                        {chatCompanion.userLastName + ' ' + chatCompanion.userName}
                    </div>
                </div>
                <div className='row-md'>
                    <hr style={{ height: '0.5%', border: '0 none', color: 'black', backgroundColor: 'black'}} />
                </div>
            </div>
        </div>
    );
}


export default ChatCompanion;