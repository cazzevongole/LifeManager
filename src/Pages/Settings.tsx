import { Col, Flex, Row, Switch, Typography } from "antd";
import React, { useContext, useState } from "react";
import { Center, useCSS } from "../Utils/Layout.tsx";
import { messaging, setupNotifications } from "../firebase.js";
import { NotificationTokenContext } from "../App.tsx";

const { Title, Paragraph } = Typography;

interface SettingsProps {
  themeType: string;
  setThemeType: React.Dispatch<React.SetStateAction<string>>;
}

export const Settings = ({ themeType, setThemeType }: SettingsProps) => {
  const background = useCSS('background');
  const color = useCSS('color');
  const { notificationToken, setNotificationToken } = useContext(NotificationTokenContext);

  const activateNotifications = () => {
    setupNotifications().then((response) => {
      setNotificationToken(response.token);
    });
  }

  return (
    <Row justify={'center'} align={'middle'}>
      <Col xs={22} md={16} lg={10}>
        <Center><Title style={{ backgroundColor: background, color: color }}>Settings</Title></Center>
        <Flex justify="space-between">
          <Paragraph style={{ backgroundColor: background, color: color }}>Enable dark theme:</Paragraph>
          <Switch checkedChildren="Dark" unCheckedChildren="Light" onClick={() => setThemeType(themeType === 'dark' ? 'light' : 'dark')} checked={themeType === 'dark'} />
        </Flex>
        <Flex justify="space-between">
          <Paragraph style={{ backgroundColor: background, color: color }}>Push Notifications:</Paragraph>
          <Switch checkedChildren="On" unCheckedChildren="Off" onClick={activateNotifications} checked={!!notificationToken} />
        </Flex>
        <Flex justify="space-between">
          <Paragraph style={{ backgroundColor: background, color: color }}>App version:</Paragraph>
          <Paragraph style={{ backgroundColor: background, color: color }}>2024-06-07 00:25</Paragraph>
        </Flex>
      </Col>
    </Row>
  )
}