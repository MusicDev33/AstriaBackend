import dotenv from 'dotenv';
dotenv.config();

let dbConfig: {adminSecret: string, database: string, secret: string};

if (process.env.NODE_ENV === 'DEVTEST') {
  dbConfig = {
    adminSecret: '!2naMgb<asdf?oeiTG542',
    database: 'mongodb://localhost:27017/asdevtest',
    secret: 'SLocgeAPmcdw2ZTaPUELyGJOki8JDtun'
  };
} else if (process.env.NODE_ENV === 'development') {
  dbConfig = {
    adminSecret: '!2naMdf?oeiTG542gb<as',
    database: 'mongodb://localhost:27017/astest',
    secret: 'bD7gJaSpTomTqQ2UvRawxfLdqX8NmEdU'
  };
} else {
  dbConfig = {
    adminSecret: '!2naMdf?oeiTG542gb<as',
    database: 'mongodb://localhost:27017/astest',
    secret: '6Ly20w0Wn6nXWSd0D7VlJPHrvBixVFaz'
  };
}

export { dbConfig };
