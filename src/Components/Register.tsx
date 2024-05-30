import React, { useEffect, useRef, useState } from 'react';
import { Modal, message } from 'antd';
import { Button, Form, Input, Space } from 'antd';
import '../css/login.css';
import { Center, PasswordIcon } from '../Utils/Layout.tsx';
import { MailOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';

interface LoginProps {
  isRegisterModalOpen: boolean;
  setIsRegisterModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Register = ({ isRegisterModalOpen, setIsRegisterModalOpen }: LoginProps) => {
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
