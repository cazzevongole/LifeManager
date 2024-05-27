import { Col, Flex, Row, Typography } from "antd";
import React from "react";
import { useCSS } from "../Utils/Layout.tsx";

const { Title, Paragraph } = Typography;

export const Recipes = () => {

  return (
    <>
      <Title style={{ backgroundColor: useCSS('background'), color: useCSS('color'), textAlign: 'center' }}>Your Recipes</Title>
      <Paragraph style={{ backgroundColor: useCSS('background'), color: useCSS('color'), textAlign: 'center' }}>In this page you can manage your recipes. You can add, delete and modify them.</Paragraph>
    </>
  )
}