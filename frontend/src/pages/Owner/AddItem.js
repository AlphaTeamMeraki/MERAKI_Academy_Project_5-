import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";

const AddItem = () => {
  const token = useSelector((state) => state.auth.token);

  const [item, setItem] = useState({
    name: "",
    description: "",
    price: "",
    sub_category: "",
    available: true,
    image: null,
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setItem({ ...item, image: files[0] });
    } else {
      setItem({ ...item, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(item).forEach((key) => {
      formData.append(key, item[key]);
    });

    try {
      const result = await axios.post(
        "https://meraki-academy-project-5-1jun.onrender.com/items/addItems",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(result.data.message);
      setTimeout(() => {
        navigate("/restaurant_owner/view-item");
      }, 2000);
    } catch (error) {
      console.error("Error during item addition:", error);
      if (error.response && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          width: "100%",
          backgroundColor: "white",
          padding: "20px",
          margin: "auto",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          borderRadius: "8px",
          marginLeft: 2,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "500px",
          marginBottom: "50px",
        }}
      >
        <Typography component="h1" variant="h5" color="black">
          Add New Item
        </Typography>
        {message && <Typography color="error">{message}</Typography>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="name"
            label="Item Name"
            value={item.name}
            onChange={handleChange}
            InputProps={{
              style: { color: "black" },
            }}
            InputLabelProps={{
              style: { color: "black" },
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="description"
            label="Description"
            value={item.description}
            onChange={handleChange}
            InputProps={{
              style: { color: "black" },
            }}
            InputLabelProps={{
              style: { color: "black" },
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="price"
            label="Price"
            type="number"
            value={item.price}
            onChange={handleChange}
            InputProps={{
              style: { color: "black" },
            }}
            InputLabelProps={{
              style: { color: "black" },
            }}
          />
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel style={{ color: "black" }}>Sub Category</InputLabel>
            <Select
              name="sub_category"
              value={item.sub_category}
              onChange={handleChange}
              label="Sub Category"
              sx={{ color: "black", borderColor: "white" }}
              InputLabelProps={{
                style: { color: "white" },
              }}
            >
              <MenuItem value="Appetizer">Appetizer</MenuItem>
              <MenuItem value="Main Course">Main Course</MenuItem>
              <MenuItem value="Dessert">Dessert</MenuItem>
              <MenuItem value="Beverage">Beverage</MenuItem>
            </Select>
          </FormControl>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="image"
            type="file"
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            style={{ color: "white" }}
          >
            Add Item
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddItem;
