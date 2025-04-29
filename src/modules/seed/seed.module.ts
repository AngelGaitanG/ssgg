import { Module } from '@nestjs/common';
import { RoleModule } from '../auth/role/role.module';
import { SeedService } from './seed.service';
import { RoleSeedService } from '../auth/role/services/role-seed.service';

@Module({
  imports: [RoleModule],
  providers: [SeedService, RoleSeedService],
  exports: [SeedService],
})
export class SeedModule {} 