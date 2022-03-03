import { Module } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandsController } from './command.controller';
import { Command } from './command.entity';
import { CommandsService } from './command.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Command,
        ]),
        TestingModule
    ],
    controllers: [
        CommandsController,
    ],
    providers: [
        CommandsService
    ],
    exports: [
        CommandsService
    ]
})
export class CommandModule { }