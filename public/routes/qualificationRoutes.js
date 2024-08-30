"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/qualificationRoutes.ts
const express_1 = __importDefault(require("express"));
const qualificationController_1 = require("../controllers/qualificationController");
const qualificationValidator_1 = require("../validators/qualificationValidator");
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   name: Qualifications
 *   description: Operaciones relacionadas con calificaciones
 */
/**
 * @swagger
 * /api/qualificationsIDs:
 *   get:
 *     summary: Obtiene todos los IDs de calificaciones
 *     tags: [Qualifications]
 *     responses:
 *       200:
 *         description: Lista de IDs de calificaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
router.get('/qualificationsIDs', qualificationController_1.getQualificationsIDs);
/**
 * @swagger
 * /api/qualifications/{id}:
 *   get:
 *     summary: Obtiene una calificación por ID
 *     tags: [Qualifications]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la calificación
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Información de la calificación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 score:
 *                   type: integer
 */
router.get('/qualifications/:id', qualificationController_1.getQualificationsByID);
/**
 * @swagger
 * /api/qualificationsAll:
 *   get:
 *     summary: Obtiene todas las calificaciones
 *     tags: [Qualifications]
 *     responses:
 *       200:
 *         description: Lista de calificaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/qualificationsAll', qualificationController_1.getAllQualifications);
/**
 * @swagger
 * /api/qualifications:
 *   post:
 *     summary: Crea una nueva calificación
 *     tags: [Qualifications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               score:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Calificación creada
 */
router.post('/qualifications', qualificationValidator_1.validateCreate, qualificationController_1.createQualifications);
/**
 * @swagger
 * /api/qualifications/{id}:
 *   put:
 *     summary: Actualiza una calificación existente
 *     tags: [Qualifications]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la calificación
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               score:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Calificación actualizada
 */
router.put('/qualifications/:id', qualificationValidator_1.validateCreate, qualificationController_1.updateQualifications);
/**
 * @swagger
 * /api/qualifications/{id}:
 *   delete:
 *     summary: Elimina una calificación por ID
 *     tags: [Qualifications]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la calificación
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Calificación eliminada
 */
router.delete('/qualifications/:id', qualificationController_1.deleteQualification);
exports.default = router;
