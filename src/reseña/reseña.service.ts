/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReseñaEntity } from './reseña.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';
@Injectable()
export class ReseñaService {
    constructor(
        @InjectRepository(ReseñaEntity)
        private readonly reseñaRepository: Repository<ReseñaEntity>
    ){}

    async agregarReseña(reseña:ReseñaEntity): Promise<ReseñaEntity>{
        if(reseña.actividad.estado !== 2){
            throw new BusinessLogicException("No está finalizada la actividad", BusinessError.PRECONDITION_FAILED);
        }
        return await this.reseñaRepository.save(reseña);
    }
}
