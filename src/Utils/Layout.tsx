import React, { CSSProperties, useContext } from 'react';
import { useState, useEffect } from 'react';
import { ThemeContext } from '../App.tsx';
import { Flex } from 'antd';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

interface NoBreakProps {
  children: React.ReactNode;
  style?: CSSProperties;
}

export const NoBreak = ({ children, style }: NoBreakProps) => {
  return (
    <span style={{ whiteSpace: 'nowrap', ...style}}>
      {children}
    </span>
  );
}

export const useCSS = (variable: string) => {
  // get property from css variables declared inside of .main-theme-dark or .main-theme-light
  const theme = useContext(ThemeContext);

  const root = document.querySelector(':root');
  const value = root ? getComputedStyle(root).getPropertyValue(`--${theme}-${variable}`) : '';
  return value;
}

export const Center = ({ children }) => (
  <Flex justify="center" align="middle">
    {children}
  </Flex>
)