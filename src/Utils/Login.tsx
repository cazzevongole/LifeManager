import React, { useState } from 'react';
import { useContext, createContext } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


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
  const [user, setUser] = useState<null | Record<string, string>>(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();
  const loginAction = async (data) => {
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
        localStorage.setItem("site", res.token);
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
    localStorage.removeItem("site");
    navigate("/login");
  };
  return <AuthContext.Provider value={{ token, user, loginAction, logOut }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};