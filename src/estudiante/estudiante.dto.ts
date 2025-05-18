/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsNumber, IsArray, IsOptional} from "class-validator";

export class EstudianteDto {

    @IsNumber()
    @IsNotEmpty()
    readonly cedula: number;

    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsString()
    @IsNotEmpty()
    readonly correo: string;

    @IsString()
    @IsNotEmpty()
    readonly programa: string;

    @IsNumber()
    @IsNotEmpty()
    readonly semestre: number;
    
    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    readonly reseñasId?: number;
    
    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    readonly actividadesId?: number; 


}