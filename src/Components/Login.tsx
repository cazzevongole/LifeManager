import React, { useState } from 'react';
import { FormProps, Modal } from 'antd';
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
}

export const Login = ({ isLoginModalOpen, setIsLoginModalOpen }: LoginProps) => {
  const { token, user, loginAction, logOut } = useAuth();

  const background = useCSS('background');
  const color = useCSS('color');

  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const auth = useAuth();
  const handleSubmitEvent = (e) => {
    e.preventDefault();
    if (input.username !== "" && input.password !== "") {
      auth.loginAction(input);
      setIsLoginModalOpen(false);
      return;
    }
  };

  return (
    <Modal title={<Center>Login to start using LifeManager services!</Center>} open={isLoginModalOpen} okText="Login" onOk={handleSubmitEvent} onCancel={() => setIsLoginModalOpen(false)}>


      <Form
        name="login"
        autoComplete="off"
        onSubmitCapture={handleSubmitEvent}
      >
        <Space direction='vertical' size={10} style={{ width: '100%', marginTop: '24px' }}>
          <Row justify='space-between'>
            <Col span={8}>
              <Text>Username:</Text>
            </Col>
            <Col span={16}>
              <Input onChange={(e) => setInput((prevInput) => { return { ...prevInput, username: e.target.value } })} />
            </Col>
          </Row>

          <Row justify='space-between'>
            <Col span={8}>
              <Text>Password:</Text>
            </Col>
            <Col span={16}>
              <Input.Password autoComplete={'off'} onChange={(e) => setInput((prevInput) => { return { ...prevInput, password: e.target.value } })} />
            </Col>
          </Row>

          <Row>
            <Col span={24} offset={8}>
              <Checkbox>Remember me</Checkbox>
            </Col>
          </Row>
        </Space>
      </Form>
    </Modal>
  )
};

export const PrivateRoute = () => {
  const user = useAuth();
  if (!user.token) return <Navigate to="/not-logged-in" />;
  return <Outlet />;
}