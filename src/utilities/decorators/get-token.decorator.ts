import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from 'src/data';


export const GetToken = createParamDecorator((_data, ctx: ExecutionContext): JwtPayload => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
});
