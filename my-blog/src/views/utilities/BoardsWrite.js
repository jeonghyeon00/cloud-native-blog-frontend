import React, { useState } from 'react';

import { Box, Button, Typography } from '@mui/material';
import DashboardCard from '../../components/shared/DashboardCard';
import axios from '../../api/api';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const BoardsWrite = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const navigate = useNavigate();
  const postBoard = async () => {
    const result = await axios.post(
      '/boards',
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

    if (result.status === 201) {
      navigate(`/boards/${result.data}`);
    } else {
      alert('재 로그인');
    }
  };
  const textFieldStyle = {
    width: '100%', // Adjust the width as needed
  };
  return (
    <DashboardCard title="게시판">
      <Button color="primary" variant="contained" disableElevation onClick={postBoard}>
        작성 왼료
      </Button>
      <Button color="primary" variant="contained" disableElevation to="/boards" component={Link}>
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
        ></CustomTextField>
      </Box>
    </DashboardCard>
  );
};

export default BoardsWrite;
