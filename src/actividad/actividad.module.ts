/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActividadService } from './actividad.service';
import { ActividadEntity } from './actividad.entity';
import { ActividadController } from './actividad.controller';

@Module({
    imports:[TypeOrmModule.forFeature([ActividadEntity])],
  providers: [ActividadService],
  controllers: [ActividadController]
})
export class ActividadModule {}
