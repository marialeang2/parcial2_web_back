/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActividadEntity } from './actividad.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

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

        const regex = /^[a-zA-Z0-9\s]+$/;
        if (!regex.test(actividad.titulo)) {
            throw new BusinessLogicException("El título no puede contener símbolos", BusinessError.PRECONDITION_FAILED);
        }

        actividad.estado = 0;
        return await this.actividadRepository.save(actividad);
    }

    async cambiarEstado(actividadId: number, nuevoEstado: number): Promise<ActividadEntity> {

        const actividad = await this.actividadRepository.findOne({where: { id: actividadId },relations: ['estudiantes']});
        if (!actividad) {
            throw new BusinessLogicException("Actividad no encontrada", BusinessError.NOT_FOUND);
        }

        const inscritos = actividad.estudiantes.length;
        const cupo = Number(actividad.cupoMaximo);
        if (![0, 1, 2].includes(nuevoEstado)) {
            throw new BusinessLogicException("Estado inválido", BusinessError.PRECONDITION_FAILED);
        }

        if (nuevoEstado === 1 && inscritos < 0.8 * cupo) {
            throw new BusinessLogicException("No se puede cerrar: menos del 80% del cupo ocupado", BusinessError.PRECONDITION_FAILED);
        }
        if (nuevoEstado === 2 && inscritos < cupo) {
            throw new BusinessLogicException("No se puede finalizar: aún hay cupos disponibles", BusinessError.PRECONDITION_FAILED);
        }

        actividad.estado = nuevoEstado;

        return await this.actividadRepository.save(actividad);
}

    async findAllActividadesByDate(fecha: string): Promise<ActividadEntity[]> {
        const actividades = await this.actividadRepository.find({ where: { fecha } });
        if (!actividades || actividades.length === 0) {
            throw new BusinessLogicException("No se encontraron actividades para esa fecha", BusinessError.NOT_FOUND);
        }
        return actividades;
    }
}