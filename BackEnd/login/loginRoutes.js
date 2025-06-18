// loginRoutes.js
import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();
const USERS_FILE = path.resolve('./users.json');

// Leer usuarios desde el archivo
const readUsers = () => {
  try {
    const data = fs.readFileSync(USERS_FILE);
    return JSON.parse(data);
  } catch {
    return [];
  }
};

// Escribir usuarios al archivo
const writeUsers = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

// Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.json({ success: true, rol: user.rol }); // 👈 devolvemos el rol
  } else {
    res.json({ success: false });
  }
});

// Registro
router.post('/register', (req, res) => {
  const { username, password, rol = "user" } = req.body;
  const users = readUsers();
  const exists = users.find(u => u.username === username);

  if (exists) {
    return res.json({ success: false, message: 'Usuario ya existe' });
  }

  users.push({ username, password, rol });
  writeUsers(users);
  res.json({ success: true });
});

export default router;
