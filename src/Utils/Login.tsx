import { message } from 'antd';
import axios from 'axios';
import React, { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export type userType = {
  username: string;
  email: string;
}

const AuthContext = createContext<{
  token: string;
  user: null | userType;
  loginAction: (data: any, setIsLoginButtonLoading: Dispatch<SetStateAction<boolean>>) => void;
  logOut: () => void;
}>({
  token: "",
  user: null,
  loginAction: () => { },
  logOut: () => { },
});

const AuthProvider = ({ children }) => {
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");

  const [user, setUser] = useState<null | userType>(username && email ? { username, email } : null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();
  const loginAction = async (data: any, setIsLoginButtonLoading: (arg0: boolean) => void) => {
    try {
      const response = await axios.post("https://3vnbn7to7a.execute-api.eu-north-1.amazonaws.com/dev/auth/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = response.data;
      if (res.user) {
        const user = res.user;
        setUser(user);
        setToken(res.token);
        localStorage.setItem("token", res.token);
        localStorage.setItem("username", user.username);
        localStorage.setItem("email", user.email);
        message.success(`Login successful. Welcome, ${user.username}!`);
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        message.error("Invalid username or password. Please try again.");
      } else {
        message.error("Login failed. Please try again.")
      }
    } finally {
      setIsLoginButtonLoading(false);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    navigate("/");
  };
  return <AuthContext.Provider value={{ token, user, loginAction, logOut }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};