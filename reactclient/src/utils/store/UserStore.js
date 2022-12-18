import { makeAutoObservable } from "mobx";


class UserStore {
    constructor() {
        this._userId = 0
        this._isAuth = false
        this._isAdmin = false
        this._start = false
        makeAutoObservable(this);
    }

     setUserId(id) {
        this._userId = id;
    }

    setAuth(bool) {
        this._isAuth = bool;
    }

    setAdmin(isAdmin) {
        this._isAdmin = isAdmin;
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

    get isAdmin() {
        return this._isAdmin;
    }

    get isStart() {
        return this._start;
    }
}

export default UserStore;