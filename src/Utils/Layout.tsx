import React from 'react';
import { useState, useEffect } from 'react';

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
  style?: React.CSSProperties;
}

export const NoBreak = ({ children, style }: NoBreakProps) => {
  return (
    <span style={{ whiteSpace: 'nowrap', ...style}}>
      {children}
    </span>
  );
}