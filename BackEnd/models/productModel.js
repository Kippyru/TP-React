import { Sequelize } from 'sequelize';
import db from '../config/dbconfig.js';

const { DataTypes } = Sequelize;

const Product = db.define('PRODUCTOS', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  ID_COD: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Localidad: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Pais: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Region: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Habitantes: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  Idiomas: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  freezeTableName: true,
  timestamps: false
});

export default Product;
