export interface TokenPayload {sub: number; email: string;}

export abstract class TokenIssuerPort {
    abstract issue(payload: TokenPayload): Promise<string>
}