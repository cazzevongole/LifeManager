import React, { useContext } from "react"
import { Col, Flex, Row, Typography } from "antd";
import { CenteredFullDiv, useCSS } from "../Utils/Layout.tsx";

const { Title, Paragraph } = Typography;


export const Fridge = () => {
  const background = useCSS('background');
  const color = useCSS('color');

  return (
    <CenteredFullDiv style={{paddingTop: '20px'}}>
      <Title style={{ backgroundColor: background, color: color, textAlign: 'center' }}>Your Fridge</Title>
      <Paragraph style={{ backgroundColor: background, color: color, textAlign: 'center' }}>In this page you can manage your fridge. You can add ingredients by name, unit and quantity, and set an expire date for them.</Paragraph>
    </CenteredFullDiv>
  )
}