import dotenv from 'dotenv';
dotenv.config();

let dbConfig: {database: string};

if (process.env.NODE_ENV === 'DEVTEST') {
  dbConfig = {
    database: 'mongodb://localhost:27017/asdevtest'
  };
} else if (process.env.NODE_ENV === 'development') {
  dbConfig = {
    database: 'mongodb://localhost:27017/astest'
  };
} else {
  dbConfig = {
    database: 'mongodb://localhost:27017/astest'
  };
}

export { dbConfig };
