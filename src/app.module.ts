/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstudianteModule } from './estudiante/estudiante.module';
import { ActividadModule } from './actividad/actividad.module';
import { ReseñaModule } from './reseña/reseña.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteEntity } from './estudiante/estudiante.entiy';
import { ActividadEntity } from './actividad/actividad.entity';
import { ReseñaEntity } from './reseña/reseña.entity';

@Module({
  imports: [EstudianteModule, ActividadModule, ReseñaModule,
    TypeOrmModule.forRoot({
     type: 'postgres',
     host: 'localhost',
     port: 5432,
     username: 'postgres',
     password: 'Sokk@2654837',
     database: 'actividades',
     entities: [EstudianteEntity,ActividadEntity,ReseñaEntity],
     dropSchema: true,
     synchronize: true,
   }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
