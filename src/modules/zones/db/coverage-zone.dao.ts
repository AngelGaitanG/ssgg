import { CoverageZone } from "../entity/coverage-zone.entity";

export interface ICoverageZoneDao {
    create(coverageZone: CoverageZone): Promise<CoverageZone>;
    update(id: string, coverageZone: Partial<CoverageZone>): Promise<CoverageZone>;
    findAllByBranch(branchId: string): Promise<CoverageZone[]>;
    delete(id: string): Promise<void>;
}