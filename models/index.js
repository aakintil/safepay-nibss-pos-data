const mongoose = require('mongoose');
const fs = require('fs');

/* eslint-ignore */
fs.readdirSync(__dirname)
  .filter((file) => file.endsWith('.js') && file !== 'index.js')
  .map(file => require(`${__dirname}/${file}`)); // eslint-disable-line

mongoose.Promise = global.Promise;

const options = {
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  poolSize: 10,
  bufferMaxEntries: 0,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect("mongodb+srv://admin:012020Mongodb!@simple-gantt-cluster-lo6fo.mongodb.net/safepay?retryWrites=true&w=majority", options);

if (process.env.NODE_ENV === 'development') {
  mongoose.set('debug', true);
}

mongoose.connection.on('connected', () => {
  console.log('connected to mongodb');
});

mongoose.connection.on('error', (e) => {
  console.log(e.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('disconnected from mongodb');
});
