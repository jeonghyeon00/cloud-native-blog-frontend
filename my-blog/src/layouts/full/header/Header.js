import React, { useEffect, useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  styled,
  Stack,

  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import axios from '../../../api/api';

// components
import Profile from './Profile';
import {useNavigate} from "react-router";

const Header = (props) => {
  let [name, setName] = useState('비회원');
  const navigate = useNavigate()
  const logOut = () => {
    localStorage.clear();
    setName("비회원")
    navigate('/');
  };
  useEffect(() => {
    if (localStorage.getItem('token') != null) {
      axios
        .get('/name', {
          headers: { Authorization: localStorage.getItem('token') },
        })
        .then((result) => {
          if (result.data.name == null) {
            alert('로그인을 다시 해주세요');
            localStorage.clear();
          }
          setName(result.data.name);
        });
    } else {
      setName('비회원');
    }
  }, []);


  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: '70px',
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        <Box flexGrow={1} />
        <Typography variant="subtitle1" color="textSecondary">
          안녕하세요 {'  '} <b>{name}</b> 님
        </Typography>
        <Stack spacing={1} direction="row" alignItems="center">
          <Profile logOut={logOut} />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
