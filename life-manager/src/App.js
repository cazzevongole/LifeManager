import React from 'react';
import { Button, DatePicker, Layout, Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import './App.css';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<MailOutlined />}>
            Navigation One
          </Menu.Item>
          <Menu.Item key="2" icon={<AppstoreOutlined />}>
            Navigation Two
          </Menu.Item>
          <Menu.Item key="3" icon={<SettingOutlined />}>
            Navigation Three
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content" style={{ margin: '16px 0' }}>
          <h1>Hello, Ant Design!</h1>
          <Button type="primary">Primary Button</Button>
          <DatePicker style={{ marginLeft: 8 }} />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2024 Created by Ant UED</Footer>
    </Layout>
  );
}

export default App;
