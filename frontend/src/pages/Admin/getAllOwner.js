import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";

import axios from "axios";
const GetAllOwner = () => {
  const { token, role } = useSelector((state) => ({
    token: state.auth.token,
    role: state.auth.role,
  }));

  const [owner, setOwner] = useState([]);
  const [message, setMessage] = useState("");
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/users/restaurantOwner/Registration`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOwner(response.data.result);
      console.log(response.data.result);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    if (role == "Admin") fetchUsers();
  }, []);

  const acceptPendingRiders = async (id) => {
    try {
      const accepted = await axios.post(
        `http://localhost:5000/users/restaurantOwnerRegistration/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(accepted);
      setMessage(accepted.data.message);
          window.location.reload();

    } catch (err) {
      console.log(err);
    }
  };

  const rejectPendingRiders = async (id) => {
    try {
      const reject = await axios.delete(
        `http://localhost:5000/users/restaurantOwnerRegistration/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(reject.data.message);
      window.location.reload();

    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container
      maxWidth="lr"
      sx={{
        height: "1000px",
        display: "flex",
        flexDirection: "column",
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        padding: "20px",
        borderRadius: "8px",
        background:"white"
      }}
    >
      <Typography variant="h5" gutterBottom style={{color:"black"}}>
        All Owner Restaurants Registration Pending
      </Typography>
      <List sx={{ width: "100%", color:"black"  , fontWeight:"bold"}}>
        <ListItem
          sx={{
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid black",
          }}
        >
          <ListItemText primary="Name" sx={{ flex: 1, fontWeight: "bold" }} />
          <ListItemText primary="Email" sx={{ flex: 1, fontWeight: "bold" }} />
          <ListItemText primary="Phone" sx={{ flex: 1, fontWeight: "bold" }} />
          <Box sx={{ flex: 1 }} />
        </ListItem>
        {owner.map((user) => (
          <ListItem
            key={user.id}
            sx={{
              display: "flex",
              alignItems: "center",
              borderBottom: "1px solid #ddd",
              padding: "11px",
              fontWeight: "bold"
            }}
          >
            <ListItemText primary={user.first_name} sx={{ flex: 1 }} />
            <ListItemText primary={user.email} sx={{ flex: 1 }} />
            <ListItemText primary={user.phone_number} sx={{ flex: 1 }} />
            <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
              <Button
                onClick={() => {
                  acceptPendingRiders(user.id);
                }}
                variant="contained"
                color="success"
                sx={{ marginRight: "10px" }}
              >
                Accept
              </Button>
              <Button
                onClick={() => rejectPendingRiders(user.id)}
                variant="contained"
                color="error"
              >
                Reject
              </Button>
            </Box>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default GetAllOwner;
