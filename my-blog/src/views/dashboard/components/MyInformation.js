import React, { useEffect } from 'react';
import DashboardCard from '../../../components/shared/DashboardCard';
import axios from '../../../api/api';

const MyInformation = () => {
  const [data, setData] = React.useState('1');
  useEffect(() => {
    async function getData() {
      const result = await axios.get('/information');
      setData(result.data);
    }
    getData();
  }, [setData]);
  return (
    <DashboardCard title="나의 소개">
      <div>
        <b>이름 :</b> {data.name}
        <p></p>
        <b>GitHub:</b> <a href={data.githubUrl}>Link</a>
        <p></p>
        <b>생일 :</b> {data.birthdate}
        <p></p>
        {data.description}
        <p></p>
        <b>위 정보들은 DB에서 가져온 정보들로 구성되었습니다.</b>
      </div>
    </DashboardCard>
  );
};

export default MyInformation;
