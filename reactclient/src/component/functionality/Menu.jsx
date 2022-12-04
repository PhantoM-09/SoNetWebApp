import React, {useState} from "react";

const Menu = () =>{
    return(
        <div className="col-md-2">
        <div className="row">
            <div className="col-md-12">
            <div className="d-flex align-items-left">
            <div className="nav nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <button className="nav-link active col-md-12" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">
                
                    <div  style={{fontSize:'12pt', marginLeft: '-2em'}}>
                        Мой профиль
                    </div>
                </button>
                <button className="nav-link col-md-12" id="v-pills-friends-tab" data-bs-toggle="pill" data-bs-target="#v-pills-friends" type="button" role="tab" aria-controls="v-pills-friends" aria-selected="false">
                
                    <div  style={{fontSize:'12pt', marginLeft: '-5em'}}>
                        Друзья
                    </div>
                </button>
                <button className="nav-link col-md-12" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">
                
                    <div  style={{fontSize:'12pt', marginLeft: '-3em'}}>
                        Сообщения
                    </div>
                </button>
            </div>
            </div>
        </div>
    </div>
</div>
    );
}

export default Menu;