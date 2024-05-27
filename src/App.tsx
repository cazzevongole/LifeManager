import React, { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { Link, Routes, Route, Navigate } from 'react-router-dom';
import { Col, Flex, Layout, Row } from "antd";
import { useMediaQuery } from "react-responsive";
import { HorizontalMenu } from './Components/HorizontalMenu.tsx';
import { Fridge } from "./Pages/Fridge.tsx";
import { GroceryList } from "./Pages/GroceryList.tsx";
import { Home } from "./Pages/Home.tsx";
import { Recipes } from "./Pages/Recipes.tsx";
import { Settings } from "./Pages/Settings.tsx";
import { useCSS, useWindowDimensions } from "./Utils/Layout.tsx";

import "./App.css";
import AuthProvider, { useAuth } from "./Utils/Login.tsx";
import { Login, PrivateRoute } from "./Components/Login.tsx";

const { Header, Content, Footer } = Layout;

const defaultThemeType = 'dark';
const defaultThemeSchema = {
  theme: defaultThemeType,
  defaultBgColor: '000000',
  defaultTextColor: 'FFFFFF'
};
export const ThemeContext = createContext(defaultThemeSchema);

interface AppRoutesProps {
  themeType: string;
  setThemeType: React.Dispatch<React.SetStateAction<string>>;
}
const AppRoutes = ({ themeType, setThemeType }: AppRoutesProps) => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/home" element={<Home />} />
    <Route path="/settings" element={<Settings themeType={themeType} setThemeType={setThemeType} />} />
    <Route element={<PrivateRoute />}>
      <Route path="/LifeManager" element={<Home />} />
      <Route path="/fridge" element={<Fridge />} />
      <Route path="/recipes" element={<Recipes />} />
      <Route path="/grocery-list" element={<GroceryList />} />
      <Route path="/settings" element={<Settings themeType={themeType} setThemeType={setThemeType} />} />
    </Route>
  </Routes>
)

const DesktopView = ({ children }) => {
  const themeSchema = useContext(ThemeContext);
  const { theme, defaultBgColor, defaultTextColor } = themeSchema;
  const { height } = useWindowDimensions();

  const [selectedSection, setSelectedSection] = useState("home");

  const appSections = [
    {
      key: "home",
      label: <Link style={{ color: useCSS('color') }} to="/home"><img width="16" height="16" src={`https://img.icons8.com/material-outlined/24/${useCSS('color').slice(1)}/home--v2.png`} style={{ opacity: 0.80 }} alt="home--v2" /> Home</Link>,
    },
    {
      key: "fridge",
      label: <Link style={{ color: useCSS('color') }} to="/fridge"><img width="16" height="16" src={`https://img.icons8.com/material-outlined/24/${useCSS('color').slice(1)}/fridge.png`} style={{ opacity: 0.80 }} alt="fridge" /> Fridge</Link>,
    },
    {
      key: "recipes",
      label: <Link style={{ color: useCSS('color') }} to="/recipes"><img width="16" height="16" src={`https://img.icons8.com/material-outlined/24/${useCSS('color').slice(1)}/cooking-book.png`} style={{ opacity: 0.80 }} alt="cooking-book" /> Recipes</Link>,
    },
    {
      key: "grocery-list",
      label: <Link style={{ color: useCSS('color') }} to="/grocery-list"><img width="16" height="16" src={`https://img.icons8.com/material-outlined/24/${useCSS('color').slice(1)}/ingredients-list.png`} style={{ opacity: 0.80 }} alt="ingredients-list" /> Grocery List</Link>,
    },
    {
      key: "settings",
      label: <Link style={{ color: useCSS('color') }} to="/settings"><img width="16" height="16" src={`https://img.icons8.com/material-outlined/24/${useCSS('color').slice(1)}/settings--v2.png`} style={{ opacity: 0.80 }} alt="settings--v2" /> Settings</Link>,
    }
  ];

  return (
    <Flex className={`main-theme-${theme}`} vertical>
      <Header style={{ backgroundColor: useCSS('background') }}>
        <Flex justify="center">
          <HorizontalMenu
            selectedSection={selectedSection}
            setSelectedSection={setSelectedSection}
            items={appSections}
          />
        </Flex>
      </Header>
      <Content style={{
        backgroundColor: useCSS('background'),
        color: useCSS('color'),
        height: `${height - 64}px`,
        width: '100%'
      }}>
        <Flex
          vertical
          align="center"
          justify="center"
          style={{
            height: '100%', width: '100%',
            backgroundColor: useCSS('background'), color: useCSS('color'),
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
  const themeSchema = useContext(ThemeContext);
  const { theme } = themeSchema;
  const { height } = useWindowDimensions();

  const [selectedSection, setSelectedSection] = useState("home");

  const appSections = [
    {
      key: "home",
      label: <Link style={{ color: useCSS('color') }} to="/home"><img width="36" height="36" src={`https://img.icons8.com/material-outlined/96/${useCSS('color').slice(1)}/home--v2.png`} style={{ opacity: 0.80 }} alt="home--v2" /></Link>,
    },
    {
      key: "fridge",
      label: <Link style={{ color: useCSS('color') }} to="/fridge"><img width="36" height="36" src={`https://img.icons8.com/material-outlined/96/${useCSS('color').slice(1)}/fridge.png`} style={{ opacity: 0.80 }} alt="fridge" /></Link>,
    },
    {
      key: "recipes",
      label: <Link style={{ color: useCSS('color') }} to="/recipes"><img width="36" height="36" src={`https://img.icons8.com/material-outlined/96/${useCSS('color').slice(1)}/cooking-book.png`} style={{ opacity: 0.80 }} alt="cooking-book" /></Link>,
    },
    {
      key: "grocery-list",
      label: <Link style={{ color: useCSS('color') }} to="/grocery-list"><img width="36" height="36" src={`https://img.icons8.com/material-outlined/96/${useCSS('color').slice(1)}/ingredients-list.png`} style={{ opacity: 0.80 }} alt="ingredients-list" /></Link>,
    },
    {
      key: "settings",
      label: <Link style={{ color: useCSS('color') }} to="/settings"><img width="36" height="36" src={`https://img.icons8.com/material-outlined/96/${useCSS('color').slice(1)}/settings--v2.png`} style={{ opacity: 0.80 }} alt="settings--v2" /></Link>,
    }
  ];

  return (
    <Flex vertical className={`main-theme-${theme}`}>
      <Content style={{
        backgroundColor: useCSS('background'), color: useCSS('color'),
        height: `${height - 46}px`, width: '100%'
      }}>
        <Flex
          vertical
          align="center"
          justify="center"
          style={{
            height: '100%', width: '100%',
            backgroundColor: useCSS('background'), color: useCSS('color'),
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
          backgroundColor: useCSS('background'),
          color: useCSS('color'),
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

  let themeSchema = {
    theme: themeType,
    defaultBgColor: themeType === 'dark' ? '000000' : 'FFFFFF',
    defaultTextColor: themeType === 'dark' ? 'FFFFFF' : '000000'
  };

  useEffect(() => {
    themeSchema = {
      theme: themeType,
      defaultBgColor: themeType === 'dark' ? '000000' : 'FFFFFF',
      defaultTextColor: themeType === 'dark' ? 'FFFFFF' : '000000'
    };
  }, [themeType]);

  return (
    <ThemeContext.Provider value={themeSchema}>
      <AuthProvider>
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
      </AuthProvider>
    </ThemeContext.Provider>
  )
}

