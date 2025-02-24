import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Card, Row, Col, Badge } from 'antd';
import api from '../../services/api';

const { Title } = Typography;

const GroupDashboardPage = () => {
  const { groupId } = useParams();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get(`/groups/${groupId}/tasks`);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [groupId]);

  return (
    <div>
      <Title level={2}>Tareas del Grupo</Title>
      <Row gutter={[16, 16]}>
        {tasks.map(task => (
          <Col span={8} key={task.id}>
            <Card>
              <h3>{task.nameTask}</h3>
              <p>{task.description}</p>
              <p>Fecha límite: {new Date(task.deadline).toLocaleDateString()}</p>
              <Badge status={task.status === 'Done' ? 'success' : 'processing'} text={task.status} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default GroupDashboardPage;