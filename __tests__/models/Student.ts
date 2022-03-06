/* Justification for import (class-validator, and class-transformer):
 * Allows for more verbose testing of data models. 
*/
import { 
    IsArray, 
    IsBoolean, 
    IsInt, 
    IsNumberString, 
    IsObject, 
    IsString, 
    Length, 
    ValidateNested, 
    IsISO8601, 
    IsOptional 
} from "class-validator";

/* NOTE:
 * Due to the nature of the data model in our server,
 * attributes will have a null-check
*/
// ISO8601: //https://www.iso.org/iso-8601-date-and-time-format.html
class Student {
    @IsInt()
    id!: number;

    /* Assumes these mins and maxes for this attribute */
    @Length(1, 99)
    @IsString()
    name!: string;
    
    @IsString()
    email!: string;

    @IsNumberString()
    school_id!: string;
    
    @IsString()
    created_at!: string;

    @IsISO8601()
    updated_at!: string;

    @IsObject()
    institution!: Institution;

    @IsOptional()
    @IsString()
    created_by!: string | null;

    @IsOptional()
    @IsString()
    updated_by!: string | null;

    @IsArray()
    @ValidateNested({ each: true })
    assessments!: Assessment[];
}

class Institution {
    @IsInt()
    id!: number;

    @IsISO8601()
    name!: string;

    @IsISO8601()
    created_at!: string;

    @IsISO8601()
    updated_at!: string;

    @IsString()
    created_by!: string | null;
    
    @IsString()
    updated_by!: string | null;
}

class Assessment {
    @IsInt()
    id!: number;

    @IsString()
    name!: string;

    @IsString()
    description!: string;

    @IsISO8601()
    open_time!: string;

    @IsISO8601()
    close_time!: string;

    @IsNumberString()
    time_limit!: string;
    
    @IsInt()
    version_number!: number;

    @IsOptional()
    @IsString()
    version_name!: string | null;

    @IsOptional()
    @IsBoolean()
    parent_assessment!: string | null;

    @IsOptional()
    @IsString()
    type!: string | null;

    @IsBoolean()
    is_locked!: boolean;

    @IsISO8601()
    created_at!: string;

    @IsISO8601()
    updated_at!: string;

    @IsOptional()
    @IsISO8601()
    created_by!: string | null;

    @IsOptional()
    @IsString()
    updated_by!: string | null;
}

export { Student, Assessment, Institution };