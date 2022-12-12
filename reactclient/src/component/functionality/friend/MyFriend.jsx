import React from 'react'

const MyFriend = () => {

    return (
        <div className='col-md'>
            <div className='col-md'>
                <input type="text" className="form-control" placeholder="Искать друга" />
            </div>
            <div className='col-md' style={{ marginTop: '1%' }}>
                <div style={{ border: '1px solid black', borderRadius: 8, paddingBottom: '5%'}}>
                    <div className="row-md">
                        <div className="row">
                            <div className="col-md-1">
                                <img src="Hokage.png" style={{ cursor: 'pointer', borderRadius: 500, height: 80, width: 80, objectFit: 'cover', marginLeft: '35%', marginTop: '30%' }} />
                            </div>
                            <div className='col-md' style={{ fontSize: '14pt', marginLeft: '5%', marginTop: '1%' }}>
                                <div className='row-md'>
                                    Стречко Станислав
                                </div>
                            </div>
                            <div className='row-md offset-md-9' >
                                <button className='btn btn-primary' style={{ marginLeft: '1%' }}>Удалить из друзей</button>
                            </div>
                            <div className='row-md'>
                                <hr style={{ height: '0.5%', border: '0 none', color: 'black', backgroundColor: 'black', marginLeft: '2%', marginRight: '2%' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyFriend;