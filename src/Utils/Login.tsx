import React, { useState } from 'react';
import { useContext, createContext } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SpinContext } from '../App.tsx';


const AuthContext = createContext<{
  token: string;
  user: null | Record<string, string>;
  loginAction: (data: any) => void;
  logOut: () => void;
}>({
  token: "",
  user: null,
  loginAction: (data) => {},
  logOut: () => {},
});

const AuthProvider = ({ children }) => {
  const setSpin = useContext(SpinContext);

  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");

  const [user, setUser] = useState<null | Record<string, string>>(username && email ? { username, email } : null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();
  const loginAction = async (data) => {
    // setSpin && setSpin(true);
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
        // setSpin && setSpin(false);
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
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