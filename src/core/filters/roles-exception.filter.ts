import { ExceptionFilter, Catch, ArgumentsHost, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from '../responses/api-response';

@Catch(UnauthorizedException)
export class RolesExceptionFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response
      .status(403)
      .json(ApiResponse.accessDenied('No tienes permisos para acceder a este recurso'));
  }
} 