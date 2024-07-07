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
    { field: 'id', headerName: 'ID', minWidth: 90, flex: 0.5 },
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'body', headerName: 'Body', flex: 1 },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <DepartmentList />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - 260px)` }, 
          marginTop: '70px', 
        }}
      >
        <Box sx={{ height: '80vh', width: '100%', '& .MuiDataGrid-columnSeparator': { display: 'none' } }}>
          <DataGrid
            rows={posts}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 15,
                },
              },
            }}
            pageSizeOptions={[5, 10, 15, 25, 50]}
            checkboxSelection
            disableRowSelectionOnClick
            sx={{
                '& .MuiDataGrid-cell': {
                  fontSize: '1rem', 
                },
                '& .MuiDataGrid-columnHeaderTitle': {
                  fontSize: '1.1rem', 
                },
              }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SecondPage;
