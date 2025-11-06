const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const regrout = require("./routes/auth.routes");
const takskRoute = require("./routes/task.routes");

dotenv.config(); 

const app = express();
const Port = 8000;

// connect to MongoDB before starting the server
connectDB(); 

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello from test" });
});

app.use('/auth', regrout);
app.use('/tasks', takskRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));