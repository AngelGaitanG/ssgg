import { Controller, Post, Body, Param, Get } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./entity/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { ApiResponse } from "src/core/responses/api-response";

@Controller('users')
export class UserController {   
    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<ApiResponse> {
        try {
            const user = await this.userService.createUser(createUserDto);
            return ApiResponse.success('User created', user);
        } catch (error) {
            return ApiResponse.error(error);
        }
    }

    @Get(':email')
    async findByEmail(@Param('email') email: string): Promise<ApiResponse> {
        try {
            const user = await this.userService.findByEmail(email);
            return ApiResponse.success('User found', user);
        } catch (error) {
            return ApiResponse.error(error);
        }
    }
}

