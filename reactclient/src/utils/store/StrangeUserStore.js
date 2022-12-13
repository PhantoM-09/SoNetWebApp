import { makeAutoObservable } from "mobx";


class StrangeUserStore {
    constructor() {
        this._userId = 0
        makeAutoObservable(this);
    }

    setUserId(id) {
        this._userId = id;
    }

    get UserId() {
        return this._userId;
    }
}

export default StrangeUserStore;