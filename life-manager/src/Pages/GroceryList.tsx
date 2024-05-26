import React, { useContext } from "react"
import { ThemeContext } from "../App.tsx";
import { Col, Flex, Row, Typography } from "antd";
import { NoBreak } from "../Utils/Layout.tsx";

const { Title, Paragraph } = Typography;

export const GroceryList = () => {
  const themeSchema = useContext(ThemeContext);
  const { defaultBgColor, defaultTextColor } = themeSchema;

  return (
    <>
      <Title style={{ backgroundColor: `#${defaultBgColor}`, color: `#${defaultTextColor}`, textAlign: 'center' }}>Your <NoBreak>Grocery List</NoBreak></Title>
      <Paragraph style={{ backgroundColor: `#${defaultBgColor}`, color: `#${defaultTextColor}`, textAlign: 'center' }}>This is a simple app to help you manage your life. You can manage your fridge, recipes, and grocery list.</Paragraph>
    </>
  )
}