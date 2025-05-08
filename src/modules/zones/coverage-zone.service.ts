import { Injectable } from "@nestjs/common";
import { ICoverageZoneDao } from "./db/coverage-zone.dao";
import { CoverageZoneMongodbService } from "./db/coverage-zone-mogondb.service";
import { CoverageZone } from "./entity/coverage-zone.entity";

@Injectable()
export class CoverageZoneService {
    private readonly _coverageZoneDb: ICoverageZoneDao
    constructor(
        private readonly coverageZoneMongodbService: CoverageZoneMongodbService
    ){
        this._coverageZoneDb = coverageZoneMongodbService;
    }

    async create(coverageZone: CoverageZone): Promise<CoverageZone> {
        return await this._coverageZoneDb.create(coverageZone);
    }

    async update(id:string, coverageZone: Partial<CoverageZone>): Promise<CoverageZone> {
        return await this._coverageZoneDb.update(id, coverageZone);
    }

    async findAllByBranch(branchId: string): Promise<CoverageZone[]> {
        return await this._coverageZoneDb.findAllByBranch(branchId);
    }

    async delete(id: string): Promise<void> {
        return await this._coverageZoneDb.delete(id);
    }
}