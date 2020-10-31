import { NextPageContext } from 'next';
import ServerCookie from 'next-cookies';
import { AuthToken, DecodedToken, TOKEN_STORAGE_KEY } from '../services/auth_token';

export interface AuthInfo {
	token: string;
	isValid: boolean;
	decodedToken: DecodedToken;
	isExpired: () => boolean;
}

export function getAuthInfo(ctx: NextPageContext): AuthInfo {
	const token = ServerCookie(ctx)[TOKEN_STORAGE_KEY];
	const auth = new AuthToken(token);
	return {
		token: auth.token,
		isValid: auth.isValid,
		decodedToken: auth.decodedToken,
		isExpired: () => {
			return new Date() > new Date(auth.decodedToken.exp * 1000);
		}
	};
}
