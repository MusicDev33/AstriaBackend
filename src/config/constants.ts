import dotenv from 'dotenv';
dotenv.config();

let port = 3100;
let apiBase = '/asapi/v1/';

if (process.env.NODE_ENV === 'DEVTEST') {
  port = 3101;
}

if (process.env.NODE_ENV === 'DEVTEST' || process.env.NODE_ENV === 'PRODUCTION') {
  apiBase = '/v1/';
}

const acceptedAgents = ['ASAPIv1', 'ASiOSv1', 'ASAndroidv1'];

export { port, apiBase, acceptedAgents };
