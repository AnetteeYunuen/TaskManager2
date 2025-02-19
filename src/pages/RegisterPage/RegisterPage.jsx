import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './RegisterPage.css'; 

const RegisterPage = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await api.post('/auth/register', values);
      message.success('¡Usuario registrado exitosamente!');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      message.error('Error en el registro. Por favor, intenta de nuevo');
      if (error.response?.data?.error) {
        message.error(error.response.data.error);
      } else if (error.response?.status === 400) {
        message.error('El usuario ya existe');
      } else {
        message.error('Error en el registro. Por favor, intenta de nuevo');
      }
    }
  };

  return (
    <div className="register-page">
      <Card className="card">
        <h2 className="card-header">Task Manager</h2>
        <Form
          name="register"
          onFinish={onFinish}
          layout="vertical"
          className="form-container"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Por favor ingresa tu email' },
              { type: 'email', message: 'Ingresa un email válido' }
            ]}
          >
            <Input 
              prefix={<MailOutlined style={{ color: '#ff88cb' }} />} 
              placeholder="Email"
              className="custom-input"
            />
          </Form.Item>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Por favor ingresa tu usuario' }]}
          >
            <Input 
              prefix={<UserOutlined style={{ color: '#ff88cb' }} />} 
              placeholder="Usuario"
              className="custom-input"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}
          >
            <Input.Password 
              prefix={<LockOutlined style={{ color: '#ff88cb' }} />} 
              placeholder="Contraseña"
              className="custom-input"
            />
          </Form.Item>
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              block
              className="register-button"
            >
              Registrarse
            </Button>
          </Form.Item>
          <div className="link">
            <a 
              onClick={() => navigate('/login')}
            >
              ¿Ya tienes cuenta? Inicia sesión
            </a>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default RegisterPage;
