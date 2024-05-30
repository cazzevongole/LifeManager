import { Divider, Space, Typography } from "antd";
import React from "react";
import { useCSS } from "../Utils/Layout.tsx";
import { Settings } from "./Settings.tsx";
import { useAuth } from "../Utils/Login.tsx";

const { Title, Paragraph } = Typography;

interface ProfileProps {
  themeType: string;
  setThemeType: React.Dispatch<React.SetStateAction<string>>;
}
export const Profile = ({ themeType, setThemeType }: ProfileProps) => {
  const background = useCSS('background');
  const color = useCSS('color');
  const { user } = useAuth();

  return (
    <Space direction="vertical" size={50} style={{ width: '100%' }}>
      <div>
        <Title style={{ backgroundColor: background, color: color, textAlign: 'center' }}>Your Profile</Title>
        <Paragraph style={{ backgroundColor: background, color: color, textAlign: 'center' }}>
          {
            user && <>Hey <span style={{color: "yellow"}}>{user.username}</span>!<br/></>
          }
          In this page you will find your user informations and settings.
          </Paragraph>
      </div>
      <Divider />
      <Settings themeType={themeType} setThemeType={setThemeType} />
    </Space>
  )
}