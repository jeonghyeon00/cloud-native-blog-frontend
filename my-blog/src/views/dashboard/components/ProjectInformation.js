import React from 'react';
import DashboardCard from '../../../components/shared/DashboardCard';

const ProjectInformation = () => {
  return (
    <DashboardCard title="Project Information">
      <div>Nginx, React, Spring Boot, MySQL 사용</div>
      <a href="https://github.com/jeonghyeon00/docker-project">Project GitHub Repository</a>
    </DashboardCard>
  );
};

export default ProjectInformation;
