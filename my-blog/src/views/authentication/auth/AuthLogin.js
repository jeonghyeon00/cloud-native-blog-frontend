import React, { useState } from 'react';
import { Box, Typography, FormGroup, Button, Stack } from '@mui/material';
import axios from '../../../api/api';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const AuthLogin = ({ title, subtitle, subtext }) => {
  localStorage.clear();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  console.log(userId);
  console.log(password);
  return (
    <>
      <Button variant="outlined" color="primary" fullWidth component={Link} to={'/'}>
        홈으로
      </Button>
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
            .post('/auth/sign-in', {
              userId: userId,
              password: password,
            })
            .then((result) => {
              if (result.data.token != null) {
                localStorage.setItem('token', result.data.token);
                navigate('/');
              } else {
                alert('계정 혹은 비밀번호를 확인해주세요.');
              }
            });
        }}
      >
        <Stack>
          <Box>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="username"
              mb="5px"
            >
              아이디
            </Typography>
            <CustomTextField
              onChange={(e) => setUserId(e.target.value)}
              id="username"
              variant="outlined"
              fullWidth
            />
          </Box>
          <Box mt="25px">
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="password"
              mb="5px"
            >
              비밀번호
            </Typography>
            <CustomTextField
              id="password"
              type="password"
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
          </Box>

          <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
            <FormGroup>
              {/* <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Remeber this Device"
                    /> */}
            </FormGroup>
            {/* <Typography
              component={Link}
              to="/"
              fontWeight="500"
              sx={{
                textDecoration: 'none',
                color: 'primary.main',
              }}
            >
              Forgot Password ?
            </Typography> */}
          </Stack>
        </Stack>
        <Box>
          <Button color="primary" variant="contained" size="large" fullWidth type="submit">
            로그인
          </Button>
        </Box>
        {subtitle}
      </form>
    </>
  );
};

export default AuthLogin;
