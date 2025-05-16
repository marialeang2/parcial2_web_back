/* eslint-disable prettier/prettier */
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ReseñaService } from './reseña.service';
import { ReseñaEntity } from './reseña.entity';

@Module({
    providers:[ReseñaService],
    imports: [TypeOrmModule.forFeature([ReseñaEntity])],
})
export class ReseñaModule {}
