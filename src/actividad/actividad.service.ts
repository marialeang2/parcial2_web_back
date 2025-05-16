/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActividadEntity } from './actividad.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';

@Injectable()
export class ActividadService {
    constructor(
        @InjectRepository(ActividadEntity)
        private readonly actividadRepository: Repository<ActividadEntity>
    ){}

    async crearActividad(actividad: ActividadEntity): Promise<ActividadEntity>{
        if(actividad.titulo.length< 15){
            throw new BusinessLogicException("No es la longitud suficiente", BusinessError.PRECONDITION_FAILED)
        }
        return await this.actividadRepository.save(actividad);
    }

    async cambiarEstado(actividadId:number, estado:number, actividad:ActividadEntity): Promise<ActividadEntity>{
        const persistedActividad: ActividadEntity = await this.actividadRepository.findOne({where:{id:actividadId}});
        if(!persistedActividad){
            throw new BusinessLogicException("No es la longitud suficiente", BusinessError.PRECONDITION_FAILED)
        }
        persistedActividad.estado === estado;
        return await this.actividadRepository.save({...persistedActividad,...actividad})

    }

    async findAllActividadesByDate(fecha: string, actividades: ActividadEntity[]): Promise<ActividadEntity[]>{
        
       for (let i = 0; i < actividades.length; i++) {
         const actividad: ActividadEntity = await this.actividadRepository.findOne({where: {fecha: actividades[i].fecha}});
         if(!actividad)
            throw new BusinessLogicException("No se encontró fechas", BusinessError.NOT_FOUND)
        }
        return actividades;

    }
}