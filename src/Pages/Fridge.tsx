import React, { useContext } from "react"
import { ThemeContext } from "../App.tsx";
import { Col, Flex, Row, Typography } from "antd";
import { useCSS } from "../Utils/Layout.tsx";

const { Title, Paragraph } = Typography;


export const Fridge = () => {

  return (
    <>
      <Title style={{ backgroundColor: useCSS('background'), color: useCSS('color'), textAlign: 'center' }}>Your Fridge</Title>
      <Paragraph style={{ backgroundColor: useCSS('background'), color: useCSS('color'), textAlign: 'center' }}>In this page you can manage your fridge. You can add ingredients by name, unit and quantity, and set an expire date for them.</Paragraph>
    </>
  )
}