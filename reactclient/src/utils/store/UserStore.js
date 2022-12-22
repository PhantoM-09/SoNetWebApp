import { makeAutoObservable } from "mobx";


class UserStore {
    constructor() {
        this._userId = 0
        this._isAuth = false
        this._userType = 'User'
        this._start = false
        makeAutoObservable(this);
    }

     setUserId(id) {
        this._userId = id;
    }

    setAuth(bool) {
        this._isAuth = bool;
    }

    setUserType(userType) {
        this._userType = userType;
    }

    setStart(start) {
        this._start = start;
    }

    get userId() {
        return this._userId;
    }

    get isAuth() {
        return this._isAuth;
    }

    get userType() {
        return this._userType;
    }

    get isStart() {
        return this._start;
    }
}

export default UserStore;