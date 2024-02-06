const { Client } = require('pg');
const {contextBridge} = require('electron')

async function connectClient(){
    const client = await new Client({
        user: 'postgres',
        password: '0000',
        host: 'localhost',
        port: 5432,
        database: 'Test',
    });

    await client.connect();
    return client
}



const getUsers = async () => {
    let client = await connectClient()
    let Users = await client.query('SELECT * FROM users');
    await client.end();
    return Users.rows
}

const getEmployers = async () => {
    let client = await connectClient()
    let Employers = await client.query('SELECT id_user, fio FROM users where id_role = 2');
    await client.end();
    return Employers.rows
}

const createUser = async (fio,login,password,phone,pasport,mail,address,birthday) => {
    let client = await connectClient()
    await client.query(`insert into users (fio,login,password,phone,pasport,mail,address,birthday) 
    values('${fio}','${login}','${password}','${phone}','${pasport}','${mail}','${address}','${birthday}');`);
    await client.end();
    return true
}

const createRequest = async (name_equipment, defect_type, description, id_client)=>{
    let client = await connectClient()
    await client.query(`insert into requests (name_equipment, defect_type, description, id_client, status, work_status) 
    values('${name_equipment}','${defect_type}','${description}','${id_client}','0','0');`);
    await client.end();
    return true
}

const autorizationUser = async (login, password) => {
    let client = await connectClient()
    let User = await client.query(`select * from users where login = '${login}' and password = '${password}'`);
    await client.end();
    console.log(User.rows);
    return User.rows
}

const listTypes = async () =>{
    let client = await connectClient()
    let types = await client.query(`select * from defects_types`)
    await client.end()
    return types.rows
}


const listReq = async () =>{
    let client = await connectClient()
    let requests = await client.query(`select requests.id_request, requests.name_equipment, requests.defect_type, requests.description, requests.id_client, requests.status, requests.work_status, requests.employer, defects_types.name_defecte from requests, defects_types where requests.defect_type = defects_types.id_defecte`)
    await client.end()
    return requests.rows
}

const listReqUser = async (idUser) =>{
    let client = await connectClient()
    let requests = await client.query(`select requests.name_equipment, requests.defect_type, requests.description, requests.id_client, requests.status, requests.work_status, requests.employer, defects_types.name_defecte, requests.date_create from requests, defects_types where requests.defect_type = defects_types.id_defecte and requests.id_client = ${idUser}`)
    await client.end()
    return requests.rows
} 

const confirmRequest = async (idEmploer, idReq) => {
    let client = await connectClient()
    await client.query(`update requests set employer = ${idEmploer}, status = '1', work_status='1'  where id_request = ${idReq}`)
    await client.end()
}

const listDefects = async() =>{
    let client = await connectClient()
    let list = await client.query("select name_defecte, count(defect_type) from requests, defects_types where defects_types.id_defecte = requests.defect_type group by name_defecte")
    let total = await client.query("select count(defect_type) from requests")
    await client.end()
    return {list: list.rows, total: total.rows[0]}
}

const listReqMaster = async(idMaster) =>{
    let client = await connectClient()
    let list = await client.query(`select id_request, work_status, name_equipment, description, name_defecte from requests, defects_types where id_defecte = defect_type and  employer = ${idMaster}`)
    await client.end()
    return list.rows
}

const reqExecuted = async(idReq)=>{
    let client = await connectClient()
    await client.query(`update requests set work_status='2' where  id_request = ${idReq}`)
}


contextBridge.exposeInMainWorld('api', {
    getUsers,
    createUser,
    autorizationUser,
    listTypes,
    createRequest,
    listReq,
    getEmployers,
    listReqUser,
    confirmRequest,
    listDefects,
    listReqMaster,
    reqExecuted
})

