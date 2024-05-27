import React, { useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
import { useAuth } from '../Utils/Login.tsx';
import { Navigate, Outlet } from 'react-router-dom';
import '../css/login.css';

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

export const Login = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const auth = useAuth();
  const handleSubmitEvent = (e) => {
    e.preventDefault();
    if (input.username !== "" && input.password !== "") {
      auth.loginAction(input);
      return;
    }
    alert("please provide a valid input");
  };

  return (
    <Row justify="center" align="middle">
      <Col xs={24} md={16}>
        <Form
          name="login"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>

  )
};

export const PrivateRoute = () => {
  const user = useAuth();
  if (!user.token) return <Navigate to="/login" />;
  return <Outlet />;
}