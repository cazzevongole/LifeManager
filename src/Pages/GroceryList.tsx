import React from "react"
import { Col, Flex, Row, Typography } from "antd";
import { NoBreak, useCSS } from "../Utils/Layout.tsx";

const { Title, Paragraph } = Typography;

export const GroceryList = () => {
  return (
    <>
      <Title style={{ backgroundColor: useCSS('background'), color: useCSS('color'), textAlign: 'center' }}>Your <NoBreak>Grocery List</NoBreak></Title>
      <Paragraph style={{ backgroundColor: useCSS('background'), color: useCSS('color'), textAlign: 'center' }}>This is a simple app to help you manage your life. You can manage your fridge, recipes, and grocery list.</Paragraph>
    </>
  )
}