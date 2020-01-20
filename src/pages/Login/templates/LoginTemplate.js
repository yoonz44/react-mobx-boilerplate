import React from 'react';
import '../style/css/main_login.css';
import {useHistory} from "react-router-dom";

const LoginTemplate = (props) => {
    const history = useHistory();

    const goLogin = () => {
        history.push('/login/form');
    };

    return (
        <div className="wrap_main_login">
            <div className="contents">
                <div className="mid_text">
                    <div className="container">
                        Boiler plate <span>, 보일러 플레이트</span>
                    </div>
                </div>

                <div className="button_box">
                    <button type="button" className="container" onClick={goLogin}>
                        <img src={require("../style/img/rounded-rectangle-10-copy-4.svg")} alt="로그인하기"/>
                        <div className="text">로그인하기</div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginTemplate;
