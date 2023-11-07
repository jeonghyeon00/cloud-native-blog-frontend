import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import DashboardCard from '../../components/shared/DashboardCard';
import axios from '../../api/api';
import PageContainer from 'src/components/container/PageContainer';
import { useLocation } from 'react-router-dom';

const BoardByOne = () => {
  const [board, setBoard] = useState({});
  const url = useLocation();
  const navigate = useNavigate();
  const update = () => {
    const split = url.pathname.split('/');
    console.log(split);
    navigate(`/${split[1]}/update/${split[2]}`);
  };

  useEffect(() => {
    async function getResult() {
      const result = await axios.get(url.pathname);
      setBoard(result.data);
    }
    getResult();
  }, []);

  const deleteBoard = () => {
    const result = axios
      .delete(url.pathname, {
        headers: { Authorization: `${localStorage.getItem('token')}` },
      })
      .then((result) => {
        if (result.data === false) {
          alert('작성자가 아닙니다.');
        }
        navigate('/boards');
      });
  };

  return (
    <PageContainer title="Sample Page" description="this is Sample page">
      <Button color="primary" variant="contained" component={Link} to="/boards" disableElevation>
        게시판 목록으로 돌아가기
      </Button>
      <Button color="primary" variant="contained" onClick={update} disableElevation>
        수정하기
      </Button>
      <Button color="primary" variant="contained" disableElevation onClick={deleteBoard}>
        삭제하기
      </Button>
      <DashboardCard title={`${board.title}`}>
        <Typography>작성자 : {board.createdBy}</Typography>
        <Typography>
          <br></br>
          {board.content}
        </Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default BoardByOne;
