import React from 'react';
import { Layout, Menu } from 'antd';
import { HomeOutlined, ProjectOutlined, TeamOutlined, UnorderedListOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons'; // Agrega los nuevos íconos
import { useNavigate } from 'react-router-dom';
import './MainLayout.css'; 

const { Header, Sider, Content } = Layout;

const MainLayout = ({ children }) => {
  const navigate = useNavigate();
  
  const menuItems = [
    {
      key: 'tasks',
      icon: <UnorderedListOutlined />,  // Ícono de lista
      label: 'Tasks',
      onClick: () => navigate('/dashboard')
    },
    {
      key: 'micuenta',
      icon: <UserOutlined />,  // Ícono de usuario
      label: 'Mi cuenta',
      onClick: () => navigate('/dashboard/projects')
    },
    {
      key: 'cerrar',
      icon: <LogoutOutlined />,  // Ícono de salida
      label: 'Cerrar sesión',
      onClick: () => navigate('/dashboard/team')
    }
  ];

  return (
    <Layout className="layout">
      <Sider 
        className="sider" 
        theme="dark" 
        width={250}
      >
        <div className="sider-header">
          Task Manager
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={['tasks']}
          items={menuItems}
          className="custom-menu"
          theme="dark"
        />
      </Sider>
      <Layout>
        <Header className="layout-header" />
        <Content className="layout-content">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
