import React from "react";
import { MainTemplate } from "./templates";
import {withRouter, Route} from "react-router-dom";

export default
@withRouter
class MainContainer extends React.Component {
    render() {
        const { match } = this.props;

        return (
            <>
                <Route exact path={match.url} component={MainTemplate}/>
            </>
        )
    }
}
