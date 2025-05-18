/* eslint-disable prettier/prettier */
import { ActividadEntity } from "../actividad/actividad.entity";
import { ReseñaEntity } from "../reseña/reseña.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from "typeorm";

@Entity()
export class EstudianteEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cedula: number;

    @Column()
    nombre: string;

    @Column()
    correo: string;

    @Column()
    programa: string;

    @Column()
    semestre: number;

    @OneToMany(() => ReseñaEntity, reseñas => reseñas.estudiante)
    reseñas: ReseñaEntity[];

    @ManyToMany(()=> ActividadEntity, actividades => actividades.estudiantes)
    actividades:ActividadEntity[];


}