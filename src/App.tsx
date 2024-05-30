import React, { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import { Col, Flex, Layout, Row, Popconfirm, Spin, Modal } from "antd";
import { useMediaQuery } from "react-responsive";
import { HorizontalMenu } from './Components/HorizontalMenu.tsx';
import { Fridge } from "./Pages/Fridge.tsx";
import { GroceryList } from "./Pages/GroceryList.tsx";
import { Home } from "./Pages/Home.tsx";
import { Recipes } from "./Pages/Recipes.tsx";
import { useCSS, useWindowDimensions } from "./Utils/Layout.tsx";

import "./App.css";
import AuthProvider, { useAuth } from "./Utils/Login.tsx";
import { Login, PrivateRoute } from "./Components/Login.tsx";
import { NotLoggedIn } from "./Pages/NotLoggedIn.tsx";
import { Profile } from "./Pages/Profile.tsx";
import { Register } from "./Components/Register.tsx";

const { Header, Content } = Layout;

const defaultThemeType = 'dark';
export const ThemeContext = createContext(defaultThemeType);

export const SpinContext = createContext<React.Dispatch<React.SetStateAction<boolean>> | null>(null);
export const LoginModalContext = createContext<React.Dispatch<React.SetStateAction<boolean>> | null>(null);
export const RegisterModalContext = createContext<React.Dispatch<React.SetStateAction<boolean>> | null>(null);

interface AppRoutesProps {
  themeType: string;
  setThemeType: React.Dispatch<React.SetStateAction<string>>;
}
const AppRoutes = ({ themeType, setThemeType }: AppRoutesProps) => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/profile" element={<Profile themeType={themeType} setThemeType={setThemeType} />} />
    <Route path="/not-logged-in" element={<NotLoggedIn />} />
    <Route element={<PrivateRoute />}>
      <Route path="/LifeManager" element={<Home />} />
      <Route path="/fridge" element={<Fridge />} />
      <Route path="/recipes" element={<Recipes />} />
      <Route path="/grocery-list" element={<GroceryList />} />
      <Route path="/profile" element={<Profile themeType={themeType} setThemeType={setThemeType} />} />
    </Route>
  </Routes>
)

const DesktopView = ({ children }) => {
  const theme = useContext(ThemeContext);
  const color = useCSS('color');
  const background = useCSS('background');
  const imagesColor = theme === 'dark' ? 'FFFFFF' : '000000';

  const { height } = useWindowDimensions();

  const [selectedSection, setSelectedSection] = useState("home");

  const pathname = useLocation().pathname;
  useEffect(() => {
    if (pathname === "/") {
      setSelectedSection("home");
    } else {
      setSelectedSection(pathname.substring(1));
    }
  }, [pathname]);

  const { user, token, logOut } = useAuth();

  var appSections = [
    {
      key: "home",
      label: <Link style={{ color: color }} to="/"><img width="16" height="16" src={`https://img.icons8.com/material-outlined/24/${imagesColor}/home--v2.png`} style={{ opacity: 0.80 }} alt="home--v2" /> Home</Link>,
    },
    {
      key: "fridge",
      label: <Link style={{ color: color }} to="/fridge"><img width="16" height="16" src={`https://img.icons8.com/material-outlined/24/${imagesColor}/fridge.png`} style={{ opacity: 0.80 }} alt="fridge" /> Fridge</Link>,
    },
    {
      key: "recipes",
      label: <Link style={{ color: color }} to="/recipes"><img width="16" height="16" src={`https://img.icons8.com/material-outlined/24/${imagesColor}/cooking-book.png`} style={{ opacity: 0.80 }} alt="cooking-book" /> Recipes</Link>,
    },
    {
      key: "grocery-list",
      label: <Link style={{ color: color }} to="/grocery-list"><img width="16" height="16" src={`https://img.icons8.com/material-outlined/24/${imagesColor}/ingredients-list.png`} style={{ opacity: 0.80 }} alt="ingredients-list" /> Grocery List</Link>,
    }
  ];

  if (user) {
    appSections.push({
      key: "profile",
      label: <Link style={{ color: color }} to="/profile"><img width="16" height="16" src={`https://img.icons8.com/material-outlined/24/${imagesColor}/user.png`} style={{ opacity: 0.80 }} alt="user" /> Profile</Link>,
    });
    appSections.push({
      key: "logout",
      label: <Popconfirm title="Are you sure?" description={"You are going to logout of your account"} okText={"Do it"} cancelText={"Not sure"} onConfirm={() => logOut()}><img width="16" height="16" src={`https://img.icons8.com/material-outlined/24/${imagesColor}/logout-rounded-left.png`} style={{ opacity: 0.80 }} alt="logout-rounded-left" /> <span style={{color: color}}>Logout</span></Popconfirm>,
    });
  }

  return (
    <Flex className={`main-theme-${theme}`} vertical>
      <Header style={{ backgroundColor: background }}>
        <Flex justify="center">
          <HorizontalMenu
            selectedSection={selectedSection}
            setSelectedSection={setSelectedSection}
            items={appSections}
          />
        </Flex>
      </Header>
      <Content style={{
        backgroundColor: background,
        color: color,
        height: `${height - 64}px`,
        width: '100%'
      }}>
        <Flex
          vertical
          align="center"
          justify="center"
          style={{
            height: '100%', width: '100%',
            backgroundColor: background, color: color,
            padding: '20px'
          }}
        >
          <Row justify={'center'} style={{ width: '100%' }}>
            <Col xs={24} sm={20}>
              {children}
            </Col>
          </Row>
        </Flex>
      </Content>
    </Flex>
  );
};

