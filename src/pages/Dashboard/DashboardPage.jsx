import React, { useState, useEffect } from 'react';
import { Typography, Card, Row, Col, Button, Badge } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import NewTaskModal from '../../components/NewTaskModal';
import api from '../../services/api';

const { Title } = Typography;

const getStatusColor = (status) => {
  const colors = {
    'In Progress': 'processing',
    'Done': 'success',
    'Paused': 'warning',
    'Revision': 'error'
  };
  return colors[status] || 'default';
};

const DashboardPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks/list');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <Title level={2} style={{ color: '#ff6ab0' }}>Mis Tareas</Title>
      <Row gutter={[16, 16]}>
        {tasks.map(task => (
          <Col span={8} key={task.id}>
            <Card 
              style={{ 
                background: '#ffdcdc',
                border: '1px solid #ffdcdc',
                borderRadius: '8px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#fff', fontSize: '16px' }}>{task.nameTask}</span>
                <Badge status={getStatusColor(task.status)} text={<span style={{ color: '#fff' }}>{task.status}</span>} />
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      <Button
        type="primary"
        shape="circle"
        icon={<PlusOutlined style={{ color: '#ff88cb' }} />}  
  size="large"
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          background: '#ffdcdc',
          borderColor: '#ff88cb'
        }}
        onClick={() => setModalVisible(true)}
      />
      <NewTaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onTaskCreated={fetchTasks}
      />
    </div>
  );
};

export default DashboardPage;