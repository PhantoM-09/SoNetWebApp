import {makeAutoObservable} from "mobx";

class UserStore {
    constructor() {
        this._isAuth = false
        makeAutoObservable(this)
    }

    setIsAuth(isAuth) {
        this._isAuth = isAuth;
    }

    get isAuth() {
        return this._isAuth;
    }
}

export default UserStore;