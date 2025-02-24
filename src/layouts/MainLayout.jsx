import React from 'react';
import { Layout, Menu } from 'antd';
import { HomeOutlined, ProjectOutlined, TeamOutlined, UnorderedListOutlined, UserOutlined, LogoutOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './MainLayout.css';

const { Header, Sider, Content } = Layout;

const MainLayout = ({ children }) => {
  const navigate = useNavigate();

  const menuItems = [
    {
      key: 'tasks',
      icon: <UnorderedListOutlined />,
      label: 'Tasks',
      onClick: () => navigate('/dashboard')
    },
    {
      key: 'micuenta',
      icon: <UserOutlined />,
      label: 'Mi cuenta',
      onClick: () => navigate('/dashboard/projects')
    },
    {
      key: 'creargrupo',
      icon: <PlusOutlined />,
      label: 'Crear grupo',
      onClick: () => navigate('/create-group')
    },
    {
      key: 'unirmegrupo',
      icon: <PlusOutlined />,
      label: 'Unirme a un grupo',
      onClick: () => navigate('/join-group') 
    },
    {
      key: 'cerrar',
      icon: <LogoutOutlined />,
      label: 'Cerrar sesión',
      onClick: () => navigate('/login')
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