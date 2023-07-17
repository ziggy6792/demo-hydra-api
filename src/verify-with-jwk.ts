/* eslint-disable max-len */

import jwt from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';
import jwks from './config/jwks.json';

export const verifyWithJwk = (token: string) => {
  const decodedToken = jwt.decode(token, { complete: true }) as any;

  const { kid } = decodedToken.header;

  const jwkKey = jwks.keys.find((key) => key.kid === kid) as any;

  if (!jwkKey) throw new Error('Cannot find kid ' + kid);

  const publicKey = jwkToPem(jwkKey);

  const decoded = jwt.verify(token, publicKey);

  return decoded;
};
