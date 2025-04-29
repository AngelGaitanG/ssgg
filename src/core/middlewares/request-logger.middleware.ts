/**
 * MIDDLEWARE: Request Logger
 * This middleware logs all incoming HTTP requests with their details:
 * - HTTP Method
 * - Request URL
 * - Timestamp
 * - Request Duration
 * - Status Code
 * - Client IP
 */

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // 1. Get the start time of the request
    const startTime = Date.now();

    // 2. Get client IP address
    const clientIp = req.ip || req.connection.remoteAddress;

    // 3. Log the incoming request
    console.log(`
    🟢🟢 INCOMING REQUEST
    ⏰ Time: ${new Date().toISOString()}
    🔍 Method: ${req.method}
    🌐 URL: ${req.originalUrl}
    📍 IP: ${clientIp}
    `);

    // 4. Capture the response finish event
    res.on('finish', () => {
      // 5. Calculate request duration
      const duration = Date.now() - startTime;

      // 6. Log the response
      console.log(`
      🔴🔴 RESPONSE
      ⏰ Time: ${new Date().toISOString()}
      🔍 Method: ${req.method}
      🌐 URL: ${req.originalUrl}
      📍 IP: ${clientIp}
      ⚡ Duration: ${duration}ms
      📊 Status: ${res.statusCode}
      `);
    });

    // 7. Continue with the request
    next();
  }
} 