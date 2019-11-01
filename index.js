const express = require("express");
const server = express();

const projectsRouter = require("./routes/projectsRouter");


// Custom Logger Middleware
const logger = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} to ${req.path} from ${req.get('host')}`);
    next();
}

server.use(express.json());
server.use(logger);
server.use("/api/projects", projectsRouter);

server.listen(4000, () => console.log("\n=== Boom! Server is now listening on port 4000! ===\n"))