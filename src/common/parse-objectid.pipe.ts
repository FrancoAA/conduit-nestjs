import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<string, string> {
  private static OBJECTID_REGEX: RegExp = /^[a-fA-F0-9]{24}$/;

  transform(value: string, metadata: ArgumentMetadata): string {
    if (!ParseObjectIdPipe.OBJECTID_REGEX.test(value)) {
      throw new BadRequestException('Invalid ObjectId');
    }
    return value;
  }
}
