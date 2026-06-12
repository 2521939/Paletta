const { Pool } = require('pg');
const pool = new Pool({
host: 'localhost',
database: 'postgres', // ajuste se necessário
port: 5432,
user: 'postgres', // ajuste se necessário
password: 'aluno', // ajuste se necessário
ssl: false
});
pool.on('error', (err) => {
console.error('Unexpected error on idle client', err);
process.exit(-1);
});
pool.on('connect', () => {
console.log('Connected to the PostgreSQL database');
});
module.exports = pool;