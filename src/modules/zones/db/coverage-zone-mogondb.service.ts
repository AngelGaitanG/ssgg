import { Injectable, NotFoundException } from "@nestjs/common";
import { ICoverageZoneDao } from "./coverage-zone.dao";
import { InjectModel } from "@nestjs/mongoose";
import { CoverageZone } from "../entity/coverage-zone.entity";
import { Model } from "mongoose";
import { Branch } from "src/modules/businesses/branch/entity/branch.entity";

@Injectable()
export class CoverageZoneMongodbService implements ICoverageZoneDao {
    constructor(
        @InjectModel(CoverageZone.name) private coverageZoneModel: Model<CoverageZone>,
        @InjectModel(Branch.name) private branchModel: Model<Branch>
    ){}

    async create(coverageZone: CoverageZone): Promise<CoverageZone> {
        const branch = await this.branchModel.findById(coverageZone.branchId);
        if(!branch) {
            throw new NotFoundException('Sucursal no encontrada');
        }
        return this.coverageZoneModel.create({...coverageZone, branch});
    }

    async update(id: string, coverageZone: Partial<CoverageZone>): Promise<CoverageZone> {
        return this.coverageZoneModel.findByIdAndUpdate(id, coverageZone);
    }

    async findAllByBranch(branchId: string): Promise<CoverageZone[]> {
        const branch = this.branchModel.findById(branchId);

        if(!branch) throw new NotFoundException('Sucursal no encontrada');

        return this.coverageZoneModel.find({ branchId })
    }

    async delete(id: string): Promise<void> {
        return this.coverageZoneModel.findByIdAndDelete(id);
    }
}