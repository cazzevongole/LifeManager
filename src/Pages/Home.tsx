import { Col, Flex, Row, Space, Typography } from "antd"
import React, { useContext } from "react";
import { CenteredFullDiv, NoBreak, useCSS } from "../Utils/Layout.tsx";
import { useAuth } from "../Utils/Login.tsx";
import { Link } from "react-router-dom";
import { LoginModalContext } from "../App.tsx";

const { Title, Paragraph } = Typography;

export const Home = () => {
  const user = useAuth();
  const background = useCSS('background');
  const color = useCSS('color');

  const setIsLoginModalOpen = useContext(LoginModalContext);

  return (
    <CenteredFullDiv style={{ paddingTop: '20px' }}>
      <Title style={{ backgroundColor: background, color: color, textAlign: 'center' }}>Welcome to your <NoBreak>Life Manager</NoBreak></Title>
      <Paragraph style={{ backgroundColor: background, color: color, textAlign: 'center' }}>This is a simple app to help you manage your life. You can manage your fridge, recipes, and grocery list.</Paragraph>

      {!user.token && <Paragraph style={{ backgroundColor: background, color: color, textAlign: 'center' }}>Please <Link to="/" onClick={(e) => { e.preventDefault(); setIsLoginModalOpen && setIsLoginModalOpen(true) }}>login</Link> to start using the app.</Paragraph>}

    </CenteredFullDiv>
  )
}