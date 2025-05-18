/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, Param, Patch, ParseIntPipe, UseInterceptors } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteDto } from './estudiante.dto';
import { EstudianteEntity } from './estudiante.entiy';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';

@Controller('estudiantes')
@UseInterceptors(BusinessErrorsInterceptor)
export class EstudianteController {
    constructor(private readonly estudianteService: EstudianteService  ){}

    @Post()
    async crearActividad(@Body() estudianteDto: EstudianteDto){
        const estudiante: EstudianteEntity = plainToInstance(EstudianteEntity, estudianteDto);
        return await this.estudianteService.crearEstudiante(estudiante);
    }

    @Get(':estudianteId')
    async findEstudianteById(@Param('estudianteId', ParseIntPipe) estudianteId: number){
        return await this.estudianteService.findEstudianteById(estudianteId);
    }

    @Patch(':estudianteId/actividades/:actividadId')
    async inscribirseActividad(@Param('estudianteId', ParseIntPipe) estudianteId: number, @Param('actividadId', ParseIntPipe) actividadId: number){
            return await this.estudianteService.inscribirseActividad(estudianteId, actividadId);
        }
    
}
