import React from 'react';
import { CardContent, Typography, Grid, Rating } from '@mui/material';
import { Stack } from '@mui/system';
import BlankCard from '../../../components/shared/BlankCard';
import DashboardCard from 'src/components/shared/DashboardCard';

const ecoCard = [
  {
    title: 'Kotlin',
    photo:
      'https://velog.velcdn.com/images/haero_kim/post/212f9167-e32d-41f1-be80-0e6bc12c6cf8/general.png',
    rating: 5,
  },
  {
    title: 'Spring Boot',
    photo:
      'https://velog.velcdn.com/images/falling_star3/post/7eef0696-76c6-4dcb-858b-f91ef597eddc/%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8.JPG',
    rating: 5,
  },
  {
    title: 'Nginx',
    photo:
      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdeQIEi%2FbtqCO2tqKD6%2FtyNjWGeqqAKZez0izyKukk%2Fimg.png',
    rating: 3,
  },
  {
    title: 'React',
    photo:
      'https://tech.osci.kr/wp-content/uploads/2022/05/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA-2022-05-03-%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE-3.57.02.png',
    rating: 1,
  },
];

const Blog = () => {
  return (
    <DashboardCard title="프로젝트에 사용된 기술들">
      <Grid container spacing={3}>
        {ecoCard.map((product, index) => (
          <Grid item sm={12} md={4} lg={3} key={index}>
            <BlankCard>
              <Typography>
                <img src={product.photo} alt="img" width="100%" height="110px" />
              </Typography>
              <CardContent sx={{ p: 3, pt: 2 }}>
                <Typography variant="h6">{product.title}</Typography>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1}>
                  <Rating name="read-only" size="small" value={product.rating} readOnly />
                </Stack>
              </CardContent>
            </BlankCard>
          </Grid>
        ))}
      </Grid>
    </DashboardCard>
  );
};

export default Blog;
