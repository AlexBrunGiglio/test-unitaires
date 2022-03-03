import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GenericResponse } from '../../base/generic-response';
import { BaseSearchResponse } from '../../base/search-response';
import { CharacterDto } from '../characters/character-dto';
import { UserDto } from '../users/user-dto';

export class CommandDto {
    @ApiProperty()
    id: string;
    @ApiPropertyOptional()
    userId: string;
    @ApiPropertyOptional({ type: () => UserDto })
    user?: UserDto;
    @ApiPropertyOptional({ type: () => CharacterDto, isArray: true })
    products?: CharacterDto[];
    @ApiPropertyOptional({ type: String, format: 'date-time' })
    createdDate?: Date;
}

export class GetCommandResponse extends GenericResponse {
    @ApiProperty({ type: () => CommandDto })
    command: CommandDto;
}

export class GetCommandsResponse extends BaseSearchResponse {
    @ApiProperty({ type: () => CommandDto, isArray: true })
    commands: CommandDto[] = [];
}