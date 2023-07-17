import { Configuration, OAuth2Api } from '@ory/client';

const ory = new OAuth2Api(
  new Configuration({
    basePath: `http://127.0.0.1:4445/`,
    accessToken: 'c4fee1a4-ee9d-4540-a657-bbedda47512d',
  }),
);

export const verifyWithHydra = async (token: string) => {
  return ory.introspectOAuth2Token({ token });
};
