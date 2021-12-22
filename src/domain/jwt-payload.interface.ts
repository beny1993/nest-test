export interface JwtPayload {
    username: string;
    isSecondFactorAuthenticated?: boolean;
}
