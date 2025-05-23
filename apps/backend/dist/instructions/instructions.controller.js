"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructionsController = void 0;
const common_1 = require("@nestjs/common");
const instructions_service_1 = require("./instructions.service");
const create_instructions_dto_1 = require("../instructions/dto/create-instructions.dto");
let InstructionsController = class InstructionsController {
    instructionsService;
    constructor(instructionsService) {
        this.instructionsService = instructionsService;
    }
    async addInstructions(recipeId, data) {
        return this.instructionsService.addInstructions(+recipeId, data);
    }
};
exports.InstructionsController = InstructionsController;
__decorate([
    (0, common_1.Post)(':id/instructions'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_instructions_dto_1.CreateInstructionsDto]),
    __metadata("design:returntype", Promise)
], InstructionsController.prototype, "addInstructions", null);
exports.InstructionsController = InstructionsController = __decorate([
    (0, common_1.Controller)('recipes/:recipeId/instructions'),
    __metadata("design:paramtypes", [instructions_service_1.InstructionsService])
], InstructionsController);
//# sourceMappingURL=instructions.controller.js.map