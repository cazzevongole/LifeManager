import { Switch } from "antd";
import React from "react"

interface SettingsProps {
    themeType: string;
    setThemeType: React.Dispatch<React.SetStateAction<string>>;
}

export const Settings = ({ themeType, setThemeType}: SettingsProps) => {
    return (
        <Switch checkedChildren="Dark" unCheckedChildren="Light" onClick={(checked: boolean) => setThemeType(themeType === 'dark' ? 'light' : 'dark')} checked={themeType === 'dark'} />
      )
}