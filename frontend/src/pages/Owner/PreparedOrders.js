import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Typography, Box, Container, Grid, Card, CardContent, Button } from '@mui/material';

const PreparedOrders = () => {
  const token = useSelector((state) => state.auth.token);
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const getPreparedOrders = async () => {
      try {
        const result = await axios.get('https://meraki-academy-project-5-1jun.onrender.com/restaurants/restaurant/prepare', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(result.data.result);
      } catch (error) {
        setMessage('Error getting prepared orders. Please try again later.');
      }
    };

    getPreparedOrders();
  }, [token]);

  const handleReadyToPickup = async (orderId) => {
    try {
      await axios.put(`https://meraki-academy-project-5-1jun.onrender.com/restaurants/read/${orderId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: 'Ready to Pick Up' } : order
      ));
    } catch (error) {
      setMessage('Error updating order status. Please try again later.');
    }
  };

  if (!orders.length) {
    return (
      <Container style={{height:"700px"}}>
        {message && <Typography variant="h5" color="error">{message}</Typography>}
        <Typography variant="h6">Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container style={{height:"500px"}}>
      <Typography variant="h4" gutterBottom>Prepared Orders</Typography>
      <Grid container spacing={3}>
        {orders.map(order => (
          <Grid item key={order.id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Order #{order.id}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Delivery Address: {order.delivery_address}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Total Price: ${order.total_price}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Status: {order.status}
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => handleReadyToPickup(order.id)}
                  disabled={order.status !== 'Prepare'}
                >
                  Mark as Ready to Pick Up
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PreparedOrders;
