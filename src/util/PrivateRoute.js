import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { inject, observer } from "mobx-react";

export default
@inject('userStore', 'commonStore')
@observer
class PrivateRoute extends React.Component {
    render() {
        const { userStore, ...restProps } = this.props;

        if (userStore.currentUser) {
            return <Route exact {...restProps} />;
        }

        return <Redirect to="/login" />;
    }
}
