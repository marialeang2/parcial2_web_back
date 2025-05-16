/* eslint-disable prettier/prettier */
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteEntity } from './estudiante.entiy';
import { ActividadEntity } from 'src/actividad/actividad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EstudianteEntity, ActividadEntity])],
  providers: [EstudianteService],
})
export class EstudianteModule {}
