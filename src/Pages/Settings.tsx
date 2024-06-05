import { Col, Flex, Row, Switch, Typography } from "antd";
import React from "react"
import { Center, useCSS } from "../Utils/Layout.tsx";

const { Title, Paragraph } = Typography;

interface SettingsProps {
  themeType: string;
  setThemeType: React.Dispatch<React.SetStateAction<string>>;
}

export const Settings = ({ themeType, setThemeType }: SettingsProps) => {
  const background = useCSS('background');
  const color = useCSS('color');

  return (
    <Row justify={'center'} align={'middle'}>
      <Col xs={22} md={16} lg={10}>
        <Center><Title style={{ backgroundColor: background, color: color }}>Settings</Title></Center>
        <Flex justify="space-between">
          <Paragraph style={{ backgroundColor: background, color: color }}>Enable dark theme:</Paragraph>
          <Switch checkedChildren="Dark" unCheckedChildren="Light" onClick={() => setThemeType(themeType === 'dark' ? 'light' : 'dark')} checked={themeType === 'dark'} />
        </Flex>
        <Flex justify="space-between">
          <Paragraph style={{ backgroundColor: background, color: color }}>App version:</Paragraph>
          <Paragraph style={{ backgroundColor: background, color: color }}>2024-06-05 20:40</Paragraph>
        </Flex>
      </Col>
    </Row>
  )
}