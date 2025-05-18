/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { faker } from '@faker-js/faker';
import { ReseñaService } from './reseña.service';
import { ReseñaEntity } from './reseña.entity';
import { EstudianteEntity } from '../estudiante/estudiante.entiy';
import { ActividadEntity } from '../actividad/actividad.entity';

describe('ReseñaService', () => {
  let service: ReseñaService;
  let reseñaRepository: Repository<ReseñaEntity>;
  let actividadRepository: Repository<ActividadEntity>;
  let estudianteRepository: Repository<EstudianteEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ReseñaService],
    }).compile();

    service = module.get<ReseñaService>(ReseñaService);
    reseñaRepository = module.get<Repository<ReseñaEntity>>(getRepositoryToken(ReseñaEntity));
    actividadRepository = module.get<Repository<ActividadEntity>>(getRepositoryToken(ActividadEntity));
    estudianteRepository = module.get<Repository<EstudianteEntity>>(getRepositoryToken(EstudianteEntity));
  });

  it('debería agregar una reseña correctamente (caso positivo)', async () => {
    const estudiantes = await estudianteRepository.save({
        cedula: faker.number.int(),
        nombre: faker.name.fullName(),
        correo: faker.internet.email(),
        programa: faker.lorem.word(),
        semestre: 5,
    }); 

    const titulo = faker.lorem.sentence(6).replace(/[^\w\s]/g, '');
    const actividad = await actividadRepository.save({
        titulo: titulo,
        fecha: faker.date.future().toString(),
        cupoMaximo: "1",
        estado: 2,
        estudiantes: [estudiantes],
        reseñas: [],
    });

    const reseña: ReseñaEntity = {
        id: 0,
        comentario: 'Muy buena actividad',
        calificacion: 5,
        estudiante: estudiantes,
        actividad: actividad,
        fecha: ''
    };

    const resultado = await service.agregarReseña(reseña);
    expect(resultado).toBeDefined();
    expect(resultado.comentario).toBe('Muy buena actividad');
    expect(resultado.calificacion).toBe(5);
    expect(resultado.estudiante.id).toBe(estudiantes.id);
    expect(resultado.actividad.id).toBe(actividad.id);
  });

  it('debería agregar una reseña incorrectamente (caso negativo)', async () => {
    const estudiantes = await estudianteRepository.save({
        cedula: faker.number.int(),
        nombre: faker.name.fullName(),
        correo: faker.internet.email(),
        programa: faker.lorem.word(),
        semestre: 5,
    }); 

    const titulo = faker.lorem.sentence(6).replace(/[^\w\s]/g, '');
    const actividad = await actividadRepository.save({
        titulo: titulo,
        fecha: faker.date.future().toString(),
        cupoMaximo: "2",
        estado: 1,
        estudiantes: [estudiantes],
        reseñas: [],
    });

    const reseña: ReseñaEntity = {
        id: 0,
        comentario: 'Muy buena actividad',
        calificacion: 5,
        estudiante: estudiantes,
        actividad: actividad,
        fecha: ''
    };

    await expect(() => service.agregarReseña(reseña)).rejects.toHaveProperty("message", "No está finalizada la actividad");
   
  });
  
});