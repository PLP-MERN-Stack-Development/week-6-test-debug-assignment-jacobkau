// server/config/index.js

require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5000,
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/mern_test_db',
  jwtSecret: process.env.JWT_SECRET || 'f2063994228ba4ffbac802dbb0d3a008ea965b7f534117191051baaed9068eee5eaf45a4e6864d76360f1785b814446ecd7124889ee8fba596925dd879a7c2eb',
  nodeEnv: process.env.NODE_ENV || 'development',
};
