import * as jwt from 'jsonwebtoken';
import { config } from '../../../config/index';
import { Injectable } from '@nestjs/common';
interface IJwtData {
  id: number;
  roles: string[];
}
@Injectable()
export class JwtService {
  generate(data: IJwtData): {
    accessToken: string;
    refreshToken: string;
  } {
    const accToken = jwt.sign(data, config.JWT_ACCESS_SECRET);
    const refToken = jwt.sign(data, config.JWT_REFRESH_SECRET);

    return {
      accessToken: accToken,
      refreshToken: refToken,
    };
  }

  vaerifyAcc(token: string): IJwtData {
    return jwt.verify(token, config.JWT_ACCESS_SECRET) as IJwtData;
  }

  vaerifyRef(token: string): IJwtData {
    return jwt.verify(token, config.JWT_REFRESH_SECRET) as IJwtData;
  }
}
