import { OAuth2Client } from 'google-auth-library';
import { getEnvVar } from './getEnvVar.js';
import createHttpError from 'http-errors';

const oAuth2Client = new OAuth2Client({
  clientId: getEnvVar("GOOGLE_CLIENT_ID"),
  clientSecret: getEnvVar("GOOGLE_CLIENT_SECRET"),
  redirectUri: getEnvVar("GOOGLE_REDIRECT_URI")
});

export const generateGoogleOAuthLink = () => oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: [
    'https://www.googleapis.com/auth/userinfo.email', 
    'https://www.googleapis.com/auth/userinfo.profile'
    ],
});

export const verifyCode = async (code) => {
  try {
    const { tokens } = await oAuth2Client.getToken(code);
    const { id_token: idToken } = tokens;
  
    if(!idToken) {
      throw createHttpError(401, 'Unauthorized');
    }
  
    const ticket = await oAuth2Client.verifyIdToken({ idToken });
  
    return ticket.getPayload();
  } catch(err){
    console.log(err);
    throw createHttpError(401, 'Unauthorized');
  }

};