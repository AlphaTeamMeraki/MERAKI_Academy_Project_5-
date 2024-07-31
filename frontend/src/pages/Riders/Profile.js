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
  
} from "@mui/material";
import AllOrders from "./AllOrders";

const Profile = () => {
  const { userId } = useSelector((state) => ({
    userId: state.auth.userId,
  }));
  const [user, setUser] = useState([]);
  const findUserById = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/riders/${userId}`);
      console.log(result);
      setUser(result.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const update = async () => {
    try {
      const result = await axios.put(`http://localhost:5000/riders/${userId}`, {
        vehicle_details: user.vehicle_details,
      });
      console.log(result);
      setUser(result.data.result);
      const result1 = await axios.put(
        `http://localhost:5000/users/${userId}`,
        user
      );
      findUserById()
      setUser(result.data.result);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    findUserById();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Container maxWidth="me" style={{ marginTop: 20 }}>
        <Paper style={{ padding: 20 }}>
          <Grid style={{ margin: "auto" }}>
          <Typography variant="h5" gutterBottom>Profile</Typography>
          </Grid>
          <Grid>
            <Grid style={{ textAlign: "center" }}>
              <Avatar
                alt={user.first_name}
                src="/static/images/avatar/1.jpg"
                sx={{ width: 96, height: 96, margin: "0 auto" }}
              />
              <Typography variant="h6">{user.email}</Typography>
            </Grid>
            <Grid
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <TextField
                style={{ width: "90%" }}
                label="First Name"
                margin="dense"
                name="first_name"
                type="text"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={user.first_name}
                onChange={handleChange}
              />
              <TextField
                label="Last Name"
                margin="dense"
                name="last_name"
                type="text"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={user.last_name}
                onChange={handleChange}
                style={{ marginTop: 16, width: "90%" }}
              />
              <TextField
                label="Email Address"
                margin="dense"
                name="email"
                type="email"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={user.email}
                onChange={handleChange}
                style={{ marginTop: 16, width: "90%" }}
              />
              <TextField
                label="Phone Number"
                margin="dense"
                name="phone_number"
                type="text"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={user.phone_number}
                onChange={handleChange}
                style={{ marginTop: 16, width: "90%" }}
              />

              <TextField
                label="Address"
                margin="dense"
                name="address"
                type="text"
                fullWidth
                value={user.address}
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
                style={{ marginTop: 16, width: "90%" }}
              />
              <TextField
                label="Vehicle Details"
                margin="dense"
                name="vehicle_details"
                type="text"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={user.vehicle_details}
                onChange={handleChange}
                style={{ marginTop: 16, width: "90%" }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={3}
            style={{ marginTop: 20, justifyContent: "flex-end" }}
          >
            <Grid item>
              <Button  variant="contained" onClick={update} color="primary">
                Save
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>


      <AllOrders/>
    </>
  );
};

export default Profile;
