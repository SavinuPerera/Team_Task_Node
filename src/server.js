const app = require('./app');
const PORT = 3000;

const server = app.listen(PORT, () => {
  console.log('Server port is ' + PORT);
});

server.on('error', (err) => {
  console.error('Server failed to start:', err.message);
  process.exit(1);
});
