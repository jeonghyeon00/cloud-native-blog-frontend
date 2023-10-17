import React, { useEffect, useState } from 'react';

import { Box, Button, Input, Typography } from '@mui/material';
import DashboardCard from '../../components/shared/DashboardCard';
import axios from '../../api/api';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const BoardUpdate = () => {
  const location = useLocation();

  const [load, setLoad] = useState(true);
  useEffect(() => {
    const result = () => {
      axios.get(`/boards/${location.pathname.split('/')[3]}`).then((result) => {
        setTitle(result.data.title);
        setContent(result.data.content);
      });
    };
    result();
  }, [load === true]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const navigate = useNavigate();
  const updateBoard = async () => {
    const boardId = location.pathname.split('/')[3];
    console.log(boardId);
    const result = await axios.patch(
      `/boards/${boardId}`,
      {
        title: title,
        content: content,
      },
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      },
    );

    if (result.data === true) {
      navigate(`/boards`);
    } else {
      alert('작성자가 아닙니다.');
    }
  };
  const textFieldStyle = {
    width: '100%', // Adjust the width as needed
  };
  return (
    <DashboardCard title="게시판">
      <Button color="primary" variant="contained" disableElevation onClick={updateBoard}>
        수정하기 왼료
      </Button>
      <Button color="primary" variant="contained" disableElevation component={Link} to={'/boards'}>
        뒤로 가기
      </Button>
      <Box>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          component="label"
          htmlFor="username"
          mb="5px"
        >
          제목
        </Typography>
        <CustomTextField
          style={textFieldStyle}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
        ></CustomTextField>
      </Box>
      <Box>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          component="label"
          htmlFor="username"
          mb="5px"
        >
          내용
        </Typography>
        <CustomTextField
          style={textFieldStyle}
          rows="5"
          multiline
          onChange={(e) => {
            setContent(e.target.value);
          }}
          value={content}
        ></CustomTextField>
      </Box>
    </DashboardCard>
  );
};

export default BoardUpdate;
