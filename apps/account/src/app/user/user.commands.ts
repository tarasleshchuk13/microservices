import { Body, Controller } from '@nestjs/common'
import { AccountChangeProfile } from '@purple/contracts'
import { RMQRoute, RMQValidate } from 'nestjs-rmq'
import { UserEntity } from './entities/user.entity'
import { UserRepository } from './repositories/user.repository'

@Controller()
export class UserCommands {

    constructor(private readonly userRepository: UserRepository) {
    }

    @RMQValidate()
    @RMQRoute(AccountChangeProfile.topic)
    async userInfo(@Body() dto: AccountChangeProfile.Request): Promise<AccountChangeProfile.Response> {
        const existedUser = await this.userRepository.findUserById(dto.id)

        if (!existedUser) {
            throw new Error('User not found')
        }

        const userEntity = new UserEntity(existedUser).updateProfile(dto.user.displayName)
        await this.userRepository.updateUser(userEntity)
        return {}
    }

}
