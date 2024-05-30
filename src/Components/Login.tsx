import React, { useEffect, useState, useRef } from 'react';
import { Divider, Modal } from 'antd';
import { Button, Checkbox, Form, Input, Space, Typography } from 'antd';
import { useAuth } from '../Utils/Login.tsx';
import { Navigate, Outlet } from 'react-router-dom';
import '../css/login.css';
import { Center } from '../Utils/Layout.tsx';
import { NotLoggedIn } from '../Pages/NotLoggedIn.tsx';

const { Text } = Typography;


interface LoginProps {
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsRegisterModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Login = ({ isLoginModalOpen, setIsLoginModalOpen, setIsRegisterModalOpen }: LoginProps) => {
  const { token } = useAuth();

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const [isLoginButtonLoading, setIsLoginButtonLoading] = useState(false);

  const auth = useAuth();
  const handleSubmitEvent = (e) => {
    e.preventDefault();
    const username = usernameRef.current as any;
    const password = passwordRef.current as any;
    if (username && password) {
      const usernameValue = username.input.value;
      const passwordValue = password.input.value;
      if (usernameValue && passwordValue) {
        setIsLoginButtonLoading(true); 
        auth.loginAction({ username: usernameValue, password: passwordValue}, setIsLoginButtonLoading);
        return;
      }
    }
  };

  // when the token changes, set loading to false and close the modal
  useEffect(() => {
    setIsLoginButtonLoading(false);
    setIsLoginModalOpen(false);
  }, [token]);

  return (
    <Modal centered title={<Center>Login to LifeManager</Center>} open={isLoginModalOpen} footer={null} onCancel={() => setIsLoginModalOpen(false)}>
      <Form
        name="login"
        autoComplete="false"
      >
        <Space direction='vertical' size={20} style={{ width: '100%', marginTop: '24px' }}>
          <Input 
            placeholder='Enter your username'
            name='username'
            autoComplete='false' 
            style={{ width: '100%' }}
            ref={usernameRef}
          />

          <Input.Password
            placeholder='Enter your password'
            name='password'
            autoComplete='false'
            style={{ width: '100%' }}
            ref={passwordRef}
          />

          <Space direction='horizontal' style={{ width: '100%', justifyContent: 'space-between' }}>
            <Checkbox>Remember me</Checkbox>
            <Text style={{ color: 'blue' }}>Forgot password?</Text>
          </Space>

          <Button type="primary" htmlType="submit" style={{ width: '100%' }} onClick={(e)=> {handleSubmitEvent(e)}} loading={isLoginButtonLoading}>Login</Button>
        </Space>
      </Form>
      <Divider />
      <>
        <Center>
          <Space direction='horizontal'>
            <Text>Don't have an account?</Text>
            <Text style={{ color: 'blue', cursor: 'pointer' }} onClick={(e) => {setIsLoginModalOpen(false); setIsRegisterModalOpen(true) }}>Sign up</Text>
          </Space>
        </Center>
      </>
    </Modal>
  )
};

export const PrivateRoute = () => {
  const user = useAuth();
  if (!user.token) return <NotLoggedIn />;
  return <Outlet />;
}