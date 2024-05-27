import React from "react"
import { Col, Flex, Row, Typography } from "antd";
import { NoBreak, useCSS } from "../Utils/Layout.tsx";

const { Title, Paragraph } = Typography;

export const GroceryList = () => {
  const background = useCSS('background');
  const color = useCSS('color');

  return (
    <>
      <Title style={{ backgroundColor: background, color: color, textAlign: 'center' }}>Your <NoBreak>Grocery List</NoBreak></Title>
      <Paragraph style={{ backgroundColor: background, color: color, textAlign: 'center' }}>This is a simple app to help you manage your life. You can manage your fridge, recipes, and grocery list.</Paragraph>
    </>
  )
}