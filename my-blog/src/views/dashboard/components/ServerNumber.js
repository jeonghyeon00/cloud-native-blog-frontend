import React, { useEffect } from 'react';
import DashboardCard from '../../../components/shared/DashboardCard';
import axios from '../../../api/api';

const ServerNumber = () => {
  const [data, setData] = React.useState('1');
  useEffect(() => {
    async function getData() {
      const result = await axios.get('/server');
      setData(result.data);
      console.log(result.data);
    }
    getData();
  }, [setData]);

  return (
    <DashboardCard title="Load Balancing Server">
      <div>
        From Server <b>{data.serverNumber}</b>
      </div>
    </DashboardCard>
  );
};

export default ServerNumber;
