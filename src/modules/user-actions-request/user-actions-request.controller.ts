import { Controller } from "@nestjs/common";
import { UserActionRequestService } from "./user-actions-request.service";

@Controller()
export class UserActionRequestController {

    constructor(
        private readonly userAcionRequestService: UserActionRequestService,
    ){}
}