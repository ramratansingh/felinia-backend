const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const vetRoutes = require('./routes/vetAuth');
const catRoutes = require('./routes/cats');
const recordRoutes = require("./routes/records");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Atlas connected'))
  .catch(err => console.log('MongoDB error:', err));

// Routes
app.use('/api/vets', vetRoutes);
app.use('/api/cats', catRoutes);
app.use("/api/records", recordRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
