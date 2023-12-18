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

const createUser = async (id,name,age) => {
    let client = await connectClient()
    await client.query(`Insert into Users values (${id}, '${name}', ${age})`);
    await client.end();
}
contextBridge.exposeInMainWorld('api', {
    getUsers,
    createUser
})

