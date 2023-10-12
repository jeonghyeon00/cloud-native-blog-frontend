import React, { useState } from 'react';
import { Box, Typography, FormGroup, Button, Stack } from '@mui/material';
import axios from '../../../api/api';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';

const AuthLogin = ({ title, subtitle, subtext }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  console.log(userId);
  console.log(password);
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
          axios.post('/auth/sign-in', {
            userId: userId,
            password: password,
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
