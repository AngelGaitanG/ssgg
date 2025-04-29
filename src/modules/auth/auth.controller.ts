import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpDto } from "./dto/sign-up.dto";
import { SignInDto } from "./dto/sign-in.dto";
import { Public } from "../../core/decorators/public.decorator";
import { ApiResponse } from "../../core/responses/api-response";
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('signup')
    async signUp(@Body() signUpDto: SignUpDto): Promise<ApiResponse> {
        try {
            const user = await this.authService.signUp(signUpDto);
            return ApiResponse.success('User created successfully', user);
        } catch (error) {
            return ApiResponse.error(error.message);
        }
    }

    @Public()
    @Post('signin')
    async signIn(@Body() signInDto: SignInDto): Promise<ApiResponse> {
        try {
            const user = await this.authService.signIn(signInDto);
            return ApiResponse.success('User signed in successfully', user);
        } catch (error) {
            return ApiResponse.error(error.message);
        }
    }
}

