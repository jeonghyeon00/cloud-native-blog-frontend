import React, { useEffect, useState } from 'react';
import { Box, AppBar, Toolbar, styled, Stack, IconButton, Badge, Button } from '@mui/material';
import PropTypes from 'prop-types';
import axios from '../../../api/api';

// components
import Profile from './Profile';

const Header = (props) => {
  let [name, setName] = useState('비회원');
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
  }, [setName]);

  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  // const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));

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
        안녕하세요 <b>{` ${name}`}</b> 님
        <Stack spacing={1} direction="row" alignItems="center">
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
