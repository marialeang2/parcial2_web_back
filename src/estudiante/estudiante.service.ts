/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EstudianteEntity } from './estudiante.entiy';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { ActividadEntity } from '../actividad/actividad.entity';

@Injectable()
export class EstudianteService {
    constructor(
        @InjectRepository(EstudianteEntity)
        private readonly estudianteRepository: Repository<EstudianteEntity>,

        @InjectRepository(ActividadEntity)
        private readonly actividadRepository:Repository<ActividadEntity>
    ){}

    async crearEstudiante(estudiante: EstudianteEntity): Promise<EstudianteEntity>{

        if(estudiante.semestre<1 || estudiante.semestre >10) { 
            throw new BusinessLogicException("No es un semestre válido", BusinessError.NOT_FOUND);
        }

        if (!estudiante.correo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(estudiante.correo)) {
            throw new BusinessLogicException('El correo es inválido', BusinessError.PRECONDITION_FAILED);
        }

        return await this.estudianteRepository.save(estudiante);
    }

    async findEstudianteById(id: number): Promise<EstudianteEntity>{
        const estudiante: EstudianteEntity = await this.estudianteRepository.findOne({where:{id}, relations:["reseñas","actividades"]});
        if (!estudiante)
            throw new BusinessLogicException("No se encontró estudiante",BusinessError.NOT_FOUND);
        return estudiante;
    }

    async inscribirseActividad(estudianteID: number, actividadID: number): Promise<void> {

        const estudiante = await this.estudianteRepository.findOne({where: { id: estudianteID },relations: ['actividades']});
        if (!estudiante) {
            throw new BusinessLogicException("Estudiante no encontrado", BusinessError.NOT_FOUND);
        }
        const actividad = await this.actividadRepository.findOne({where: { id: actividadID },relations: ["estudiantes"]});
        if (!actividad) {
            throw new BusinessLogicException("Actividad no encontrada", BusinessError.NOT_FOUND);
        }
        if (actividad.estado !== 0) {
            throw new BusinessLogicException("La actividad no está disponible para inscripción", BusinessError.PRECONDITION_FAILED);
        }
        const inscritos = actividad.estudiantes.length;
        if (inscritos >= Number(actividad.cupoMaximo)) {
            throw new BusinessLogicException("La actividad no tiene cupo disponible", BusinessError.PRECONDITION_FAILED);
        }
        const yaInscrito = actividad.estudiantes.some(est => est.id === estudianteID);
        if (yaInscrito) {
            throw new BusinessLogicException("El estudiante ya está inscrito en esta actividad", BusinessError.PRECONDITION_FAILED);
        }
        actividad.estudiantes.push(estudiante);
        await this.actividadRepository.save(actividad);
    }

}
