const express = require('express');
const bodyParser = require('body-parser');
const socketio = require('socket.io');
require('dotenv').config();
const pgp = require('pg-promise')();
const os = require('os');
const bcrypt = require('bcrypt');
const multer = require('multer');
const cookieParser = require('cookie-parser');

const app = express();

// Configuration PostgreSQL
const db = pgp({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

// Middleware
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', async (req, res) => {
    const info_count = await db.one('SELECT count(*) FROM Information');
    res.render('index', {nb_info: info_count.count});
    // res.redirect('/index');
});

// app.get('/index', async (req, res) => {
//     const info_count = await db.one('SELECT count(*) FROM Information');
//     res.render('index', {nb_info: info_count.count});
// });

app.get('/login', (req, res) => {
    res.render('login', {error: ''});
});

app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const user = await db.oneOrNone('SELECT * FROM utilisateur WHERE email=$1 AND password =$2', [email, password]);
    if(user) {
        const userPas = await db.oneOrNone('SELECT * FROM administrateur WHERE id_user=$1', [user.id]);
        res.render('user_page', {name: userPas.prenom, lastName: userPas.nom, code_admin: userPas.code_admin});
    } else {
        res.render('login', {error: '!!! email ou mot de passe incorrecte. Veillez réessayer !'});
    }
});

// app.get('/register', (req, res) => {
//     res.render('login', {error: ''});
// });

app.post('/register', (req, res) => {
    const lastName = req.body.lastName;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    let user = User.getUserByEmail(email);
    if(user) {
        res.render('login', {error: '!!! Vous existez déjà'});
    } else {
        user = User.addUser(name, lastName, email, password);
        userPas = User.addStudent(
            'code', name, lastName,
            email, '', '',
            '', user.id
        );
        res.redirect('/');
    }
});

app.get('/info', async (req, res) => {
    res.render('info');
});

app.get('/api/info', async (req, res) => {
    const info = await db.any('SELECT * FROM Information ORDER BY date_envoie DESC');
    res.json(info);
});

// Partage lien
// Récupérer toutes les interfaces réseau
const networkInterfaces = os.networkInterfaces();

// Parcourir les interfaces pour trouver l'adresse IPv4
let ipv4 = 'Adresse IPv4 non trouvée';
exports.ipv4 = ipv4;
Object.keys(networkInterfaces).forEach((interfaceName) => {
  networkInterfaces[interfaceName].forEach((interfaceInfo) => {
    if (interfaceInfo.family === 'IPv4' && !interfaceInfo.internal) {
      ipv4 = interfaceInfo.address;
    }
  });
});

console.log('Adresse IPv4 du serveur :', ipv4);

const server = app.listen(3000, '0.0.0.0', () => 
    console.log('listening on port 3000')
);

// Socket.IO
const io = socketio(server);

io.on('connection', (socket) => {
  console.log('Un utilisateur est connecté');
  socket.on('disconnect', () => {
    console.log('Un utilisateur est déconnecté');
  });
});