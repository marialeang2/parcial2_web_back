/* eslint-disable prettier/prettier */
import { EstudianteEntity } from "../estudiante/estudiante.entiy";
import { ReseñaEntity } from "../reseña/reseña.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";

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
    @JoinTable()
    estudiantes: EstudianteEntity[];

    @OneToMany(()=> ReseñaEntity, reseñas => reseñas.actividad)
    reseñas: ReseñaEntity[];

}