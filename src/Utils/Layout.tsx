import { Col, Flex, Row } from 'antd';
import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../App.tsx';

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
    <span style={{ whiteSpace: 'nowrap', ...style }}>
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
  <Flex justify="center" align="center">
    {children}
  </Flex>
)
export const CenteredFullDiv = ({ children, style={} }) => (
  <Flex align="center" justify="center" style={{ height: '100%' }}>
    <Row justify={'center'} style={{ width: '100%', height: '100%' }}>
      <Col xs={24} sm={16}>
        <Flex vertical align="center" justify="center" style={{ height: '100%', ...style }}>
          {children}
        </Flex>
      </Col>
    </Row>
  </Flex>
)

export const PasswordIcon = () => (
  <span role="img" aria-label="mail" className="anticon anticon-mail site-form-item-icon">
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M 12 1 C 8.636 1 6 3.636 6 7 L 6 8 C 4.9 8 4 8.9 4 10 L 4 20 C 4 21.1 4.9 22 6 22 L 18 22 C 19.1 22 20 21.1 20 20 L 20 10 C 20 8.9 19.1 8 18 8 L 18 7 C 18 3.636 15.364 1 12 1 z M 12 3 C 14.243 3 16 4.757 16 7 L 16 8 L 8 8 L 8 7 C 8 4.757 9.757 3 12 3 z M 6 10 L 18 10 L 18 20 L 6 20 L 6 10 z M 8 14 A 1 1 0 0 0 7 15 A 1 1 0 0 0 8 16 A 1 1 0 0 0 9 15 A 1 1 0 0 0 8 14 z M 12 14 A 1 1 0 0 0 11 15 A 1 1 0 0 0 12 16 A 1 1 0 0 0 13 15 A 1 1 0 0 0 12 14 z M 16 14 A 1 1 0 0 0 15 15 A 1 1 0 0 0 16 16 A 1 1 0 0 0 17 15 A 1 1 0 0 0 16 14 z"></path>
    </svg>
  </span>
)