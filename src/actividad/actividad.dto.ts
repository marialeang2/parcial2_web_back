/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsNumber, IsArray, IsOptional} from "class-validator";

export class ActividadDto {

    @IsString()
    @IsNotEmpty()
    readonly titulo: string;

    @IsString()
    @IsNotEmpty()
    readonly fecha: string;

    @IsString()
    @IsNotEmpty()
    readonly cupoMaximo: string;

    @IsNumber()
    @IsNotEmpty()
    readonly estado: number;

    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    readonly estudiantesIds?: number[];

    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    readonly reseñasIds?: number[];
    

}