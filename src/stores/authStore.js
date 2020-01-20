import { observable, action } from 'mobx';
import agent from '../agent';
import userStore from './userStore';
import commonStore from './commonStore';

class AuthStore {
    @observable inProgress = false;
    @observable errors = undefined;

    @observable user = {
        id: undefined,
        email: '',
        password: '',
        nickName: '',
        address: '',
        job: '',
        phone: '',
        minAge: undefined,
        maxAge: undefined,
    };

    @action setEmail(email) {
        this.user.email = email;
    }

    @action setPassword(password) {
        this.user.password = password;
    }

    @action reset() {
        this.user.email = '';
        this.user.password = '';
    }

    @action login() {
        this.inProgress = true;
        this.errors = undefined;

        return agent.Auth.login(this.user.email, this.user.password)
            .then(({ loginInfo }) => commonStore.setToken(loginInfo.token))
            .then(() => userStore.pullUser())
            .catch(action((err) => {
                this.errors = err.response && err.response.body && err.response.body.errors;
                throw err;
            }))
            .finally(action(() => { this.inProgress = false; }));
    }

    @action register() {
        this.inProgress = true;
        this.errors = undefined;
        return agent.Auth.register(this.user.email, this.user.password)
            .then(({ user }) => commonStore.setToken(user.token))
            .then(() => userStore.pullUser())
            .catch(action((err) => {
                this.errors = err.response && err.response.body && err.response.body.errors;
                throw err;
            }))
            .finally(action(() => { this.inProgress = false; }));
    }

    @action logout() {
        commonStore.setToken(undefined);
        userStore.forgetUser();
        return Promise.resolve();
    }
}

export default new AuthStore();
