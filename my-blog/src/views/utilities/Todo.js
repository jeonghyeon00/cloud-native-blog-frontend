import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Button,
  Checkbox,
} from '@mui/material';
import DashboardCard from '../../components/shared/DashboardCard';
import axios from '../../api/api';

const Todo = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  async function getResult() {
    if (localStorage.getItem('token') == null) {
      navigate('/');
    }
    const result = await axios.get('/todo', {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
    setTodos(result.data);
  }
  useEffect(() => {
    getResult();
  }, []);
  const updateCheck = async (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isChecked: !todo.isChecked } : todo,
    );
    setTodos(updatedTodos);
    await axios.patch(`/todo/${id}`, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
  };

  const deleteTodo = (id) => {
    axios.delete(`/todo/${id}`, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
    navigate('/todo');
  };

  const toWrite = () => {
    if (localStorage.getItem('token') != null) {
      navigate('/todo/write');
    } else {
      alert('로그인을 먼저 해주세요');
    }
  };

  return (
    <DashboardCard title="Todo 리스트">
      <Button color="primary" variant="contained" onClick={toWrite} disableElevation>
        작성하기
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
                  Id
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  내용
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  체크
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  작성 시간
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map((todo) => (
              <TableRow key={todo.title}>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: '15px',
                      fontWeight: '500',
                    }}
                  >
                    {todo.id}
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
                      <Typography variant="subtitle2" fontWeight={600}>
                        <Link to={`/boards/${todo.id}`}>{todo.title}</Link>
                      </Typography>
                      <Typography
                        color="textSecondary"
                        sx={{
                          fontSize: '13px',
                        }}
                      >
                        {todo.description}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                    <Checkbox
                      checked={todo.isChecked}
                      onClick={() => {
                        updateCheck(todo.id);
                      }}
                    />
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    sx={{
                      px: '4px',
                    }}
                    size="small"
                    label={todo.createdAt}
                  ></Chip>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                    <Button
                      color="primary"
                      variant="contained"
                      size="large"
                      fullWidth
                      onClick={() => {
                        deleteTodo(todo.id);
                      }}
                    >
                      {' '}
                      삭제{' '}
                    </Button>
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </DashboardCard>
  );
};

export default Todo;
