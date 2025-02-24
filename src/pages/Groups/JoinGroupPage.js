import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const JoinGroupPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { groupCode } = values;
      await api.post(`/groups/${groupCode}/add-member`, { userId: localStorage.getItem('userId') });
      message.success('Te has unido al grupo exitosamente');
      navigate('/dashboard'); 
    } catch (error) {
      message.error('Error al unirse al grupo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Unirse a un Grupo</h1>
      <Form onFinish={onFinish}>
        <Form.Item
          name="groupCode"
          label="Código del Grupo"
          rules={[{ required: true, message: 'Por favor ingresa el código del grupo' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Unirse al Grupo
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default JoinGroupPage;