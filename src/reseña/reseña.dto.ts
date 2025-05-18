/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsNumber, IsDateString, ValidateNested} from "class-validator";
import { Type } from "class-transformer";


class EstudianteNestedDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}

class ActividadNestedDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
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

    @ValidateNested()
    @Type(() => EstudianteNestedDto)
    @IsNotEmpty()
    readonly estudiante: EstudianteNestedDto;

    @ValidateNested()
    @Type(() => ActividadNestedDto)
    @IsNotEmpty()
    readonly actividad: ActividadNestedDto;
}