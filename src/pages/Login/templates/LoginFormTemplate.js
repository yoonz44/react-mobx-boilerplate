import React from 'react';
import '../style/css/login.css';
import {inject, observer} from "mobx-react";
import {withRouter} from 'react-router-dom';

const LoginFormTemplate = inject('authStore')(observer((props) => {
    const { errors, inProgress } = props.authStore;

    const handleSubmitForm = (e) => {
        e.preventDefault();
        props.authStore.login()
            .then(() => {
                if (errors) {
                    alert(errors);
                } else {
                    alert('로그인 완료');
                }

                props.history.replace('/')
            });
    };

    const handleEmailChange = (e) => {
        props.authStore.setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        props.authStore.setPassword(e.target.value);
    };

    return (
        <div className="wrap_login">
            <div className="contents">
                <form onSubmit={handleSubmitForm}>
                    <img src={require("../style/img/form_bt.svg")} alt="배경이미지"/>
                    <div className="container">
                        <fieldset className="email">
                            <input type="email" placeholder="이메일" onChange={handleEmailChange}/>
                            <img src={require("../style/img/user.png")} alt="user"/>
                        </fieldset>
                        <fieldset className="password">
                            <input type="password" placeholder="password" onChange={handlePasswordChange}/>
                            <img src={require("../style/img/lock.png")} alt="lock"/>
                        </fieldset>
                    </div>

                    <div className="bt_container">
                        <button type="submit" disabled={inProgress}>
                            <div className="text">로그인</div>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}));

export default withRouter(LoginFormTemplate);
