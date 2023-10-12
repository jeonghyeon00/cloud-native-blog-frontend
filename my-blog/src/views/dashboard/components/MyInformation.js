import React, { useEffect } from 'react';
import { Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '../../../components/shared/DashboardCard';
import Chart from 'react-apexcharts';
import axios from '../../../api/api';
import { async } from 'q';

const MyInformation = () => {
    const [data, setData] = React.useState("1");
    useEffect(() => {
        async function getData() {
            const result = await axios.get('/information');
            setData(result.data);
            console.log(result.data);
        }
        getData();
    }, [setData]);
  return (
      <DashboardCard title="나의 소개">
          <a href={data.githubUrl}>깃허브</a>
      </DashboardCard>)
};

export default MyInformation;
