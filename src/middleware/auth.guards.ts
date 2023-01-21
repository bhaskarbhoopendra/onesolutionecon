import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const verifyRequest = await this.jwtService.verifyAsync(
      request.cookies['jwt'],
    );
    if (!verifyRequest) {
      return false;
    }
    return true;
  }
}
