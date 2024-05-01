import React from 'react';
import Login from '@react-login-page/page4';

const css = {
  '--login-bg': '#f3f2f2',
  '--login-color': '#333',
  '--login-logo': '#fff',
  '--login-inner-bg': '#fff',
  '--login-banner-bg': '#fbfbfb',
  '--login-input': '#333',
  '--login-input-icon': '#dddddd',
  '--login-input-bg': 'transparent',
  '--login-input-border': 'rgba(0, 0, 0, 0.13)',
  '--login-input-placeholder': '#999999',
  '--login-btn': '#fff',
  '--login-btn-bg': '#b08bf8',
  '--login-btn-bg-focus': '#b08bf8',
  '--login-btn-bg-hover': '#b08bf8',
  '--login-btn-bg-active': '#b08bf8',
};

// const Login2 = () => <Login style={{ height: 380, ...css }} />;
export default function Login2() {
    return(
        <Login style={{ height: 380, ...css }} />
    )
}

// export default Login2;
