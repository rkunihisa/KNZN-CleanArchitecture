import { CalenderApplication } from './application/calenderApplication';

import http from 'http';

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  const calenderApp = new CalenderApplication();
  const eventList = await calenderApp.create();
  let result = '';
  for (const event of eventList) {
    result += event + '\n';
  }
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(result);
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
