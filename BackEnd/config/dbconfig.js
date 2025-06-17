import express from 'express';
const app = express();
import Sequalize from 'sequelize';
const PORT = 3000;

const dbOptions =  new Sequalize('rodocion', 'root', "", {
  host: '127.0.0.1',
  port: 3306,
  dialect: "mysql",
 // database: 'D:/Programacion/BDRodo/RODOCION.FBS',
  user: 'root',
  password: 'masterkey',
  //lowercase_keys: false
});
 

/*app.get('/productos', (req, res) => {
  Firebird.attach(dbOptions, (err, db) => {
    if (err) return res.status(500).send('Error al conectar con la base de datos');

    db.query('SELECT * FROM libros', (err, result) => {
      db.detach();

      if (err) return res.status(500).send('Error en la consulta');
      res.json(result);
    });
  });
}); */



export default dbOptions;
