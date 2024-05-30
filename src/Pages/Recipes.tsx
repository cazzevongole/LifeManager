import { Col, Flex, Row, Typography } from "antd";
import React from "react";
import { CenteredFullDiv, useCSS } from "../Utils/Layout.tsx";

const { Title, Paragraph } = Typography;

export const Recipes = () => {
  const background = useCSS('background');
  const color = useCSS('color');

  return (
    <CenteredFullDiv style={{paddingTop: '20px'}}>
      <Title style={{ backgroundColor: background, color: color, textAlign: 'center' }}>Your Recipes</Title>
      <Paragraph style={{ backgroundColor: background, color: color, textAlign: 'center' }}>In this page you can manage your recipes. You can add, delete and modify them.</Paragraph>
    </CenteredFullDiv>
  )
}