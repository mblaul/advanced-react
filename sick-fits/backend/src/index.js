const cookieParser = require('cookie-parser');

require('dotenv').config({ path: 'variables.env' });
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

server.express.use(cookieParser());

server.start(
	{
		cors: {
			credentials: true,
			origin: process.env.FRONTEND_URL
		}
	},
	(details) => {
		console.log(`Server is now running on http://localhost:${details.port}`);
	}
);
