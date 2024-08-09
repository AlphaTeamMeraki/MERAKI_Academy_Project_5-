import axios from "axios";
import socketInit from "../socketServer";
import Message from "../MessageToUser";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate, useSubmit } from "react-router-dom";
import { setRider_id } from "../../redux/auth";

const AllOrdersReady = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [open, setOpen] = useState(false);
  

  const navigate = useNavigate();
  const { token } = useSelector((state) => ({
    token: state.auth.token,
  }));

  const getAllOrders = async () => {
    try {
      const result = await axios.get(`https://meraki-academy-project-5-1jun.onrender.com/riders/all/order`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(result.data.result);
      console.log(result.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  const getItem = async (id) => {
    setId(id);
    setOpen(true);
    setOrderItems([]);
    try {
      const result = await axios.get(
        `https://meraki-academy-project-5-1jun.onrender.com/riders/order/items/${id}`
      );
      setOrderItems(result.data.result);
      console.log(result.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const accept = async () => {
    setOpen(false);
    try {
      const result = await axios.put(
        `https://meraki-academy-project-5-1jun.onrender.com/riders/accept/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setRider_id(result.data.order.rider_id));
      navigate("/rider/All__order_on_way");
      console.log(result.data);
      setOrders(
        orders.map((ele) =>
          ele.id === id ? { ...ele, status: result.data.order.status } : ele
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Container maxWidth="la">
        <Paper style={{ padding: "20px", marginBottom: "20px" }}>
          <Typography variant="h5" gutterBottom>
All Ready to Pick Up Orders
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Restaurant</TableCell>
                  <TableCell>Restaurant_Address</TableCell>
                  <TableCell>delivery_address</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>payment_method</TableCell>

                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders?.map((order) => (
                  <TableRow
                    key={order.id}
                    onClick={() => getItem(order.id)}
                    hover
                  >
                    <TableCell>{order.name}</TableCell>
                    <TableCell>{order.address}</TableCell>
                    <TableCell style={{ width: "20%" }}>
                      {order.delivery_address}
                    </TableCell>
                    <TableCell>{order.total_price}</TableCell>
                    <TableCell>{order.payment_method}</TableCell>

                    <TableCell>{order.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>

      <React.Fragment>
        <Dialog
          open={open}
          PaperProps={{
            style: {
              width: "50%",
            },
          }}
        >
          <DialogTitle>
            {" "}
            <strong>Order Items</strong>
          </DialogTitle>
          <DialogContent alignItems="center">
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderItems?.map((order) => (
                    <TableRow key={order.id} hover>
                      <TableCell>{order.name}</TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell>{order.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
            <Button onClick={accept} color="primary">
              Accept
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  );
};

export default AllOrdersReady;
