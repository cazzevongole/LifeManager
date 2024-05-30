import React, { useEffect, useState } from 'react';
import { Divider, FormProps, Modal } from 'antd';
import { Button, Checkbox, Col, Form, Input, Row, Space, Typography } from 'antd';
import { useAuth } from '../Utils/Login.tsx';
import { Navigate, Outlet } from 'react-router-dom';
import '../css/login.css';
import { Center, useCSS } from '../Utils/Layout.tsx';

const { Title, Text } = Typography;

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

interface LoginProps {
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsRegisterModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Login = ({ isLoginModalOpen, setIsLoginModalOpen, setIsRegisterModalOpen }: LoginProps) => {
  const { token, user, loginAction, logOut } = useAuth();

  const background = useCSS('background');
  const color = useCSS('color');

  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [isLoginButtonLoading, setIsLoginButtonLoading] = useState(false);
  const [isLoginButtonEnabled, setIsLoginButtonEnabled] = useState(false);

  const auth = useAuth();
  const handleSubmitEvent = (e) => {
    e.preventDefault();
    if (input.username !== "" && input.password !== "") {
      auth.loginAction(input);
      return;
    }
  };

  // when the token changes, set loading to false and close the modal
  useEffect(() => {
    setIsLoginButtonLoading(false);
    setIsLoginModalOpen(false);
  }, [token]);

  useEffect(() => {
    if (input.username !== "" && input.password !== "") {
      setIsLoginButtonEnabled(true);
    } else {
      setIsLoginButtonEnabled(false);
    }
  }, [input]);

  return (
    <Modal centered title={<Center>Login to start using LifeManager services!</Center>} open={isLoginModalOpen} footer={null} onCancel={() => setIsLoginModalOpen(false)}>
      <Form
        name="login"
        autoComplete="off"
      >
        <Space direction='vertical' size={20} style={{ width: '100%', marginTop: '24px' }}>
          <Input autoComplete='username' onChange={(e) => setInput((prevInput) => { return { ...prevInput, username: e.target.value } })} style={{ width: '100%' }} />

          <Input.Password autoComplete='current-password' onChange={(e) => setInput((prevInput) => { return { ...prevInput, password: e.target.value } })} style={{ width: '100%' }} />

          <Space direction='horizontal' style={{ width: '100%', justifyContent: 'space-between' }}>
            <Checkbox>Remember me</Checkbox>
            <Text style={{ color: 'blue' }}>Forgot password?</Text>
          </Space>

          <Button type="primary" htmlType="submit" style={{ width: '100%' }} onClick={(e)=> {setIsLoginButtonLoading(true); handleSubmitEvent(e)}} loading={isLoginButtonLoading} disabled={!isLoginButtonEnabled}>Login</Button>
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
  if (!user.token) return <Navigate to="/not-logged-in" />;
  return <Outlet />;
}