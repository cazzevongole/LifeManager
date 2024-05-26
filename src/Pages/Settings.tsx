import { Col, Flex, Row, Switch, Typography } from "antd";
import React, { useContext } from "react"
import { ThemeContext } from "../App.tsx";

const { Title, Paragraph } = Typography;

interface SettingsProps {
  themeType: string;
  setThemeType: React.Dispatch<React.SetStateAction<string>>;
}

export const Settings = ({ themeType, setThemeType }: SettingsProps) => {
  const themeSchema = useContext(ThemeContext);
  const { defaultBgColor, defaultTextColor } = themeSchema;

  return (
    <Flex justify="space-between">
      <Paragraph style={{ backgroundColor: `#${defaultBgColor}`, color: `#${defaultTextColor}` }}>Enable dark theme:</Paragraph>
      <Switch checkedChildren="Dark" unCheckedChildren="Light" onClick={(checked: boolean) => setThemeType(themeType === 'dark' ? 'light' : 'dark')} checked={themeType === 'dark'} />
    </Flex>
  )
}