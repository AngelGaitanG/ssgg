import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { UserActionRequestType } from "./entity/user-actions-request.entity";
import { UserActionRequestMongodbService } from "./db/user-action-request-mongodb.service";
import { UpdateUserActionRequestStatusDto } from "./dto/update-user-action-request-status.dto";
import { UserRegistrationUARService } from "./micro-services/user-registration-uar.service";

@Injectable()
export class UserActionRequestService {
    private readonly _userActionRequestDb;

    constructor(
        private readonly userActionRequestMongodbService: UserActionRequestMongodbService,
        private readonly userRegistrationUARService: UserRegistrationUARService
    ){
        this._userActionRequestDb = userActionRequestMongodbService;
    }


    async updateStatus(id: string, dto: UpdateUserActionRequestStatusDto) {
        const request = await this._userActionRequestDb.findById(id);
      
        if (!request) throw new NotFoundException('Solicitud no encontrada');
      
        switch (request.type) {
          case UserActionRequestType.REGISTER:
            return this.userRegistrationUARService.handleStatusUpdate(request, dto);
      
          // más casos en el futuro
          default:
            throw new BadRequestException('El tipo de solicitud no existe');
        }
      }
      

}