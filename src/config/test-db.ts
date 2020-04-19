import dotenv from 'dotenv';
dotenv.config();

let dbConfig: {adminSecret: string, database: string, secret: string};

dbConfig = {
  adminSecret: '!2naMgb<asdf?oeiTG542',
  database: 'mongodb://localhost:27017/asunittest',
  secret: '$1358hbafbg@@'
};

export { dbConfig };
