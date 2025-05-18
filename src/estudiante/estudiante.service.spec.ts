/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { EstudianteService } from './estudiante.service';
import { EstudianteEntity } from './estudiante.entiy';
import { faker } from '@faker-js/faker';
import { ActividadEntity } from '../actividad/actividad.entity';

describe('EstudianteService', () => {
  let service: EstudianteService;
  let repository: Repository<EstudianteEntity>;
  let repositoryActividad: Repository<ActividadEntity>;
  let estudianteList: EstudianteEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        imports: [...TypeOrmTestingConfig()],
        providers: [EstudianteService],
    }).compile();

    service = module.get<EstudianteService>(EstudianteService);
    repository = module.get<Repository<EstudianteEntity>>(getRepositoryToken(EstudianteEntity));
    repositoryActividad = module.get<Repository<ActividadEntity>>(getRepositoryToken(ActividadEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    estudianteList = [];
    for (let i = 0; i < 5; i++) {
      const estudiante: EstudianteEntity = await repository.save({
        cedula: faker.number.int(),
        nombre: faker.name.fullName(),
        correo: faker.internet.email(),
        programa: faker.lorem.word(),
        semestre: faker.number.int({ min: 1, max: 10 }),
      });
      estudianteList.push(estudiante);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('debería crear estudiante (caso positivo)', async () => {
    const estudiante: EstudianteEntity = {
      id: 0,
      cedula: faker.number.int(),
      nombre: faker.name.fullName(),
      correo: faker.internet.email(),
      programa: faker.lorem.word(),
      semestre: faker.number.int({ min: 1, max: 10 }),
      reseñas: [],
      actividades: [],
    };

    const newEstudiante = await service.crearEstudiante(estudiante);
    expect(newEstudiante).not.toBeNull();
    expect(estudiante).not.toBeNull();
    expect(estudiante.id).toEqual(newEstudiante.id);
    expect(estudiante.cedula).toEqual(estudiante.cedula);
    expect(estudiante.nombre).toEqual(estudiante.nombre);
    expect(estudiante.correo).toEqual(estudiante.correo);
    expect(estudiante.programa).toEqual(estudiante.programa);
  });


   it('debería lanzar error por el semestre (caso negativo)', async () => {
    const estudiante: EstudianteEntity = {
      id: 0,
      cedula: faker.number.int(),
      nombre: faker.name.fullName(),
      correo: faker.internet.email(),
      programa: faker.lorem.word(),
      semestre: 11,
      reseñas: [],
      actividades: [],
    };

    await expect(()=> service.crearEstudiante(estudiante)).rejects.toHaveProperty("message", "No es un semestre válido");
  });


  it('debería buscar estudiante por id (caso positivo)', async () => {
    const storedestudiante: EstudianteEntity = estudianteList[0];
    const estudiante: EstudianteEntity = await service.findEstudianteById(storedestudiante.id)
    expect(estudiante).not.toBeNull();
    expect(estudiante.id).toEqual(storedestudiante.id);
    expect(estudiante.cedula).toEqual(storedestudiante.cedula);
    expect(estudiante.nombre).toEqual(storedestudiante.nombre);
    expect(estudiante.correo).toEqual(storedestudiante.correo);
    expect(estudiante.programa).toEqual(storedestudiante.programa);
  });

  it('ebería buscar estudiante por id y no encontrar (caso negativo)', async () => {
    await expect(() => service.findEstudianteById(99)).rejects.toHaveProperty("message", "No se encontró estudiante")
  });

  it('debería inscribir estudiante en actividad (caso positivo)', async () => {
    const actividad: ActividadEntity = {
      id: 0,
      titulo: faker.lorem.word(),
      fecha: faker.date.future().toString(),
      cupoMaximo: faker.number.int({ min: 1, max: 10 }).toString(),
      estado: 0,
      estudiantes: [],
      reseñas: [],
    };

    const actividadGuardada: ActividadEntity = await repositoryActividad.save(actividad);
    const estudiante: EstudianteEntity = estudianteList[0];
    const actividadId = actividadGuardada.id;
    await service.inscribirseActividad(estudiante.id, actividadId);

    const actividadActualizada = await repositoryActividad.findOne({
    where: { id: actividadId },
    relations: ['estudiantes'],
  });

  expect(actividadActualizada.estudiantes.length).toBe(1);
  expect(actividadActualizada.estudiantes[0].id).toBe(estudiante.id);

  });

  it('debería lanzar error si la actividad está finalizada (estado 2)', async () => {
  const actividad: ActividadEntity = {
    id: 0,
    titulo: faker.lorem.word(),
    fecha: faker.date.future().toString(),
    cupoMaximo: faker.number.int({ min: 1, max: 10 }).toString(),
    estado: 2,
    estudiantes: [],
    reseñas: [],
  };

  const actividadGuardada: ActividadEntity = await repositoryActividad.save(actividad);
  const estudiante: EstudianteEntity = estudianteList[0];
  const actividadId = actividadGuardada.id;

  await expect(service.inscribirseActividad(estudiante.id, actividadId))
    .rejects
    .toHaveProperty('message', 'La actividad no está disponible para inscripción');
});
    
  
});
