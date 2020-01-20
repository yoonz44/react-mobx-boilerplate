import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {inject, observer} from "mobx-react";
import LoginContainer from './pages/Login/LoginContainer';
import PrivateRoute from "./util/PrivateRoute";
import MainContainer from "./pages/Main/MainContainer";

export default
@inject('userStore', 'commonStore', 'authStore')
@withRouter
@observer
class App extends React.Component {
    async componentDidMount() {
        if (this.props.commonStore.token) {
            await this.props.userStore.pullUser()
                .then(() => this.props.commonStore.setAppLoaded());
        } else {
            await this.props.commonStore.setAppLoaded();
        }
    }

    render() {
        if (this.props.commonStore.appLoaded) {
            return (
                <Switch>
                    <Route path='/login' component={LoginContainer}/>
                    <PrivateRoute path='/' component={MainContainer}/>
                </Switch>
            );
        }

        return (
            <>
                Loading
            </>
        );
    }
}
