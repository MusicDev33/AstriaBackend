import dotenv from 'dotenv';
dotenv.config();

let dbConfig: {adminSecret: string, database: string, secret: string};

if (process.env.NODE_ENV === 'DEVTEST') {
  dbConfig = {
    adminSecret: '!2naMgb<asdf?oeiTG542',
    database: 'mongodb://localhost:27017/asdevtest',
    secret: '$1358hbafbg@@'
  };
} else if (process.env.NODE_ENV === 'development') {
  dbConfig = {
    adminSecret: '!2naMdf?oeiTG542gb<as',
    database: 'mongodb://localhost:27017/astest',
    secret: 'eiTG542!2nagb<asMdf?o'
  };
} else {
  dbConfig = {
    adminSecret: '!2naMdf?oeiTG542gb<as',
    database: 'mongodb://localhost:27017/astest',
    secret: 'eiTG542!2nagb<asMdf?o'
  };
}

export { dbConfig };
