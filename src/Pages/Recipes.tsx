import { Col, Flex, Row, Typography } from "antd";
import React, { useContext } from "react"
import { ThemeContext } from "../App.tsx";

const { Title, Paragraph } = Typography;

export const Recipes = () => {
  const themeSchema = useContext(ThemeContext);
  const { defaultBgColor, defaultTextColor } = themeSchema;

  return (
    <>
      <Title style={{ backgroundColor: `#${defaultBgColor}`, color: `#${defaultTextColor}`, textAlign: 'center' }}>Your Recipes</Title>
      <Paragraph style={{ backgroundColor: `#${defaultBgColor}`, color: `#${defaultTextColor}`, textAlign: 'center' }}>In this page you can manage your recipes. You can add, delete and modify them.</Paragraph>
    </>
  )
}