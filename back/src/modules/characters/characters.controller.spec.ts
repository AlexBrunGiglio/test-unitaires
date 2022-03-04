import { HttpService } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { CharacterDto } from './character-dto';
import { Character } from './character.entity';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';

describe('CharactersController', () => {
    let charactersController: CharactersController;
    let charactersService: CharactersService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [CharactersController],
            providers: [CharactersService],
        }).compile();

        charactersService = moduleRef.get<CharactersService>(CharactersService);
        charactersController = moduleRef.get<CharactersController>(CharactersController);
    });

    describe('Find all characters', async () => {
        it('should return all characters', () => {
            const getAllCharachters = charactersController.getAll();
            expect(getAllCharachters).rejects.toBeInstanceOf([CharacterDto]);
        }
        )
    });
});