import { Col, Flex, Row, Typography } from "antd"
import React from "react";
import { NoBreak, useCSS } from "../Utils/Layout.tsx";
import { useAuth } from "../Utils/Login.tsx";
import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography;


export const Home = () => {
  const user = useAuth();
  const background = useCSS('background');
  const color = useCSS('color');

  return (
    <>
      <Title style={{ backgroundColor: background, color: color, textAlign: 'center' }}>Welcome to your <NoBreak>Life Manager</NoBreak></Title>
      <Paragraph style={{ backgroundColor: background, color: color, textAlign: 'center' }}>This is a simple app to help you manage your life. You can manage your fridge, recipes, and grocery list.</Paragraph>

      { !user.token && <Paragraph style={{ backgroundColor: background, color: color, textAlign: 'center' }}>Please <Link to={"/login"} >login</Link> to start using the app.</Paragraph> }
    </>
  )
}