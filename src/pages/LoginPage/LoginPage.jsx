import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await api.post('/auth/login', { 
        email: values.username, 
        password: values.password 
      });
      
      localStorage.setItem('token', response.data.token);
      message.success(`¡Bienvenido ${response.data.user.username}!`);
      navigate('/dashboard');
    } catch (error) {
      if (error.response?.data?.error) {
        message.error(error.response.data.error);
      } else if (error.response?.status === 401) {
        message.error('Email o contraseña incorrectos');
      } else {
        message.error('Error al iniciar sesión. Por favor, intenta de nuevo');
      }
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <h2 className="login-title">Inicar sesión</h2>
        <Form name="login" onFinish={onFinish} layout="vertical">
          <Form.Item name="username" rules={[{ required: true, message: 'Por favor ingresa tu email' }]}>
            <Input 
              prefix={<UserOutlined className="icon-style" />} 
              placeholder="Correo"
              className="custom-input"
            />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}>
            <Input.Password 
              prefix={<LockOutlined className="icon-style" />} 
              placeholder="Contraseña"
              className="custom-input"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block className="login-button">
              Ingresar
            </Button>
          </Form.Item>
          <div className="register-link" onClick={() => navigate('/register')}>
            ¿No tienes cuenta? Regístrate
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
