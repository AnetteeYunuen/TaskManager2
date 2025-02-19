import React from 'react';
import { Button, Typography, Space, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const { Title, Paragraph } = Typography;

const LandingPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="landing-container">
      <Card className="landing-card">
        <Space direction="vertical" align="center" size="large">
          <Title className="landing-title">Task Manager</Title>
          <Paragraph className="landing-text">
            ¿Te cuesta trabajo ser una persona ordenada? Con Task Manger organiza tus tareas de manera más eficiente y sencilla.
          </Paragraph>
          <Button 
            type="primary" 
            size="large" 
            onClick={() => navigate('/login')}
            className="landing-button"
          >
            Iniciar Sesión
          </Button>

          <Button 
            type="primary" 
            size="large" 
            onClick={() => navigate('/register')}
            className="landing-button"
          >
            Registrarme
          </Button>
          
        </Space>
      </Card>
    </div>
  );
};

export default LandingPage;
