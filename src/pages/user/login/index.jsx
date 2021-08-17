import { Alert, Checkbox } from 'antd';
import React, { useState } from 'react';
import { AlipayCircleOutlined, WechatOutlined } from '@ant-design/icons';
import { Link, connect } from 'umi';
import LoginForm from './components/Login';
import styles from './style.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginForm;
const LoginMessage = ({ content }) => (
    <Alert
        style={{
            marginBottom: 24,
        }}
        message={content}
        type="error"
        showIcon
    />
);

const Login = (props) => {
    const { userLogin = {}, submitting } = props;
    const { status, type: loginType, msg } = userLogin;
    const [autoLogin, setAutoLogin] = useState(true);
    const [type, setType] = useState('account');

    const handleSubmit = (values) => {
        const { dispatch } = props;
        dispatch({
            type: 'login/login',
            payload: { ...values, type, autoLogin },
        });
    };

    return (
        <div className={styles.main}>
            <LoginForm activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
                <Tab key="account" tab="账户密码登录">
                    {status === 0 && loginType === 'account' && !submitting && (
                        <LoginMessage content={msg} />
                    )}

                    <UserName
                        name="username"
                        placeholder="用户名"
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名!',
                            },
                        ]}
                    />
                    <Password
                        name="password"
                        placeholder="密码"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码！',
                            },
                        ]}
                    />
                </Tab>
                <div>
                    <Checkbox checked={autoLogin} onChange={(e) => setAutoLogin(e.target.checked)}>
                        自动登录
                    </Checkbox>
                    <a
                        style={{
                            float: 'right',
                        }}
                    >
                        忘记密码
                    </a>
                </div>
                <Submit loading={submitting}>登录</Submit>

                <div className={styles.other}>
                    其他登录方式
                    <WechatOutlined className={styles.icon} />
                    <AlipayCircleOutlined className={styles.icon} />
                    <Link className={styles.register} to="/user/register">
                        注册账户
                    </Link>
                </div>
            </LoginForm>
        </div>
    );
};

export default connect(({ login, loading }) => ({
    userLogin: login,
    submitting: loading.effects['login/login'],
}))(Login);
