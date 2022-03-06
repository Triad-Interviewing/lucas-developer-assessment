/* Justification for import (class-validator, and class-transformer):
 * Allows for more verbose testing of data models. 
*/
import { 
    IsBoolean, 
    IsInt, 
    IsNumberString,  
    IsString, 
    IsISO8601, 
    IsOptional 
} from "class-validator";

class AssessmentLog {
    @IsInt()
    id!: number;

    @IsBoolean()
    is_complete!: boolean;

    @IsISO8601()
    start_time!: string;

    @IsNumberString()
    total_time!: string;

    @IsInt()
    total_correct!: number;

    @IsOptional()
    @IsString()
    build_seed!: string | null;

    @IsInt()
    version_number!: number | null;

    @IsInt()
    assessment!: number;

    @IsInt()
    student!: number;

    @IsISO8601()
    created_at!: string;

    @IsISO8601()
    updated_at!: string;

    @IsOptional()
    @IsString()
    created_by!: string | null;

    @IsOptional()
    @IsString()
    updated_by!: string | null;
}

export { AssessmentLog };