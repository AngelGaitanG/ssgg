/**
 * MODULE: Database Configuration
 * This module handles the MongoDB database connection setup and configuration.
 * It uses environment variables for connection parameters and provides
 * a centralized way to manage database connections across the application.
 */

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // 1. Configure MongoDB connection asynchronously
    MongooseModule.forRootAsync({
      // 2. Use factory pattern to create connection options
      useFactory: (configService: ConfigService) => ({
        // 3. Get connection URI from environment variables
        uri: configService.get<string>('database.uri'),
        // 4. Get database name from environment variables
        dbName: configService.get<string>('database.name'),
      }),
      // 5. Inject ConfigService to access environment variables
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {} 