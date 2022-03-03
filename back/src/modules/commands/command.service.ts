import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicationBaseModelService } from '../../base/base-model.service';
import { CommandDto, GetCommandResponse, GetCommandsResponse } from './command-dto';
import { Command } from './command.entity';

@Injectable()
export class CommandsService extends ApplicationBaseModelService<Command, CommandDto, GetCommandResponse, GetCommandsResponse> {
    constructor(
        @InjectRepository(Command)
        public readonly repository: Repository<Command>,
    ) {
        super();
        this.modelOptions = {
            getManyResponse: GetCommandsResponse,
            getOneResponse: GetCommandResponse,
            getManyResponseField: 'commands',
            getOneResponseField: 'command',
            repository: this.repository,
            entity: Command,
            getManyRelations: ['user', 'products'],
            getOneRelations: ['user', 'products'],
            getManyRelationsLinq: [{ include: x => x.products }],
            getOneRelationsLinq: [{ include: x => x.products }],
        };
    }
}