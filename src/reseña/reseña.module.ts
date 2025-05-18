/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReseñaService } from './reseña.service';
import { ReseñaEntity } from './reseña.entity';
import { ActividadEntity } from 'src/actividad/actividad.entity';
import { ReseñaController } from './reseña.controller';

@Module({
    providers:[ReseñaService],
    imports: [TypeOrmModule.forFeature([ReseñaEntity, ActividadEntity])],
    controllers: [ReseñaController],
})
export class ReseñaModule {}
