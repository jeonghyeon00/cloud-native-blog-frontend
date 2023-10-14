import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useState } from 'react';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';
import axios from '../../../api/api';
import { useNavigate } from 'react-router';

const AuthRegister = ({ title, subtitle, subtext }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          axios
            .post('/auth/sign-up', {
              name: name,
              userId: userId,
              password: password,
            })
            .then((result) => {
              if (result.data.success === false) {
                alert('회원가입 실패 아이디 중복가 중복입니다.');
              } else {
                navigate('/auth/login');
              }
            });
        }}
      >
        <Box>
          <Stack mb={3}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="name"
              mb="5px"
            >
              이름
            </Typography>
            <CustomTextField
              onChange={(e) => {
                setName(e.target.value);
              }}
              id="name"
              variant="outlined"
              fullWidth
            />

            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="ID"
              mb="5px"
              mt="25px"
            >
              아이디
            </Typography>
            <CustomTextField
              onChange={(e) => {
                setUserId(e.target.value);
              }}
              id="ID"
              variant="outlined"
              fullWidth
            />

            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="password"
              mb="5px"
              mt="25px"
            >
              비밀번호
            </Typography>
            <CustomTextField
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              id="password"
              variant="outlined"
              fullWidth
            />
          </Stack>
          <Button type="submit" color="primary" variant="contained" size="large" fullWidth>
            회원가입
          </Button>
        </Box>
      </form>
      {subtitle}
    </>
  );
};
export default AuthRegister;
