/* eslint-disable prettier/prettier */
import { Controller, Post, Body, ParseIntPipe, Patch , Param, Get, UseInterceptors} from '@nestjs/common';
import { ActividadEntity } from './actividad.entity';
import { ActividadDto } from './actividad.dto';
import { plainToInstance } from 'class-transformer';
import { ActividadService } from './actividad.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';

@Controller('actividades')
@UseInterceptors(BusinessErrorsInterceptor)
export class ActividadController {
    constructor(private readonly actividadService: ActividadService){}

    @Post()
    async crearActividad(@Body() actividadDto: ActividadDto){
        const actividad: ActividadEntity = plainToInstance(ActividadEntity, actividadDto);
        return await this.actividadService.crearActividad(actividad);
    }

    @Patch(':id/estado/:estado')
    async cambiarEstado(@Param('id', ParseIntPipe) id:number, @Param('estado', ParseIntPipe) nuevoEstado:number ): Promise<ActividadEntity>{
        return await this.actividadService.cambiarEstado(id,nuevoEstado);
    }

    @Get('fecha/:fecha')
    async findAllActividadesByDate(@Param('fecha') fecha: string): Promise<ActividadEntity[]>{
        return await this.actividadService.findAllActividadesByDate(fecha);
    }
}
