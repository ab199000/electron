const { Client } = require('pg');
const {contextBridge} = require('electron')

async function connectClient(){
    const client = await new Client({
        user: 'postgres',
        password: '1234',
        host: 'localhost',
        port: 5432,
        database: 'Test',
    });

    await client.connect();
    return client
}



const getUsers = async () => {
    let client = await connectClient()
    let Users = await client.query('SELECT * FROM Users');
    await client.end();
    return Users.rows
}

const createUser = async (fio,login,password,phone,pasport,mail,address,birthday) => {
    let client = await connectClient()
    await client.query(`insert into clients (fio,login,password,phone,pasport,mail,address,birthday) 
    values('${fio}','${login}','${password}','${phone}','${pasport}','${mail}','${address}','${birthday}');`);
    await client.end();
    return true
}

const autorizationUser = async (login, password) => {
    let client = await connectClient()
    let User = await client.query(`select * from clients where login = '${login}' and password = '${password}'`);
    await client.end();
    console.log(User.rows);
    return User.rows
}


contextBridge.exposeInMainWorld('api', {
    getUsers,
    createUser,
    autorizationUser
})

