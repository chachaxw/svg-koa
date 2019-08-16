import mongoose from 'mongoose';
import chalk from 'chalk';

const dbUrl = 'mongodb://localhost:27017/test';
const db = mongoose.connection;

mongoose.connect(dbUrl, {useNewUrlParser: true});

db.once('open', () => {
  console.log(chalk.green('[mongoose] Connect MongoDB Success!'));
});

db.on('error', (error) => {
  console.error(chalk.red('[mongoose] Error in MongoDb connection: ' + error));
  mongoose.disconnect();
});

db.on('close', () => {
  console.log(chalk.red('[mongoose] MongoDB disconnected, and try reconnect!'));
  mongoose.connect(dbUrl, {server: { auto_reconnect: true }});
});

export default db;
