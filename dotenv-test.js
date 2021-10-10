const path = require('path');
const dotenv = require('dotenv');

require('regenerator-runtime/runtime');

module.exports = async () => {
  dotenv.config({ path: path.resolve(__dirname, '.env.test') });
};
