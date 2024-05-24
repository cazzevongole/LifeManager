import React, { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { Link, Routes, Route } from 'react-router-dom';
import { Layout } from "antd";
import "./App.css";
import { useMediaQuery } from "react-responsive";
import { HorizontalMenu } from './Components/HorizontalMenu.tsx';
import { Fridge } from "./Pages/Fridge.tsx";
import { GroceryList } from "./Pages/GroceryList.tsx";
import { Home } from "./Pages/Home.tsx";
import { Recipes } from "./Pages/Recipes.tsx";
import { Settings } from "./Pages/Settings.tsx";

const { Header, Content, Footer } = Layout;

const defaultThemeType = 'dark';
const defaultThemeSchema = {
  theme: defaultThemeType,
  defaultBgColor: '000000',
  defaultTextColor: 'FFFFFF'
};
export const ThemeContext = createContext(defaultThemeSchema);


const DesktopView = ({ children }) => {
  const themeSchema = useContext(ThemeContext);
  const { defaultBgColor, defaultTextColor } = themeSchema;

  const [selectedSection, setSelectedSection] = useState("home");

  const appSections = [
    {
      key: "home",
      label: <Link style={{ color: `#${defaultTextColor}` }} to="/"><img width="16" height="16" src={`https://img.icons8.com/material-outlined/24/${defaultTextColor}/home--v2.png`} style={{ opacity: 0.80 }} alt="home--v2" /> Home</Link>,
    },
    {
      key: "fridge",
      label: <Link style={{ color: `#${defaultTextColor}` }} to="/fridge"><img width="16" height="16" src={`https://img.icons8.com/material-outlined/24/${defaultTextColor}/fridge.png`} style={{ opacity: 0.80 }} alt="fridge" /> Fridge</Link>,
    },
    {
      key: "recipes",
      label: <Link style={{ color: `#${defaultTextColor}` }} to="/recipes"><img width="16" height="16" src={`https://img.icons8.com/material-outlined/24/${defaultTextColor}/cooking-book.png`} style={{ opacity: 0.80 }} alt="cooking-book" /> Recipes</Link>,
    },
    {
      key: "grocery-list",
      label: <Link style={{ color: `#${defaultTextColor}` }} to="/grocery-list"><img width="16" height="16" src={`https://img.icons8.com/material-outlined/24/${defaultTextColor}/ingredients-list.png`} style={{ opacity: 0.80 }} alt="ingredients-list" /> Grocery List</Link>,
    },
    {
      key: "settings",
      label: <Link style={{ color: `#${defaultTextColor}` }} to="/settings"><img width="16" height="16" src={`https://img.icons8.com/material-outlined/24/${defaultTextColor}/settings--v2.png`} style={{ opacity: 0.80 }} alt="settings--v2" /> Settings</Link>,
    }
  ];

  return (
    <Layout className="layout">
        <Header 
          style={
            {
              display: 'flex',
              justifyContent: 'center'
            }
          }
        >
        <HorizontalMenu
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
          items={appSections}
        />
      </Header>
      <Content style={{ backgroundColor: `#${defaultBgColor}`, color: `#${defaultTextColor}` }}>
        {children}
      </Content>
      <Footer style={{ textAlign: "center", position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: `#${defaultBgColor}`, color: `#${defaultTextColor}` }}>Life Manager - Created by Cazzevongole</Footer>
    </Layout>
  );
};

const MobileView = ({ children }) => {
  const themeSchema = useContext(ThemeContext);
  const { defaultBgColor, defaultTextColor } = themeSchema;

  const [selectedSection, setSelectedSection] = useState("home");

  const appSections = [
    {
      key: "home",
      label: <Link style={{ color: `#${defaultTextColor}` }} to="/"><img width="16" height="16" src={`https://img.icons8.com/material-outlined/24/${defaultTextColor}/home--v2.png`} style={{ opacity: 0.80 }} alt="home--v2" /></Link>,
    },
    {
      key: "fridge",
      label: <Link style={{ color: `#${defaultTextColor}` }} to="/fridge"><img width="16" height="16" src={`https://img.icons8.com/material-outlined/24/${defaultTextColor}/fridge.png`} style={{ opacity: 0.80 }} alt="fridge" /></Link>,
    },
    {
      key: "recipes",
      label: <Link style={{ color: `#${defaultTextColor}` }} to="/recipes"><img width="16" height="16" src={`https://img.icons8.com/material-outlined/24/${defaultTextColor}/cooking-book.png`} style={{ opacity: 0.80 }} alt="cooking-book" /></Link>,
    },
    {
      key: "grocery-list",
      label: <Link style={{ color: `#${defaultTextColor}` }} to="/grocery-list"><img width="16" height="16" src={`https://img.icons8.com/material-outlined/24/${defaultTextColor}/ingredients-list.png`} style={{ opacity: 0.80 }} alt="ingredients-list" /></Link>,
    },
    {
      key: "settings",
      label: <Link style={{ color: `#${defaultTextColor}` }} to="/settings"><img width="16" height="16" src={`https://img.icons8.com/material-outlined/24/${defaultTextColor}/settings--v2.png`} style={{ opacity: 0.80 }} alt="settings--v2" /></Link>,
    }
  ];

  return (
    <Layout className="layout">
      <Content style={{ backgroundColor: `#${defaultBgColor}`, color: `#${defaultTextColor}` }}>
        {children}
      </Content>
      <Footer style={{ 
        position: 'absolute', 
        bottom: 0, left: 0, right: 0, 
        backgroundColor: `#${defaultBgColor}`, color: `#${defaultTextColor}`, 
        padding: 0,
        display: 'flex',
        justifyContent: 'center' 
        }}>          
        <HorizontalMenu
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
          items={appSections}
        />
      </Footer>
    </Layout>
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
      {
        isDesktop
        ?
        <DesktopView>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/fridge" element={<Fridge />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/grocery-list" element={<GroceryList />} />
            <Route path="/settings" element={<Settings themeType={themeType} setThemeType={setThemeType} />} />
          </Routes>
        </DesktopView>
        :
        <MobileView>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/fridge" element={<Fridge />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/grocery-list" element={<GroceryList />} />
            <Route path="/settings" element={<Settings themeType={themeType} setThemeType={setThemeType} />} />
          </Routes>
        </MobileView>
      }
    </ThemeContext.Provider>
  )
}

