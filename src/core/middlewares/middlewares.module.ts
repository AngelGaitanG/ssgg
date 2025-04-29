/**
 * MODULE: Global Middlewares
 * This module configures and applies global middlewares for the application.
 * Currently includes:
 * - Request Logger: Logs all incoming HTTP requests and responses
 */

import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { RequestLoggerMiddleware } from './request-logger.middleware';

@Module({})
export class MiddlewaresModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 1. Apply RequestLoggerMiddleware to all routes
    consumer
      .apply(RequestLoggerMiddleware)
      .forRoutes('*'); // Apply to all routes
  }
} 