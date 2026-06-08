import config from './config';
import app from './app';

const port = config.port || 4000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
