/**
 * MODULE: Application Root
 * This is the root module of the application that imports and configures:
 * - Configuration Module: For environment variables and app settings
 * - Database Module: For MongoDB connection
 * - Middlewares Module: For global request handling
 * - Feature Modules: For business logic (e.g., UsersModule)
 */

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './core/config/configuration';
import { DatabaseModule } from './core/database/database.module';
import { MiddlewaresModule } from './core/middlewares/middlewares.module';
import { SeedModule } from './modules/seed/seed.module';
import { AuthModule } from './modules/auth/auth.module';
import { BusinessesModule } from './modules/businesses/businesses.module';
import { AccessModule } from './modules/access/access.module';
import { MenuModule } from './modules/menu/menu.module';
import { CoverageZoneModule } from './modules/zones/coverage-zone.module';

@Module({
  imports: [
    // 1. Load application configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    // 2. Configure database connection
    DatabaseModule,
    // 3. Configure global middlewares
    MiddlewaresModule,
    // 4. Configure modules
    AuthModule,
    SeedModule,
    AccessModule,
    BusinessesModule,
    MenuModule,
    CoverageZoneModule
  ],
})
export class AppModule {}
