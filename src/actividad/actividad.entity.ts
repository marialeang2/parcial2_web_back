/* eslint-disable prettier/prettier */
import { EstudianteEntity } from "src/estudiante/estudiante.entiy";
import { ReseñaEntity } from "src/reseña/reseña.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from "typeorm";

@Entity()
export class ActividadEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string;

    @Column()
    fecha: string;

    @Column()
    cupoMaximo: string;

    @Column()
    estado: number;

    @ManyToMany(()=> EstudianteEntity, estudiantes => estudiantes.actividades)
    estudiantes: EstudianteEntity[];

    @OneToMany(()=> ReseñaEntity, reseñas => reseñas.actividad)
    reseñas: ReseñaEntity[];

}