import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

@Injectable()
export class ValidationPipe implements PipeTransform<any>{
    async transform(value: any, {metatype}: ArgumentMetadata) {
        if(!metatype || !this.toValidate(metatype)){
            return value;
        }

        const Object = plainToInstance(metatype, value);
        const errors = await validate(Object);

        if(errors.length > 0){
            throw new BadRequestException('Validation Failed')
        }
    }

    private toValidate(metatype: Function):boolean{
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
    
}