import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { EmailAlreadyInUseError } from '../../../modules/users/domain/exceptions/email-already-in-use.error';
import { UserNotFoundError } from '../../../modules/users/domain/exceptions/user-not-found.error';

@Catch(EmailAlreadyInUseError, UserNotFoundError)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(
    exception: EmailAlreadyInUseError | UserNotFoundError,
    host: ArgumentsHost,
  ): void {
    const response = host.switchToHttp().getResponse();
    const statusCode =
      exception instanceof EmailAlreadyInUseError
        ? HttpStatus.CONFLICT
        : HttpStatus.NOT_FOUND;

    response.status(statusCode).json({
      statusCode,
      message: exception.message,
    });
  }
}
