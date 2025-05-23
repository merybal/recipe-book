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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let RecipesService = class RecipesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createRecipe(data) {
        return this.prisma.recipes.create({
            data: {
                title: data.title,
                cooking_time: data.cooking_time,
                cooking_temperature: data.cooking_temperature,
                servings: data.servings,
                mold_type: data.mold_type,
                mold_size: data.mold_size,
            },
        });
    }
    async getAllRecipes() {
        return this.prisma.recipes.findMany({
            orderBy: { created_at: 'desc' },
            include: {
                ingredients: true,
                instructions: true,
            },
        });
    }
    async getRecipeById(id) {
        return this.prisma.recipes.findUnique({
            where: { id },
        });
    }
    async updateRecipe(id, data) {
        return this.prisma.recipes.update({
            where: { id },
            data,
        });
    }
    async deleteRecipe(id) {
        return this.prisma.recipes.delete({
            where: { id },
        });
    }
};
exports.RecipesService = RecipesService;
exports.RecipesService = RecipesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RecipesService);
//# sourceMappingURL=recipes.service.js.map