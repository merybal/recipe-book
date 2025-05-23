'use strict';
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
            ? (desc = Object.getOwnPropertyDescriptor(target, key))
            : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.CreateIngredientsDto = void 0;
const class_validator_1 = require('class-validator');
const class_transformer_1 = require('class-transformer');
class IngredientItemDto {
  name;
  amount;
  unit;
}
__decorate(
  [(0, class_validator_1.IsString)(), __metadata('design:type', String)],
  IngredientItemDto.prototype,
  'name',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata('design:type', String),
  ],
  IngredientItemDto.prototype,
  'amount',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata('design:type', String),
  ],
  IngredientItemDto.prototype,
  'unit',
  void 0,
);
class IngredientSectionDto {
  sectionTitle;
  sectionBody;
}
__decorate(
  [
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata('design:type', String),
  ],
  IngredientSectionDto.prototype,
  'sectionTitle',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => IngredientItemDto),
    __metadata('design:type', Array),
  ],
  IngredientSectionDto.prototype,
  'sectionBody',
  void 0,
);
class CreateIngredientsDto {
  ingredients;
}
exports.CreateIngredientsDto = CreateIngredientsDto;
__decorate(
  [
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => IngredientSectionDto),
    __metadata('design:type', Array),
  ],
  CreateIngredientsDto.prototype,
  'ingredients',
  void 0,
);
//# sourceMappingURL=create-ingredients.dto.js.map
