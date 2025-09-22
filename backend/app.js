require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

;
// const authRouter = require('./src/routes/authRouter')
// const produkRouter = require('./src/routers/produkRouter')

const autgRouter = require('./src/routes/authRouter')
const produkRouter = require('./src/routes/produkRouter');
const authRouter = require('./src/routes/authRouter');

// ambil list origin dari .env
const allowedOrigins = process.env.CORS_ALLOW_LIST.split(',');

const corsOptions = {
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow non-browser requests
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy: origin not allowed'));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/produk", produkRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
