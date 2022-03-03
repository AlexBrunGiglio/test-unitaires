import { HttpModule, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RolesGuard } from "../auth/guards/roles.guard";
import { AuthToolsService } from "../auth/services/tools.service";
import { ReferentialController } from "../base/controllers/referential.controller";
import { ReferentialService } from "../base/services/referential.service";
import { JwtSecretKey } from "../environment/constant";
import { AppType } from "../modules/app-values/app-type.entity";
import { AppValue } from "../modules/app-values/app-value.entity";
import { Character } from '../modules/characters/character.entity';
import { CharactersController } from '../modules/characters/characters.controller';
import { CharactersService } from '../modules/characters/characters.service';
import { UserRole } from "../modules/users-roles/user-role.entity";
import { UsersRolesController } from "../modules/users-roles/user-roles.controller";
import { UserRoleService } from "../modules/users-roles/user-roles.service";
import { User } from "../modules/users/user.entity";
import { UsersController } from "../modules/users/users.controller";
import { UsersService } from "../modules/users/users.service";

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: JwtSecretKey,
            signOptions: {
                expiresIn: '3650d',
            },
        }),
        TypeOrmModule.forFeature([
            AppValue,
            AppType,
            User,
            UserRole,
            Character
        ]),
        HttpModule,
    ],
    controllers: [
        ReferentialController,
        UsersController,
        UsersRolesController,
        CharactersController
    ],
    providers: [
        ReferentialService,
        RolesGuard,
        UsersService,
        AuthToolsService,
        UserRoleService,
        CharactersService
    ],
    exports: [
        JwtModule,
        ReferentialService,
        RolesGuard,
        UsersService,
        AuthToolsService,
        UserRoleService,
        CharactersService,
    ],
})
export class AppCommonModule {

}