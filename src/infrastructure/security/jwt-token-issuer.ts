import { Injectable } from "@nestjs/common";
import { TokenIssuerPort, TokenPayload } from "../../modules/auth/application/ports/token-issuer.port";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenIssuer extends TokenIssuerPort{
    constructor(private readonly jwtService: JwtService){
        super();
    }

    issue(payload: TokenPayload): Promise<string> {
        return this.jwtService.signAsync(payload);
    }
}