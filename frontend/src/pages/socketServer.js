import io from "socket.io-client";

const socketInit = ({ user_id, token }) => {
  return io("https://meraki-academy-project-5-1jun.onrender.com/", {
    extraHeaders: {
      user_id,
      token,
    },
  });
};
export default socketInit;
