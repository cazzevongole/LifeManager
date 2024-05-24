import { Menu, MenuTheme } from 'antd';
import React, { useContext } from 'react';
import { ItemType, MenuItemType } from 'antd/es/menu/interface';
import { ThemeContext } from "../App.tsx";

interface HorizontalMenuProps {
  selectedSection: string | undefined;
  setSelectedSection: React.Dispatch<React.SetStateAction<string>>;
  items: ItemType<MenuItemType>[];
}

export const HorizontalMenu = ({ selectedSection, setSelectedSection, items }: HorizontalMenuProps) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Menu
      theme={theme as MenuTheme}
      mode="horizontal"
      selectedKeys={selectedSection ? [selectedSection] : ["/"]}
      onClick={(e) => {
        setSelectedSection(e.key)
      }}
      items={items}
      style={{ width: '100%', justifyContent: 'center' }}
    />
  );
};
