import React from 'react';
import { Grid, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';

// components
import MyInformation from './components/MyInformation';
import Blog from './components/Blog';
import ServerNumber from './components/ServerNumber';
import ProjectInformation from './components/ProjectInformation';
import MyCareer from './components/MyCareer';

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={4}>
            <ServerNumber />
          </Grid>
          <Grid item xs={12} lg={4}>
            <ProjectInformation />
          </Grid>

          <Grid item xs={8}>
            <MyInformation />
          </Grid>
          <Grid item xs={12} lg={4}>
            {/* <Grid container spacing={3}> */}
            {/* <Grid item xs={12}>
                <YearlyBreakup />
              </Grid> */}
            {/* </Grid> */}
          </Grid>
          {/* <Grid item xs={12} lg={4}>
            <RecentTransactions />
          </Grid> */}
          <Grid item xs={12} lg={8}>
            <MyCareer />
          </Grid>
          <Grid item xs={12}>
            <Blog />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
