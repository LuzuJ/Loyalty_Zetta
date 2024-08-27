"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const qualificationRoutes_1 = require("./routes/qualificationRoutes");
const errorHandler_1 = require("./middlewares/errorHandler");
const app = (req, res) => {
    var _a;
    try {
        if ((_a = req.url) === null || _a === void 0 ? void 0 : _a.startsWith('/api')) {
            (0, qualificationRoutes_1.handleQualificationsRoute)(req, res);
        }
        else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'Not Found' }));
        }
    }
    catch (err) {
        (0, errorHandler_1.handleError)(res, 500, 'Something went wrong');
    }
};
exports.default = app;
