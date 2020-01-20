import { observable, action, reaction } from "mobx";

class CommonStore {
    @observable appName = 'blank';
    @observable token = window.localStorage.getItem('yj_token');
    @observable appLoaded = false;
    @observable tags = [];
    @observable isLoadingTags = false;

    constructor() {
        reaction(
            () => this.token,
            token => {
                if (token) {
                    window.localStorage.setItem('yj_token', token);
                } else {
                    window.localStorage.removeItem('yj_token');
                }
            }
        );
    }

    @action setToken(token) {
        this.token = token;
    }

    @action setAppLoaded() {
        this.appLoaded = true;
    }
}

export default new CommonStore();
