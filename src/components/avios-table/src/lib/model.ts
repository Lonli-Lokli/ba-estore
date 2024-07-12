import db from '../lib/../../../../../datasource/db.json';

export interface Person {
    name: string;
    age: number;
  }

  export const data = db;