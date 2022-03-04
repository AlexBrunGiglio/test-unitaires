import { Body, Controller, Delete, Get, HttpCode, Param, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppErrorWithMessage } from '../../base/app-error';
import { BaseController } from '../../base/base.controller';
import { GenericResponse } from '../../base/generic-response';
import { CommandDto, GetCommandResponse, GetCommandsResponse } from './command-dto';
import { CommandsService } from './command.service';

@ApiTags('commands')
@Controller('commands')
export class CommandsController extends BaseController {
    constructor(
        private readonly commandService: CommandsService,
    ) {
        super();
    }

    @Get()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all commands', operationId: 'getAllCommands' })
    @ApiResponse({ status: 200, description: 'Get all commands', type: GetCommandsResponse })
    @HttpCode(200)
    async getAll(): Promise<GetCommandsResponse> {
        return await this.commandService.findAll();
    }

    @Get(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get command', operationId: 'getCommand' })
    @ApiResponse({ status: 200, description: 'Get command', type: GetCommandResponse })
    @HttpCode(200)
    async get(@Param('id') id: string): Promise<GetCommandResponse> {
        return await this.commandService.findOne({ where: { userId: id } });
    }

    @Post()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create or update command', operationId: 'createOrUpdateCommand' })
    @ApiResponse({ status: 200, description: 'Create or update command', type: GetCommandResponse })
    @HttpCode(200)
    async createOrUpdate(@Body() command: CommandDto): Promise<GetCommandResponse> {
        if (!command)
            throw new AppErrorWithMessage('Invalid Request');
        return await this.commandService.createOrUpdate(command);
    }

    @Delete()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete command', operationId: 'deleteCommand' })
    @ApiResponse({ status: 200, description: 'Delete commands from ID', type: GenericResponse })
    @HttpCode(200)
    async deleteUsers(@Query('commandsId') commandId: string): Promise<GenericResponse> {
        return await this.commandService.deleteOne(commandId);
    }
}