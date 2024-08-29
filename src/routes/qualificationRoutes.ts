// src/routes/qualificationRoutes.ts
import express from 'express';
import { getQualificationsByID, createQualifications, updateQualifications, deleteQualification, getQualificationsIDs, getAllQualifications } from '../controllers/qualificationController';
import { validateCreate } from '../validators/qualificationValidator';

const router = express.Router();

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
router.get('/qualificationsIDs', getQualificationsIDs);

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
router.get('/qualifications/:id', getQualificationsByID);

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
router.get('/qualificationsAll', getAllQualifications);

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
router.post('/qualifications', validateCreate, createQualifications);

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
router.put('/qualifications/:id', validateCreate, updateQualifications);

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
router.delete('/qualifications/:id', deleteQualification);

export default router;
