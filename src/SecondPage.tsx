import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DepartmentList from './DepartmentList';
import { useNavigate } from 'react-router-dom';

interface Post {
  id: number;
  title: string;
  body: string;
}

const SecondPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userDetails = localStorage.getItem('userDetails');
    if (!userDetails) {
      navigate('/');
    } else {
      axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(response => setPosts(response.data))
        .catch(error => console.error(error));
    }
  }, [navigate]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Title', width: 150 },
    { field: 'body', headerName: 'Body', width: 150 },
  ];

  return (
    <div>
      <h2>Second Page</h2>

        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={posts}
                columns={columns}
                initialState={{
                pagination: {
                    paginationModel: {
                    pageSize: 5,
                    },
                },
                }}
                pageSizeOptions={[5, 10, 15, 25, 50]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
      <DepartmentList />
    </div>
  );
};

export default SecondPage;
