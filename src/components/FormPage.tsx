import * as React from 'react';
import { useState } from 'react';
import { TextField, Button, Box, Typography, AppBar, Toolbar, Card, CardContent,  Alert, AlertTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function FormPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({ name: '', phone: '', email: '' });
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    let tempErrors = { name: '', phone: '', email: '' };
    tempErrors.name = name ? '' : 'Name is required';

    const phonePattern = /^\d{10}$/;
    tempErrors.phone = phone ? (phonePattern.test(phone) ? '' : 'Phone number is not valid') : 'Phone number is required';

    tempErrors.email = email ? '' : 'Email is required';
    if (email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      tempErrors.email = emailPattern.test(email) ? '' : 'Email is not valid';
    }

    setErrors(tempErrors);
    return Object.values(tempErrors).every(error => error === '');
  };

  const handleSubmit = () => {
    if (validate()) {
      localStorage.setItem('userDetails', JSON.stringify({ name, phone, email }));
      setShowSuccessAlert(true);
      setTimeout(() => {
        setShowSuccessAlert(false);
        navigate('/second-page');
      }, 3000); 
    }
  };

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            User Details
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ marginTop:'15%',flexGrow: 1, display: 'flex', justifyContent: 'center',flexDirection:'column', alignItems: 'center', bgcolor: 'background.default', height:'100%' }}>
        <span style={{marginBottom:'20px'}}><img src="https://www.growmeorganic.com/wp-content/uploads/2020/05/GrowMeOrganicLogo-e1589337030567-200x33.png" alt="GrowMeOrganic" /></span>
        <Card sx={{ maxWidth: 800, maxHeight: 800, p:3, backgroundColor:'#F5F7F8'  }}>
          <CardContent sx={{ maxWidth: 400, width: 400, p:3 }}>
            {showSuccessAlert && (
              <Alert severity="success" sx={{ mb: 2, fontSize: '14px', }}>
                <AlertTitle>Success</AlertTitle>
                User details submitted successfully!
            </Alert>
            )}
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={!!errors.name}
              helperText={errors.name}
              fullWidth
              size="small" 
              sx={{ mb: 2, backgroundColor:'white' }}
            />
            <TextField
              label="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={!!errors.phone}
              helperText={errors.phone}
              fullWidth
              size="small" 
              sx={{ mb: 2, backgroundColor:'white' }}
            />
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
              size="small" 
              sx={{ mb: 2, backgroundColor:'white' }}
            />
            <Button variant="contained" onClick={handleSubmit} fullWidth sx={{ mt: 2 }}>
              Submit
            </Button>
            
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
