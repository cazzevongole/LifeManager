import { Col, Flex, Row, Switch, Typography } from "antd";
import React from "react"
import { Center, useCSS } from "../Utils/Layout.tsx";

const { Title, Paragraph } = Typography;

interface SettingsProps {
  themeType: string;
  setThemeType: React.Dispatch<React.SetStateAction<string>>;
}

export const Settings = ({ themeType, setThemeType }: SettingsProps) => {
  return (
    <Row justify={'center'} align={'middle'}>
      <Col xs={22} md={16} lg={10} xl={6}>
        <Center><Title style={{ backgroundColor: useCSS('background'), color: useCSS('color') }}>Settings</Title></Center>
        <Flex justify="space-between">
          <Paragraph style={{ backgroundColor: useCSS('background'), color: useCSS('color') }}>Enable dark theme:</Paragraph>
          <Switch checkedChildren="Dark" unCheckedChildren="Light" onClick={(checked: boolean) => setThemeType(themeType === 'dark' ? 'light' : 'dark')} checked={themeType === 'dark'} />
        </Flex>
      </Col>
    </Row>
  )
}