const MobileView = ({ children }) => {
  const theme = useContext(ThemeContext);
  const color = useCSS('color');
  const background = useCSS('background');
  const imagesColor = theme === 'dark' ? 'FFFFFF' : '000000';

  const { height } = useWindowDimensions();

  const [selectedSection, setSelectedSection] = useState("home");

  const { user, token, logOut } = useAuth();

  const appSections = [
    {
      key: "home",
      label: <Link style={{ color: color }} to="/"><img width="24" height="24" src={`https://img.icons8.com/material-outlined/96/${imagesColor}/home--v2.png`} style={{ opacity: 0.80 }} alt="home--v2" /></Link>,
    },
    {
      key: "fridge",
      label: <Link style={{ color: color }} to="/fridge"><img width="24" height="24" src={`https://img.icons8.com/material-outlined/96/${imagesColor}/fridge.png`} style={{ opacity: 0.80 }} alt="fridge" /></Link>,
    },
    {
      key: "recipes",
      label: <Link style={{ color: color }} to="/recipes"><img width="24" height="24" src={`https://img.icons8.com/material-outlined/96/${imagesColor}/cooking-book.png`} style={{ opacity: 0.80 }} alt="cooking-book" /></Link>,
    },
    {
      key: "grocery-list",
      label: <Link style={{ color: color }} to="/grocery-list"><img width="24" height="24" src={`https://img.icons8.com/material-outlined/96/${imagesColor}/ingredients-list.png`} style={{ opacity: 0.80 }} alt="ingredients-list" /></Link>,
    },
  ];

  if (user) {
    appSections.push({
      key: "profile",
      label: <Link to="/profile"><img width="24" height="24" src={`https://img.icons8.com/material-outlined/24/${imagesColor}/user.png`} style={{ opacity: 0.80 }} alt="user" /></Link>,
    });
    appSections.push({
      key: "logout",
      label: <Popconfirm title="Are you sure?" description={"You are going to logout of your account"} okText={"Do it"} cancelText={"Not sure"} onConfirm={() => logOut()}><img width="24" height="24" src={`https://img.icons8.com/material-outlined/24/${imagesColor}/logout-rounded-left.png`} style={{ opacity: 0.80 }} alt="logout-rounded-left" /></Popconfirm>,
    });
  }

  return (
    <Flex vertical className={`main-theme-${theme}`}>
      <Content style={{
        backgroundColor: background, color: color,
        height: `${height - 46}px`, width: '100%'
      }}>
        <Flex
          vertical
          align="center"
          justify="center"
          style={{
            height: '100%', width: '100%',
            backgroundColor: background, color: color,
            padding: '20px'
          }}
        >
          <Row justify={'center'} style={{ width: '100%' }}>
            <Col xs={24} sm={20}>
              {children}
            </Col>
          </Row>
        </Flex>
      </Content>
      <Flex
        justify="center"
        style={{
          backgroundColor: background,
          color: color,
        }}
      >
        <HorizontalMenu
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
          items={appSections}
        />
      </Flex>
    </Flex>
  );
};

export const App = () => {
  const isDesktop = useMediaQuery({ minWidth: 768 });

  const [themeType, setThemeType] = useState(defaultThemeType);
  const [spin, setSpin] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  return (
    <ThemeContext.Provider value={themeType}>
      <SpinContext.Provider value={setSpin}>
        <AuthProvider>
          <LoginModalContext.Provider value={setIsLoginModalOpen}>
            <RegisterModalContext.Provider value={setIsRegisterModalOpen}>
              <Spin spinning={spin}>
                {
                  isDesktop
                    ?
                    <DesktopView>
                      <AppRoutes themeType={themeType} setThemeType={setThemeType} />
                    </DesktopView>
                    :
                    <MobileView>
                      <AppRoutes themeType={themeType} setThemeType={setThemeType} />
                    </MobileView>
                }
                <Login isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} setIsRegisterModalOpen={setIsRegisterModalOpen} />
                <Register isRegisterModalOpen={isRegisterModalOpen} setIsRegisterModalOpen={setIsRegisterModalOpen} />
              </Spin>
            </RegisterModalContext.Provider>
          </LoginModalContext.Provider>
        </AuthProvider>
      </SpinContext.Provider>
    </ThemeContext.Provider>
  )
}

