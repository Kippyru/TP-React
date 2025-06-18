import express from 'express';
import { Sequelize } from 'sequelize'; 

const dbOptions = new Sequelize('rodocion', 'root', '', {
  host: '127.0.0.1',
  port: 3306,
  dialect: "mysql",
  user: 'root',
  password: 'masterkey'
});

export default dbOptions;
