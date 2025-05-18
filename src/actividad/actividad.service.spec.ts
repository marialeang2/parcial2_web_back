/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { faker } from '@faker-js/faker';
import { ActividadEntity } from './actividad.entity';
import { ActividadService } from './actividad.service';

describe('ActividadService', () => {
  let service: ActividadService;
  let repository: Repository<ActividadEntity>;
  let actividadesList: ActividadEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        imports: [...TypeOrmTestingConfig()],
        providers: [ActividadService],
    }).compile();

    service = module.get<ActividadService>(ActividadService);
    repository = module.get<Repository<ActividadEntity>>(getRepositoryToken(ActividadEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    actividadesList = [];
    for (let i = 0; i < 5; i++) {
        const actividad: ActividadEntity = await repository.save({
        titulo: faker.lorem.sentence(),
        fecha: faker.date.future().toString(),
        cupoMaximo: faker.number.int({ min: 1, max: 100 }).toString(),
        estado: faker.number.int({ min: 0, max: 2 }),
        estudiantes: [],
        reseñas: []
      });
      actividadesList.push(actividad);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('debería crear actividad (caso positivo)', async () => {
    let titulo = faker.lorem.sentence(5).replace(/[^\w\s]/g, '');
    while (titulo.length < 15) {
        titulo += ' ' + faker.lorem.word();
    }

    const actividad: ActividadEntity = {
        id: 0,
        titulo: titulo,
        fecha: faker.date.future().toString(),
        cupoMaximo: faker.number.int({ min: 1, max: 100 }).toString(),
        estado: faker.number.int({ min: 0, max: 2 }),
        estudiantes: [],
        reseñas: [],
    };

    const newActividad = await service.crearActividad(actividad);
    expect(newActividad).not.toBeNull();
    expect(newActividad.id).not.toBeNull();
    expect(newActividad.titulo).toEqual(actividad.titulo);
    expect(newActividad.fecha).toEqual(actividad.fecha);
    expect(newActividad.cupoMaximo).toEqual(actividad.cupoMaximo);
    expect(newActividad.estado).toEqual(actividad.estado);
  });

  it('debería lanzar un error al crear actividad (caso negativo)', async () => {
    const actividad: ActividadEntity = {
        id: 0,
        titulo: "Título con símbolos @#$%",
        fecha: faker.date.future().toString(),
        cupoMaximo: faker.number.int({ min: 1, max: 100 }).toString(),
        estado: faker.number.int({ min: 0, max: 2 }),
        estudiantes: [],
        reseñas: [],
    };

    await expect(() => service.crearActividad(actividad)).rejects.toHaveProperty("message", "El título no puede contener símbolos");
  });


    it('debería lanzar un error al cambiar el estado de la actividad (caso negativo)', async () => {
        const actividad: ActividadEntity = actividadesList[0];
        actividad.estado = 3; // Estado inválido
        await expect(() => service.cambiarEstado(actividad.id, actividad.estado)).rejects.toHaveProperty("message", "Estado inválido");
    });

    it('debería encontrar actividades por fecha (caso positivo)', async () => {
        const fecha = actividadesList[0].fecha;
        const actividades: ActividadEntity[] = await service.findAllActividadesByDate(fecha);
        expect(actividades).not.toBeNull();
        expect(actividades.length).toBeGreaterThan(0);
    });
    it('debería lanzar un error al buscar actividades por fecha (caso negativo)', async () => {
        const fecha = "2023-01-01"; // Fecha sin actividades
        await expect(() => service.findAllActividadesByDate(fecha)).rejects.toHaveProperty("message", "No se encontraron actividades para esa fecha");
    });

});