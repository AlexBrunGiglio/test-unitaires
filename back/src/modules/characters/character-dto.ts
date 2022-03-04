import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseSearchRequest } from '../../base/base-search-request';
import { GenericResponse } from '../../base/generic-response';
import { BaseSearchResponse } from '../../base/search-response';

export class CharacterDto {
    @ApiProperty()
    uid?: string;
    @ApiPropertyOptional()
    id?: string;
    @ApiPropertyOptional()
    name?: string;
    @ApiPropertyOptional()
    status?: string;
    @ApiPropertyOptional()
    species?: string;
    @ApiPropertyOptional()
    type?: string;
    @ApiPropertyOptional()
    gender?: string;
    @ApiPropertyOptional()
    price?: number;
    @ApiPropertyOptional()
    image?: string;
    @ApiPropertyOptional()
    url?: string;
    @ApiPropertyOptional({ type: String, format: 'date-time' })
    created?: Date;
}

export class GetCharacterResponse extends GenericResponse {
    @ApiProperty({ type: () => CharacterDto })
    character: CharacterDto;
}

export class GetCharactersResponse extends BaseSearchResponse {
    @ApiProperty({ type: () => CharacterDto, isArray: true })
    characters: CharacterDto[] = [];
}

export class GetUsersRequest extends BaseSearchRequest {

}