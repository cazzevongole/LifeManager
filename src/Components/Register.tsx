import React, { useEffect, useState } from 'react';
import { Divider, FormProps, Modal } from 'antd';
import { Button, Checkbox, Col, Form, Input, Row, Space, Typography } from 'antd';
import { useAuth } from '../Utils/Login.tsx';
import { Navigate, Outlet } from 'react-router-dom';
import '../css/login.css';
import { Center, useCSS } from '../Utils/Layout.tsx';
import { MailOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title, Text } = Typography;

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

interface LoginProps {
  isRegisterModalOpen: boolean;
  setIsRegisterModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PasswordIcon = () => (
  <span role="img" aria-label="mail" className="anticon anticon-mail site-form-item-icon">
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14" height="14" viewBox="0 0 30 30"> <path d="M 15 2 C 11.145666 2 8 5.1456661 8 9 L 8 11 L 6 11 C 4.895 11 4 11.895 4 13 L 4 25 C 4 26.105 4.895 27 6 27 L 24 27 C 25.105 27 26 26.105 26 25 L 26 13 C 26 11.895 25.105 11 24 11 L 22 11 L 22 9 C 22 5.2715823 19.036581 2.2685653 15.355469 2.0722656 A 1.0001 1.0001 0 0 0 15 2 z M 15 4 C 17.773666 4 20 6.2263339 20 9 L 20 11 L 10 11 L 10 9 C 10 6.2263339 12.226334 4 15 4 z M 9 17 C 10.105 17 11 17.895 11 19 C 11 20.104 10.105 21 9 21 C 7.895 21 7 20.104 7 19 C 7 17.895 7.895 17 9 17 z M 15 17 C 16.105 17 17 17.895 17 19 C 17 20.104 16.105 21 15 21 C 13.895 21 13 20.104 13 19 C 13 17.895 13.895 17 15 17 z M 21 17 C 22.105 17 23 17.895 23 19 C 23 20.104 22.105 21 21 21 C 19.895 21 19 20.104 19 19 C 19 17.895 19.895 17 21 17 z"></path> </svg>
  </span>
)

export const Register = ({ isRegisterModalOpen, setIsRegisterModalOpen }: LoginProps) => {

  const background = useCSS('background');
  const color = useCSS('color');

  const [input, setInput] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [isRegisterButtonEnabled, setIsRegisterButtonEnabled] = useState(false);
  const [isRegisterButtonLoading, setIsRegisterButtonLoading] = useState(false);
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);

  useEffect(() => {
    if (input.username !== "" && input.password !== "" && input.email !== "" && isPasswordConfirmed) {
      setIsRegisterButtonEnabled(true);
    } else {
      setIsRegisterButtonEnabled(false);
    }
  }, [input]);

  const handleSubmitEvent = async (e) => {
    try {
      const response = await axios.post("https://3vnbn7to7a.execute-api.eu-north-1.amazonaws.com/dev/auth/register", input, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = response.data;
      if (res.user) {
        const user = res.user;
        console.log(user);
        // setSpin && setSpin(false);
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    } finally {
      setIsRegisterButtonLoading(false);
      setIsRegisterModalOpen(false);
    }
    

  };

  return (
    <Modal centered title={<Center>Register to LifeManager!</Center>} open={isRegisterModalOpen} footer={null} onCancel={() => setIsRegisterModalOpen(false)}>
      <Form name="register">
        <Space direction='vertical' size={20} style={{ width: '100%', marginTop: '24px' }}>
          <Input
            placeholder='Enter your username'
            autoComplete='off'
            name='username'
            onChange={(e) => setInput((prevInput) => { return { ...prevInput, username: e.target.value } })}
            style={{ width: '100%' }}
            prefix={<UserOutlined className="site-form-item-icon" />}
          />
          <Input
            placeholder='Enter your email'
            autoComplete='off'
            name='email'
            onChange={(e) => setInput((prevInput) => { return { ...prevInput, email: e.target.value } })}
            style={{ width: '100%' }}
            prefix={<MailOutlined className="site-form-item-icon" />}
          />

          <Input.Password
            placeholder='Enter your password'
            autoComplete='off'
            name='password'
            onChange={(e) => setInput((prevInput) => { return { ...prevInput, password: e.target.value } })}
            style={{ width: '100%' }}
            prefix={<PasswordIcon />}
          />
          <Input.Password
            placeholder='Confirm your password'
            autoComplete='off'
            name='confirm-password'
            onChange={(e) => (e.target.value === input.password ? setIsPasswordConfirmed(true) : setIsPasswordConfirmed(false))}
            style={{ width: '100%' }}
            prefix={<PasswordIcon />}
            status={isPasswordConfirmed ? undefined : 'error'}
          />

          <Button 
            type="primary" 
            htmlType="submit" 
            style={{ width: '100%' }} 
            onClick={(e)=> {setIsRegisterButtonLoading(true); handleSubmitEvent(e)}} 
            disabled={!isRegisterButtonEnabled}
            loading={isRegisterButtonLoading}
          >
            Register
          </Button>
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