/* eslint-disable prettier/prettier */
import { ActividadEntity } from "../actividad/actividad.entity";
import { EstudianteEntity } from "../estudiante/estudiante.entiy";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class ReseñaEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    comentario: string;

    @Column()
    calificacion:number;

    @Column()
    fecha: string;

    @ManyToOne(() => EstudianteEntity, estudiante => estudiante.reseñas)
    estudiante: EstudianteEntity;

    @ManyToOne(() => ActividadEntity, actividad => actividad.reseñas)
    actividad: ActividadEntity;
}