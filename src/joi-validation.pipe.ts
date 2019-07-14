import { ArgumentMetadata, BadRequestException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import * as Joi from '@hapi/joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform<any> {
    public constructor(private readonly schema: Joi.Schema) {
    }

    async transform(request: any, metadata: ArgumentMetadata) {
        if (!request) {
            throw new BadRequestException('No data submitted');
        }

        const { error, value } = Joi.validate(request, this.schema, {
            abortEarly: false,
            convert: true,
            stripUnknown: true,
            allowUnknown: true,
        });

        if (error) {
            throw new HttpException({
                message: 'Invalid input data',
                errors: this.buildErrors(error.details),
            }, HttpStatus.UNPROCESSABLE_ENTITY);
        }

        return value;
    }

    private buildErrors(errors: Joi.ValidationErrorItem[]): any[] {
        return errors.map(({ message, path, context }) => {
            const { key, label, value } = context;
            return {
                message,
                path,
                context: { key, label, value },
            };
        });
    }
}
