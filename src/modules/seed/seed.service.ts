import { Injectable, Logger } from '@nestjs/common';
import { RoleSeedService } from '../auth/role/services/role-seed.service';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(private readonly roleSeedService: RoleSeedService) {}

  /**
   * Ejecuta el proceso de sembrado de datos inicial
   */
  async seed(): Promise<void> {
    this.logger.log('Iniciando proceso de sembrado de datos...');

    try {
      // Sembrar roles
      await this.roleSeedService.seed();

      this.logger.log('Proceso de sembrado completado exitosamente');
    } catch (error) {
      this.logger.error('Error durante el proceso de sembrado:', error);
      throw error;
    }
  }
} 