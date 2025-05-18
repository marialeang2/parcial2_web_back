/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsNumber, IsDateString} from "class-validator";

export class ReseñaDto {

    @IsString()
    @IsNotEmpty()
    readonly comentario: string;

    @IsNumber()
    @IsNotEmpty()
    readonly calificacion: number;

    @IsDateString()
    @IsNotEmpty()
    readonly fecha: string;

    @IsNumber()
    @IsNotEmpty()
    readonly estudianteId: number;

    @IsNumber()
    @IsNotEmpty()
    readonly actividadId: number;
}