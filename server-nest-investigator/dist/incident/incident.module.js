"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncidentModule = void 0;
const common_1 = require("@nestjs/common");
const incident_controller_1 = require("./incident.controller");
const incident_service_1 = require("./incident.service");
const typeorm_1 = require("@nestjs/typeorm");
const incident_model_1 = require("./entity/incident.model");
const organ_module_1 = require("../organ/organ.module");
let IncidentModule = class IncidentModule {
};
exports.IncidentModule = IncidentModule;
exports.IncidentModule = IncidentModule = __decorate([
    (0, common_1.Module)({
        controllers: [incident_controller_1.IncidentController],
        providers: [incident_service_1.IncidentService],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([incident_model_1.Incident]),
            organ_module_1.OrganModule,
        ],
        exports: [
            incident_service_1.IncidentService
        ]
    })
], IncidentModule);
//# sourceMappingURL=incident.module.js.map