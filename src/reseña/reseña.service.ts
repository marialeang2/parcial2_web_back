/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReseñaEntity } from './reseña.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { ActividadEntity } from '../actividad/actividad.entity';
@Injectable()
export class ReseñaService {
    constructor(
        @InjectRepository(ReseñaEntity)
        private readonly reseñaRepository: Repository<ReseñaEntity>,
        @InjectRepository(ActividadEntity)
        private readonly actividadRepository: Repository<ActividadEntity>

    ){}

    async agregarReseña(reseña:ReseñaEntity): Promise<ReseñaEntity>{
        const actividad = await this.actividadRepository.findOne({
        where: { id: reseña.actividad.id }, relations: ['estudiantes'],});
        if (!actividad) {
        throw new BusinessLogicException("Actividad no encontrada", BusinessError.NOT_FOUND);
        }
        
        if(reseña.actividad.estado !== 2){
            throw new BusinessLogicException("No está finalizada la actividad", BusinessError.PRECONDITION_FAILED);
        }

        const estudianteInscrito = actividad.estudiantes.some((e) => e.id === reseña.estudiante.id);

        if (!estudianteInscrito) {
            throw new BusinessLogicException("El estudiante no estuvo inscrito en la actividad", BusinessError.PRECONDITION_FAILED);
    }
        return await this.reseñaRepository.save(reseña);
    }
}
