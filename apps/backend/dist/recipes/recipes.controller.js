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
exports.RecipesController = void 0;
const common_1 = require("@nestjs/common");
const recipes_service_1 = require("./recipes.service");
const client_1 = require("../../generated/prisma/client");
const create_recipe_dto_1 = require("./dto/create-recipe.dto");
let RecipesController = class RecipesController {
    recipesService;
    constructor(recipesService) {
        this.recipesService = recipesService;
    }
    async createRecipe(data) {
        return this.recipesService.createRecipe(data);
    }
    async getAllRecipes() {
        return this.recipesService.getAllRecipes();
    }
    async getRecipeById(id) {
        return this.recipesService.getRecipeById(id);
    }
    async updateRecipe(id, data) {
        return this.recipesService.updateRecipe(id, data);
    }
    async deleteRecipe(id) {
        return this.recipesService.deleteRecipe(id);
    }
};
exports.RecipesController = RecipesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_recipe_dto_1.CreateRecipeDto]),
    __metadata("design:returntype", Promise)
], RecipesController.prototype, "createRecipe", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RecipesController.prototype, "getAllRecipes", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RecipesController.prototype, "getRecipeById", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], RecipesController.prototype, "updateRecipe", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RecipesController.prototype, "deleteRecipe", null);
exports.RecipesController = RecipesController = __decorate([
    (0, common_1.Controller)('recipes'),
    __metadata("design:paramtypes", [recipes_service_1.RecipesService])
], RecipesController);
//# sourceMappingURL=recipes.controller.js.map