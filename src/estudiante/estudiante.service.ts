/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EstudianteEntity } from './estudiante.entiy';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';
import { ActividadEntity } from 'src/actividad/actividad.entity';

@Injectable()
export class EstudianteService {
    constructor(
        @InjectRepository(EstudianteEntity)
        private readonly estudianteRepository: Repository<EstudianteEntity>,

        @InjectRepository(ActividadEntity)
        private readonly actividadRepository:Repository<ActividadEntity>
    ){}

    async crearEstudiante(estudiante: EstudianteEntity): Promise<EstudianteEntity>{

        if(estudiante.semestre<1 && estudiante.semestre >10) { 
            throw new BusinessLogicException("No es un semestre válido", BusinessError.NOT_FOUND);
        }
        return await this.estudianteRepository.save(estudiante);
    }

    async findEstudianteById(id: number): Promise<EstudianteEntity>{
        const estudiante: EstudianteEntity = await this.estudianteRepository.findOne({where:{id}, relations:["reseñas","actividades"]});
        if (!estudiante)
            throw new BusinessLogicException("No se encontró estudiante",BusinessError.NOT_FOUND);
        return estudiante;
    }



}
