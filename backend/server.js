const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const app = express();

const port = 8080;

const corsOptions = {
	origin: '*',
	methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
	credentiels: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extented: true}));

const pool = mysql.createPool({
	host: 'db',
	user: 'root',
	password: 'root_password',
	database: 'votre_db',
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0
});

app.get('/api/db-test', async (req, res) => {
	try {
		const [rows] = await pool.query('SELECT VERSION() AS version');

		res.status(200).json({
			message: 'Connexion a la base de donnees OK !',
			mysqlVersion: rows[0].version,
			dbHost: process.env.DB_HOST
		});
	} catch (error) {
		console.error("Erreur de connexion a la DB:", error);
		res.status(500).json({
			message: 'Erreur lors de la connexion a la base de donnees.',
			error: error.message
		});
	}
});

app.get('/api/test', (req, res) => {
	res.status(200).json({
		message: 'Donnees recues du Backend. Communication OK',
		timestamp: new Date().toISOString()
	});
});

app.get('/', (req, res) => {
	res.send('API Node.js/Express en cours d\'execution sur le port ' + port);
});

app.listen(port, () => {
	console.log(`Serveur Express minimaliste ecoutant sur le port ${port}`);
});