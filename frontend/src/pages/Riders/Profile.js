import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Container,
  Grid,
  Avatar,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const Profile = () => {
  const { userId } = useSelector((state) => ({
    userId: state.auth.userId,
  }));
  
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
    vehicle_details: "",
    status: "available" 
  });

  const findUserById = async () => {
    try {
      const result = await axios.get(`https://meraki-academy-project-5-1jun.onrender.com/riders/${userId}`);
      setUser(result.data.result);
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  const updateProfile = async () => {
    try {
      await axios.put(`https://meraki-academy-project-5-1jun.onrender.com/riders/${userId}`, {
        vehicle_details: user.vehicle_details,
        status: user.status, 
      });
      await axios.put(`https://meraki-academy-project-5-1jun.onrender.com/users/${userId}`, user);
      findUserById();

      window.location.reload();

    } 
    
    catch (err) {
      console.error("Error updating user data:", err);
    }
  };

  useEffect(() => {
    findUserById();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" gutterBottom color="primary">
            Profile
          </Typography>
          <Avatar
            alt={`${user.first_name} ${user.last_name}`}
            src="/static/images/avatar/1.jpg"
            sx={{
              width: 96,
              height: 96,
              margin: '0 auto',
              border: '2px solid #1976d2',
            }}
          />
          <Typography variant="h6" sx={{ mt: 1, fontWeight: 500 }}>
            {user.email}
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={3}>
          {/* Existing Fields */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="First Name"
              margin="normal"
              name="first_name"
              value={user.first_name}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Last Name"
              margin="normal"
              name="last_name"
              value={user.last_name}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email Address"
              margin="normal"
              name="email"
              type="email"
              value={user.email}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone Number"
              margin="normal"
              name="phone_number"
              value={user.phone_number}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              margin="normal"
              name="address"
              value={user.address}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Vehicle Details"
              margin="normal"
              name="vehicle_details"
              value={user.vehicle_details}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={user.status}
                onChange={handleChange}
                label="Status"
              >
                <MenuItem value="available">Available</MenuItem>
                <MenuItem value="not available">Not Available</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={updateProfile}
            sx={{ width: '50%' }} 
          >
            Save Changes
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Profile;
