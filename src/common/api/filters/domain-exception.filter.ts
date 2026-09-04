import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { EmailAlreadyInUseError } from '../../../modules/users/domain/exceptions/email-already-in-use.error';
import { UserNotFoundError } from '../../../modules/users/domain/exceptions/user-not-found.error';
import { InvalidCredentialsError } from '../../../modules/auth/domain/exceptions/invalid_credentials.error';

@Catch(EmailAlreadyInUseError, UserNotFoundError, InvalidCredentialsError)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(
    exception: Error,
    host: ArgumentsHost,
  ): void {
    let statusCode;
    const response = host.switchToHttp().getResponse();



    response.status(statusCode).json({
      statusCode,
      message: exception.message,
    });
  }

  private getStatusCode(exception: Error){
      switch (exception.constructor) {
        case EmailAlreadyInUseError:
          return HttpStatus.CONFLICT;
        case UserNotFoundError:
          return HttpStatus.NOT_FOUND;
        case InvalidCredentialsError:
          return HttpStatus.UNAUTHORIZED;


        default:
          return HttpStatus.INTERNAL_SERVER_ERROR;
      }
  }
}
