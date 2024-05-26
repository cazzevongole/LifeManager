import React, { useContext } from "react"
import { ThemeContext } from "../App.tsx";
import { Col, Flex, Row, Typography } from "antd";

const { Title, Paragraph } = Typography;


export const Fridge = () => {
  const themeSchema = useContext(ThemeContext);
  const { defaultBgColor, defaultTextColor } = themeSchema;

  return (
    <>
      <Title style={{ backgroundColor: `#${defaultBgColor}`, color: `#${defaultTextColor}`, textAlign: 'center' }}>Your Fridge</Title>
      <Paragraph style={{ backgroundColor: `#${defaultBgColor}`, color: `#${defaultTextColor}`, textAlign: 'center' }}>In this page you can manage your fridge. You can add ingredients by name, unit and quantity, and set an expire date for them.</Paragraph>
    </>
  )
}