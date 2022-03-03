import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CharacterDto } from './character-dto';

@Entity({ name: 'characters' })
export class Character {
    @PrimaryGeneratedColumn('uuid', { name: 'uid' })
    uid: string;
    @CreateDateColumn({ name: 'creationDate', nullable: false, type: 'datetime' })
    creationDate: Date;
    @Column('varchar', { name: 'id', length: 30, nullable: true, unique: true })
    id: string;
    @Column('varchar', { name: 'name', length: 100, nullable: true, })
    name: string;
    @Column('varchar', { name: 'status', length: 100, nullable: true, })
    status: string;
    @Column('varchar', { name: 'species', length: 100, nullable: true, })
    species: string;
    @Column('varchar', { name: 'type', length: 100, nullable: true, })
    type: string;
    @Column('varchar', { name: 'gender', length: 100, nullable: true, })
    gender: string;
    @Column('varchar', { name: 'image', length: 100, nullable: true, })
    image: string;
    @Column('varchar', { name: 'url', length: 100, nullable: true, })
    url: string;
    @Column({ name: 'created', nullable: true, type: 'datetime' })
    created: Date;

    public toDto(): CharacterDto {
        return {
            uid: this.uid,
            id: this.id,
            name: this.name,
            status: this.status,
            species: this.species,
            type: this.type,
            gender: this.gender,
            image: this.image,
            url: this.url,
            created: this.created,
        }
    }
    public fromDto(dto: CharacterDto) {
        this.uid = dto.uid;
        this.id = dto.id;
        this.name = dto.name;
        this.status = dto.status;
        this.species = dto.species;
        this.type = dto.type;
        this.gender = dto.gender;
        this.image = dto.image;
        this.url = dto.url;
        this.created = dto.created;

        if (!this.uid)
            this.uid = undefined;
    }
}