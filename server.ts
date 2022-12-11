import express from "express";
import messageRouter from "./routes/messages";

const app = express();

app.use("/messages", messageRouter);
app.get('/', (req, res) => {
  res.send('200 OK!');
});

export default app;
