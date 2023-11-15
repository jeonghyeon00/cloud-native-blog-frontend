import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';
import DashboardCard from '../../components/shared/DashboardCard';
import axios from '../../api/api';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';

const Stocks = () => {
  const [items, setItems] = useState([]);
  const [searchText, setSearchText] = useState();
  const [searchTextBefore, setSearchTextBefore] = useState();
  const [loading, setLoading] = useState(true)
  const searchOnClick = () => {
    setSearchText(searchTextBefore);
  };
  useEffect(() => {
    async function getResult() {
      if (searchText == null) {
        const result = await axios.get('/stocks', {});
        setItems(result.data.response.body.items.item);
      } else {
        const result = await axios.get(`/stocks?text=${searchText}`, {});
        setItems(result.data.response.body.items.item);
      }
      setLoading(false)
    }
    getResult();
  }, [searchText]);

  return (
    <DashboardCard title="주식 (공공 데이터 API, 로딩시간이 많이 깁니다.)">
      검색어
      <CustomTextField
        onChange={(e) => {
          setSearchTextBefore(e.target.value);
        }}
      ></CustomTextField>
      <Button color="primary" variant="contained" disableElevation onClick={searchOnClick}>
        검색
      </Button>
      <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: 'nowrap',
            mt: 2,
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  종목명
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  기준일자
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  종가
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? "로딩중 입니다." :
                (
            items.map((item) => (
              <TableRow key={item.title}>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: '15px',
                      fontWeight: '500',
                    }}
                  >
                    {item.itmsNm}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Box>
                      <Typography
                        color="textSecondary"
                        sx={{
                          fontSize: '13px',
                        }}
                      >
                        {item.basDt}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>

                <TableCell>
                  <Typography
                    color="textSecondary"
                    sx={{
                      fontSize: '13px',
                    }}
                  >
                    {item.clpr}
                  </Typography>
                </TableCell>
              </TableRow>
            )))}
          </TableBody>
        </Table>
      </Box>
    </DashboardCard>
  )
};

export default Stocks;
