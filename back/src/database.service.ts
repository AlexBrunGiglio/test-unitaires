import { Injectable } from "@nestjs/common";
import { AppTypes, Gender, PresenceStatut, RolesList } from "../../shared/shared-constant";
import { AppErrorWithMessage } from "./base/app-error";
import { ReferentialService } from "./base/services/referential.service";
import { CharactersService } from './modules/characters/characters.service';
import { UserRoleDto } from "./modules/users-roles/user-role-dto";
import { UserRoleService } from "./modules/users-roles/user-roles.service";
import { UserDto } from "./modules/users/user-dto";
import { UsersService } from "./modules/users/users.service";

@Injectable()
export class DatabaseService {
    constructor(
        private userService: UsersService,
        private userRoleService: UserRoleService,
        private referentialService: ReferentialService,
        private characterService: CharactersService,
    ) {

    }

    public async seedDB() {
        console.log('\x1b[34m', "[Nest] DBService => Seed database");
        await this.createDefaultTypes();
        await this.createDefaultRoles();
        await this.createDefaultUsers();
        await this.getAndSaveCharacters();
    }

    private async createDefaultUsers() {
        await this.createUser({
            firstname: "Admin",
            lastname: "user",
            username: "admin",
            mail: "admin@localhost.com",
            password: "admin",
            disabled: false,
        }, [RolesList.Admin]);
    }

    private async createDefaultRoles() {
        for (const cRole of Object.values(RolesList)) {
            const roleResponse = await this.userRoleService.findOne({ where: { role: cRole } });
            if (!roleResponse.userRole) {
                const newRole = new UserRoleDto();
                newRole.role = cRole;
                newRole.label = newRole.role;
                await this.userRoleService.createOrUpdate(newRole);
            }
        }
    }

    private async createDefaultTypes() {
        const typesWithValues: { typeCode: string, typeLabel: string, values: { label: string; order: number, code?: string }[] }[] =
            [
                {
                    typeCode: AppTypes.Gender,
                    typeLabel: 'Sexe',
                    values: [
                        { label: 'Homme', order: 1, code: Gender.Male },
                        { label: 'Femme', order: 2, code: Gender.Female },
                    ],
                },
                {
                    typeCode: AppTypes.PresenceStatut,
                    typeLabel: 'Status en ligne',
                    values: [
                        { label: 'En ligne', order: 1, code: PresenceStatut.Online },
                        { label: 'Hors ligne', order: 2, code: PresenceStatut.Offline },
                        { label: 'Absent', order: 3, code: PresenceStatut.Missing },
                        { label: 'Occupé', order: 4, code: PresenceStatut.Busy },
                    ],
                },
            ];
        for (const typeWithValues of typesWithValues) {
            await this.referentialService.createOrUpdateTypeWithValues(typeWithValues.typeCode, typeWithValues.typeLabel, typeWithValues.values, true);
        }
    }

    private async createUser(user: UserDto, roles?: string[]) {
        try {
            const getUserResponse = await this.userService.findOne({ where: { username: user.username } });
            if (getUserResponse.success && !getUserResponse.user) {
                const adminUser = new UserDto();
                adminUser.username = user.username;
                adminUser.password = user.password;
                adminUser.mail = user.mail;
                adminUser.firstname = user.firstname;
                adminUser.lastname = user.lastname;
                adminUser.roles = [];

                const getUserRoleResponse = await this.userRoleService.findAll();
                if (!getUserRoleResponse.success)
                    throw new AppErrorWithMessage(getUserRoleResponse.message);
                if (roles) {
                    for (const role of roles) {
                        const roleToPush = getUserRoleResponse.userRoles.find(x => x.role === role)
                        adminUser.roles.push(roleToPush);
                    }
                }

                const createUserResponse = await this.userService.createOrUpdate(adminUser);
                if (createUserResponse.success)
                    console.log('\x1b[34m', `L'utilisateur ${user.username} a été créé !`);
            }
        }
        catch (err) {
            console.error(err);
        }
    }
    private async getAndSaveCharacters() {
        try {
            const findAllResponse = await this.characterService.findAll();
            if (findAllResponse.success && findAllResponse.characters.length > 0)
                return;
            const getCharacters = await this.characterService.getCharactersFromAPI();
            if (!getCharacters.success)
                return;
            let charactersSaved = 0;
            let charactersNotSaved = 0;
            console.log('\x1b[34m', `${getCharacters.characters.length} characters ont été récupérés.`);
            for (const character of getCharacters.characters) {
                const save = await this.characterService.createOrUpdate(character);
                console.log("🚀 ~ DatabaseService ~ getAndSaveCharacters ~ save", save);
                if (save.success)
                    charactersSaved = charactersSaved + 1;
                if (!save.success)
                    charactersNotSaved = charactersNotSaved + 1;
            }
            console.log('\x1b[34m', `${charactersSaved} characters ont été créés.`);
            console.log('\x1b[34m', `${charactersNotSaved} characters ont échoués.`);
        } catch (error) {
            console.log(error);
        }
    }
}