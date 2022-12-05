import { makeAutoObservable } from "mobx";


class UserStore {
    constructor() {
        this._isAuth = false
        this._isAdmin = false
        this._start = false
        makeAutoObservable(this);
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