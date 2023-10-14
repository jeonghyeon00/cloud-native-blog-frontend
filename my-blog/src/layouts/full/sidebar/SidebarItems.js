import React, { useState, useEffect } from 'react';
import Menuitems from './MenuItems';
import { useLocation } from 'react-router';
import { Box, List } from '@mui/material';
import NavItem from './NavItem';
import NavGroup from './NavGroup/NavGroup';

const SidebarItems = () => {
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const [test, setTest] = useState(Menuitems);
  console.log(test);
  useEffect(() => {
    setTest(
      Menuitems.filter((item) => {
        if (localStorage.getItem('token') != null) {
          if (item.login !== false) {
            return item;
          }
        } else {
          if (item.login === false || item.login === undefined) {
            return item;
          }
        }
      }),
    );
  }, [localStorage.getItem('token')]);

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {test.map((item) => {
          // {/********SubHeader**********/}
          if (item.subheader) {
            return <NavGroup item={item} key={item.subheader} />;

            // {/********If Sub Menu**********/}
            /* eslint no-else-return: "off" */
          } else {
            return <NavItem item={item} key={item.id} pathDirect={pathDirect} />;
          }
        })}
      </List>
    </Box>
  );
};
export default SidebarItems;
