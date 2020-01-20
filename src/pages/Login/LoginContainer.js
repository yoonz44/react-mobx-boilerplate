import React from "react";
import { LoginTemplate, LoginFormTemplate } from "./templates";
import {inject} from "mobx-react";
import {withRouter, Redirect, Route} from "react-router-dom";

export default
@inject('userStore')
@withRouter
class LoginContainer extends React.Component {
    render() {
        if (this.props.userStore.currentUser) {
            return <Redirect to='/'/>;
        }

        const { match } = this.props;

        return (
            <>
                <Route exact path={match.url} render={() => {
                    return <LoginTemplate/>;
                }}/>
                <Route path={`${match.url}/form`} component={LoginFormTemplate}/>
            </>
        )
    }
}
