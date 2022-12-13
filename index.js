const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const app = express();
const blog=require('./routes/blog');
const DB=require('./database/db')

dotenv.config({ path: "./.env" });

app.use(express.json());
app.use(cors());


// Initializing Database
DB()

app.use('/api',blog)


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
