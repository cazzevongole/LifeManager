import React, { useEffect, useRef, useState } from 'react';
import { Modal, message } from 'antd';
import { Button, Form, Input, Space } from 'antd';
import { useAuth } from '../Utils/Login.tsx';
import { Navigate, Outlet } from 'react-router-dom';
import '../css/login.css';
import { Center, useCSS } from '../Utils/Layout.tsx';
import { MailOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';

interface LoginProps {
  isRegisterModalOpen: boolean;
  setIsRegisterModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PasswordIcon = () => (
  <span role="img" aria-label="mail" className="anticon anticon-mail site-form-item-icon">
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M 12 1 C 8.636 1 6 3.636 6 7 L 6 8 C 4.9 8 4 8.9 4 10 L 4 20 C 4 21.1 4.9 22 6 22 L 18 22 C 19.1 22 20 21.1 20 20 L 20 10 C 20 8.9 19.1 8 18 8 L 18 7 C 18 3.636 15.364 1 12 1 z M 12 3 C 14.243 3 16 4.757 16 7 L 16 8 L 8 8 L 8 7 C 8 4.757 9.757 3 12 3 z M 6 10 L 18 10 L 18 20 L 6 20 L 6 10 z M 8 14 A 1 1 0 0 0 7 15 A 1 1 0 0 0 8 16 A 1 1 0 0 0 9 15 A 1 1 0 0 0 8 14 z M 12 14 A 1 1 0 0 0 11 15 A 1 1 0 0 0 12 16 A 1 1 0 0 0 13 15 A 1 1 0 0 0 12 14 z M 16 14 A 1 1 0 0 0 15 15 A 1 1 0 0 0 16 16 A 1 1 0 0 0 17 15 A 1 1 0 0 0 16 14 z"></path>
    </svg>
  </span>
)

export const Register = ({ isRegisterModalOpen, setIsRegisterModalOpen }: LoginProps) => {
  const { loginAction } = useAuth();

  const [hasInputChanged, setHasInputChanged] = useState(false);
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);
  const [isRegisterButtonEnabled, setIsRegisterButtonEnabled] = useState(false);
  const [isRegisterButtonLoading, setIsRegisterButtonLoading] = useState(false);

  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  useEffect(() => {
    setIsPasswordConfirmed(passwordRef.current?.input.value === confirmPasswordRef.current?.input.value && passwordRef.current?.input.value !== "");

    setIsRegisterButtonEnabled(
      usernameRef.current?.input.value !== "" && 
      emailRef.current?.input.value !== "" &&
      passwordRef.current?.input.value !== "" &&
      confirmPasswordRef.current?.input.value !== "" &&
      passwordRef.current?.input.value === confirmPasswordRef.current?.input.value
    );
  }, [hasInputChanged]);

  const handleSubmitEvent = async (e) => {
    const username = usernameRef.current as any;
    const password = passwordRef.current as any;
    const email = emailRef.current as any;
    const confirmPassword = confirmPasswordRef.current as any;

    if (!username.input.value || !password.input.value || !email.input.value || !confirmPassword.input.value || !isPasswordConfirmed) return;

    setIsRegisterButtonLoading(true);
    try {
      const response = await axios.post(
        "https://3vnbn7to7a.execute-api.eu-north-1.amazonaws.com/dev/auth/register", 
        {
          username: username.input.value,
          email: email.input.value,
          password: password.input.value,
        }, 
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = response.data;
      if (res.user) {
        message.success(`Registration successful. You can now login, ${res.user.username}!`);
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
            autoComplete='false'
            name='username'
            style={{ width: '100%' }}
            prefix={<UserOutlined className="site-form-item-icon" />}
            onChange={() => setHasInputChanged(!hasInputChanged)}
            ref={usernameRef}
            status={usernameRef.current?.input.value === "" ? 'error' : undefined}
          />
          <Input
            placeholder='Enter your email'
            autoComplete='false'
            name='email'
            style={{ width: '100%' }}
            prefix={<MailOutlined className="site-form-item-icon" />}
            onChange={() => setHasInputChanged(!hasInputChanged)}
            ref={emailRef}
            status={emailRef.current?.input.value === "" ? 'error' : undefined}
          />

          <Input.Password
            placeholder='Enter your password'
            autoComplete='false'
            name='password'
            style={{ width: '100%' }}
            prefix={<PasswordIcon />}
            status={isPasswordConfirmed ? undefined : 'error'}
            onChange={() => setHasInputChanged(!hasInputChanged)}
            ref={passwordRef}
          />
          <Input.Password
            placeholder='Confirm your password'
            autoComplete='false'
            name='confirm-password'
            style={{ width: '100%' }}
            prefix={<PasswordIcon />}
            status={isPasswordConfirmed ? undefined : 'error'}
            onChange={() => setHasInputChanged(!hasInputChanged)}
            ref={confirmPasswordRef}
          />

          <Button 
            type="primary" 
            htmlType="submit" 
            style={{ width: '100%' }} 
            onClick={(e)=> {handleSubmitEvent(e)}} 
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
