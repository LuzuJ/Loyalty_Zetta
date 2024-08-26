"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleQualificationsRoute = void 0;
const qualificationController_1 = require("../controllers/qualificationController");
const qualificationValidator_1 = require("../validators/qualificationValidator");
const handleQualificationsRoute = (req, res) => {
    const { method, url } = req;
    if (method === 'GET' && url === '/api/qualificationsIDs') {
        return (0, qualificationController_1.getQualificationsIDs)(req, res);
    }
    if (method === 'GET' && (url === null || url === void 0 ? void 0 : url.startsWith('/api/qualifications/'))) {
        const id = url.split('/').pop();
        if (id) {
            // Wrap in a callback for `validateCreate` to handle errors correctly
            return (0, qualificationController_1.getQualificationsByID)(req, res);
        }
    }
    if (method === 'GET' && url === '/api/qualificationsAll') {
        return (0, qualificationController_1.getAllQualifications)(req, res);
    }
    if (method === 'POST' && url === '/api/qualifications') {
        return (0, qualificationValidator_1.validateCreate)(req, res, () => (0, qualificationController_1.createQualifications)(req, res));
    }
    if (method === 'PUT' && (url === null || url === void 0 ? void 0 : url.startsWith('/api/qualifications/'))) {
        const id = url.split('/').pop();
        if (id) {
            return (0, qualificationValidator_1.validateCreate)(req, res, () => (0, qualificationController_1.updateQualifications)(req, res));
        }
    }
    if (method === 'DELETE' && (url === null || url === void 0 ? void 0 : url.startsWith('/api/qualifications/'))) {
        const id = url.split('/').pop();
        if (id) {
            return (0, qualificationController_1.deleteQualification)(req, res);
        }
    }
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Not Found' }));
};
exports.handleQualificationsRoute = handleQualificationsRoute;
