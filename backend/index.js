const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { authSocket, socketDebug } = require("./middleware/auth_socket");
const messagesHandler = require("./controllers/message");
const { pool } = require("./models/db");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const server = app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

// Socket.IO server attached to the same HTTP server
const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: "*" } });

io.use(authSocket);

const clients = {};

io.on("connection", (socket) => {
  console.log("connected");
  socket.use(socketDebug);

  const user_id = socket.handshake.headers.user_id;
  clients[user_id] = { socket_id: socket.id, user_id };

  messagesHandler(socket, io);

  // Error handler
  socket.on("error", (error) => {
    socket.emit("error", { error: error.message });
  });

  // For disconnect
  socket.on("disconnect", () => {
    console.log(socket.id);
    for (const key in clients) {
      if (clients[key].socket_id === socket.id) {
        delete clients[key];
      }
    }
    console.log(clients);
  });
});

// Your other routes and middlewares
app.use("/carts", cartRouter);
app.use("/orders", orderRouter);
app.use("/reviews", reviewRouter);
app.use("/users", userRouter);
app.use("/roles", roleRouter);
app.use("/restaurants", restaurantRouter);
app.use("/riders", ridersRouter);
app.use("/items", itemRouter);
app.use('/contact', email);

// Stripe route
app.use('/create-payment-intent', require("./routes/stripe"));

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));
