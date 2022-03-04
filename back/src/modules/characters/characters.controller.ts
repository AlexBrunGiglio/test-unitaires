import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseController } from '../../base/base.controller';
import { GetCharactersResponse } from './character-dto';
import { CharactersService } from './characters.service';

@ApiTags('characters')
@Controller('characters')
export class CharactersController extends BaseController {
    constructor(
        private readonly characterService: CharactersService,

    ) {
        super();
    }

    @Get('getAll/')
    @ApiOperation({ summary: 'Get all characters', operationId: 'getAllCharacters' })
    @ApiResponse({ status: 200, description: 'Get all characters', type: GetCharactersResponse })
    @HttpCode(200)
    async getAll(): Promise<GetCharactersResponse> {
        return await this.characterService.findAll();
    }

    @Get('getFromAPI/')
    @ApiOperation({ summary: 'Get all characters from API', operationId: 'getAllCharactersFromAPI' })
    @ApiResponse({ status: 200, description: 'Get all characters from API', type: GetCharactersResponse })
    @HttpCode(200)
    async getAllFromAPI(): Promise<GetCharactersResponse> {
        return await this.characterService.getCharactersFromAPI();
    }
}