import React, { useEffect, useState } from 'react';

import { Button } from '@mui/material';
import DashboardCard from '../../components/shared/DashboardCard';
import axios from '../../api/api';

const BoardsWrite = () => {
  const [boards, setBoards] = useState([]);
  useEffect(() => {
    async function getResult() {
      const result = await axios.get('/boards');
      setBoards(result.data);
    }
    getResult();
  }, []);
  return (
    <DashboardCard title="게시판">
      <Button color="primary" variant="contained" disableElevation>
        작성 왼료
      </Button>
    </DashboardCard>
  );
};

export default BoardsWrite;
