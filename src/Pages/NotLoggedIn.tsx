import { Col, Flex, Row, Typography } from "antd";
import React from "react";
import { useCSS } from "../Utils/Layout.tsx";

const { Title, Paragraph } = Typography;

export const NotLoggedIn = () => {
  const background = useCSS('background');
  const color = useCSS('color');

  return (
    <>
      <Title style={{ backgroundColor: background, color: color, textAlign: 'center' }}>Not Logged In</Title>
      <Paragraph style={{ backgroundColor: background, color: color, textAlign: 'center' }}>To access this page, you must be logged in.</Paragraph>
    </>
  )
}