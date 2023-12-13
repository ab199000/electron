const { app, BrowserWindow } = require('electron')
const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    password: '0000',
    host: 'localhost',
    port: 5432,
    database: 'Test',
    });

client.connect();
client.query('SELECT * FROM Users', (err, res) => {
if (err) throw err;
    console.log(res.rows);
    client.end();
});



const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

})