import { Controller, Get, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../guards/jwt.guard'
import { UserId } from '../guards/user.decorator'

@Controller('user')
export class UserController {

    @UseGuards(JwtAuthGuard)
    @Get('info')
    async info(@UserId() userId: string) {
        return { userId }
    }

}
