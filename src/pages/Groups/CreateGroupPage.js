import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const CreateGroupPage = () => {
  const [loading, setLoading] = useState(false);
  const [groupCode, setGroupCode] = useState(null);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await api.post('/groups/create', values);
      const groupId = response.data.id;
      setGroupCode(groupId); 
      message.success('Grupo creado exitosamente');
    } catch (error) {
      message.error('Error al crear el grupo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Crear Grupo</h1>
      {groupCode ? (
        <div>
          <p>¡Grupo creado exitosamente!</p>
          <p>Comparte este código con otros usuarios para que se unan:</p>
          <h2>{groupCode}</h2>
          <Button type="primary" onClick={() => navigate('/dashboard')}>
            Volver al Dashboard
          </Button>
        </div>
      ) : (
        <Form onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Nombre del Grupo"
            rules={[{ required: true, message: 'Por favor ingresa el nombre del grupo' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Crear Grupo
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default CreateGroupPage;