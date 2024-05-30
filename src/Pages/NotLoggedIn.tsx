import { Col, Flex, Row, Typography } from "antd";
import React, { useContext } from "react";
import { useCSS } from "../Utils/Layout.tsx";
import { Link } from "react-router-dom";
import { LoginModalContext } from "../App.tsx";

const { Title, Paragraph, Text } = Typography;

export const NotLoggedIn = () => {
  const background = useCSS('background');
  const color = useCSS('color');

  const setIsLoginModalOpen = useContext(LoginModalContext);

  return (
    <>
      <Title style={{ backgroundColor: background, color: color, textAlign: 'center' }}>Not Logged In</Title>
      <Paragraph style={{ backgroundColor: background, color: color, textAlign: 'center' }}>To access this page, you must be <Link to="/" onClick={(e) => {e.preventDefault(); setIsLoginModalOpen && setIsLoginModalOpen(true)}}>logged in</Link>.</Paragraph>
    </>
  )
}