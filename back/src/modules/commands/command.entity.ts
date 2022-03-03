import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Character } from '../characters/character.entity';
import { User } from '../users/user.entity';
import { CommandDto } from './command-dto';

@Entity({ name: 'commands' })
export class Command {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;
    @CreateDateColumn({ name: 'creationDate', nullable: false, type: 'datetime' })
    creationDate: Date;
    @ManyToOne(() => User, user => user.commands, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user?: User;
    @Column('varchar', { name: 'userId', length: 50, nullable: true })
    userId?: string;
    @ManyToMany(() => Character, { cascade: true, onUpdate: 'CASCADE' })
    @JoinTable({ name: 'command_products' })
    products: Character[];

    public toDto(): CommandDto {
        return {
            id: this.id,
            userId: this.userId,
            createdDate: this.creationDate,
            products: this.products ? this.products.map(x => x.toDto()) : undefined,
            user: this.user ? this.user.toDto() : null,
        }
    }

    public fromDto(dto: CommandDto) {
        this.id = dto.id;
        this.userId = dto.userId;

        if (dto.products) {
            this.products = [];
            for (const productDto of dto.products) {
                const characterEntity = new Character();
                characterEntity.fromDto(productDto);
                this.products.push(characterEntity);
            }
        }

        if (!this.id)
            this.id = undefined;
    }
}