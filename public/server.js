"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const controllers_1 = require("./controllers/controllers");
const server = (0, http_1.createServer)((req, res) => {
    (0, controllers_1.handleRequest)(req, res);
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
