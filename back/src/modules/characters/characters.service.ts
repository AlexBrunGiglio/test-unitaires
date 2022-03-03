import { HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicationBaseModelService } from '../../base/base-model.service';
import { CharacterDto, GetCharacterResponse, GetCharactersResponse } from './character-dto';
import { Character } from './character.entity';

@Injectable()
export class CharactersService extends ApplicationBaseModelService<Character, CharacterDto, GetCharacterResponse, GetCharactersResponse> {
    constructor(
        @InjectRepository(Character)
        public readonly repository: Repository<Character>,
        private httpService: HttpService,
    ) {
        super();
        this.modelOptions = {
            getManyResponse: GetCharactersResponse,
            getOneResponse: GetCharacterResponse,
            getManyResponseField: 'characters',
            getOneResponseField: 'character',
            repository: this.repository,
            entity: Character,
        };
    }

    async getCharactersFromAPI(): Promise<GetCharactersResponse> {
        const response = new GetCharactersResponse();
        try {
            response.characters = [];
            for (let i = 0; i < 20; i++) {
                const responseApi = await this.httpService.get('https://rickandmortyapi.com/api/character/',
                    {
                        params: {
                            "page": i
                        }
                    }
                ).toPromise();
                response.characters.push(...responseApi.data.results);
            }
            response.success = true;
        } catch (error) {
            response.handleError(error);
        }
        return response;
    }
}
