import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization; //Basic: email:password

    if (!authHeader) {
      return false;
    }
    const auth = authHeader.split(' ')[1]; // [Basic, email: password]. Me quedo con el segundo elemento
    if (!auth) {
      return false;
    }
    const [email, password] = auth.split(':');

    if (!email || !password) {
      return false;
    }
    return true;
  }
}
