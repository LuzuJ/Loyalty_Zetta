"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteQualification = exports.updateQualifications = exports.createQualifications = exports.getAllQualifications = exports.getQualificationsByID = exports.getQualificationsIDs = void 0;
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
const getQualificationsIDs = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prismaClient_1.default.qualification.findMany({
            select: { id: true },
        });
    }
    catch (error) {
        console.error('Error al obtener las IDs de qualifications:', error);
        throw new Error('No se pudieron obtener las IDs de qualifications');
    }
});
exports.getQualificationsIDs = getQualificationsIDs;
const getQualificationsByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const qualification = yield prismaClient_1.default.qualification.findUnique({
            where: { id },
            include: {
                qualityCalification: true,
                timeCalification: true,
                packagingCalification: true,
                communicationCalification: true,
            },
        });
        if (!qualification) {
            return null;
        }
        return qualification;
    }
    catch (error) {
        console.error('Error al obtener las calificaciones por ID:', error);
        throw new Error('No se pudieron obtener las calificaciones por ID');
    }
});
exports.getQualificationsByID = getQualificationsByID;
const getAllQualifications = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaClient_1.default.qualification.findMany({
        include: {
            qualityCalification: true,
            timeCalification: true,
            packagingCalification: true,
            communicationCalification: true,
        },
    });
});
exports.getAllQualifications = getAllQualifications;
const createQualifications = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const qualification = yield prismaClient_1.default.qualification.create({
        data: Object.assign(Object.assign({}, data), { qualityCalification: {
                create: data.qualityCalification
            }, timeCalification: {
                create: data.timeCalification
            }, packagingCalification: {
                create: data.packagingCalification
            }, communicationCalification: {
                create: data.communicationCalification
            } }),
        include: {
            qualityCalification: true,
            timeCalification: true,
            packagingCalification: true,
            communicationCalification: true,
        },
    });
    return qualification;
});
exports.createQualifications = createQualifications;
const updateQualifications = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const qualification = yield (0, exports.getQualificationsByID)(id);
    if (!qualification) {
        return null;
    }
    const updatedQualification = yield prismaClient_1.default.qualification.update({
        where: { id },
        data: Object.assign(Object.assign({}, data), { qualityCalification: {
                update: data.qualityCalification ? {
                    where: { id: data.qualityCalification.id },
                    data: data.qualityCalification
                } : undefined
            }, timeCalification: {
                update: data.timeCalification ? {
                    where: { id: data.timeCalification.id },
                    data: data.timeCalification
                } : undefined
            }, packagingCalification: {
                update: data.packagingCalification ? {
                    where: { id: data.packagingCalification.id },
                    data: data.packagingCalification
                } : undefined
            }, communicationCalification: {
                update: data.communicationCalification ? {
                    where: { id: data.communicationCalification.id },
                    data: data.communicationCalification
                } : undefined
            } }),
        include: {
            qualityCalification: true,
            timeCalification: true,
            packagingCalification: true,
            communicationCalification: true,
        },
    });
    return updatedQualification;
});
exports.updateQualifications = updateQualifications;
const deleteQualification = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const qualification = yield (0, exports.getQualificationsByID)(id);
    if (!qualification) {
        return null;
    }
    return yield prismaClient_1.default.qualification.delete({
        where: { id },
        include: {
            qualityCalification: true,
            timeCalification: true,
            packagingCalification: true,
            communicationCalification: true,
        },
    });
});
exports.deleteQualification = deleteQualification;
