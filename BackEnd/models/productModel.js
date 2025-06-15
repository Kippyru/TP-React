import { Sequelize } from 'sequelize';
import db from '../config/dbconfig.js';

const { DataTypes } = Sequelize;

const Product = db.define('PRODUCTOS', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false
  }
}, {
  freezeTableName: true,
  timestamps: false // opcional, según si tenés campos createdAt / updatedAt
});

export default Product;
