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

const statuses = ['In Progress', 'Done', 'Paused', 'Revision'];

const DashboardPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [tasksByStatus, setTasksByStatus] = useState({});

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks/grouped-by-status');
      setTasksByStatus(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2} style={{ color: '#ff6ab0' }}>Mis Tareas</Title>
      <Row gutter={[16, 16]}>
        {statuses.map(status => (
          <Col span={6} key={status}>
            <Card 
              title={status}
              style={{ 
                background: '#f0f2f5',
                borderRadius: '8px',
                height: '100%'
              }}
            >
              {tasksByStatus[status]?.map(task => (
                <Card 
                  key={task.id}
                  style={{ 
                    marginBottom: '16px', 
                    background: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <h4>{task.nameTask}</h4>
                  <p>{task.description}</p>
                  <p>Fecha límite: {new Date(task.deadline).toLocaleDateString()}</p>
                  <Badge 
                    status={getStatusColor(task.status)} 
                    text={task.status} 
                  />
                </Card>
              ))}
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