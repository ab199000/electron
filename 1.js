let role
let id
async function createListTypes(){
    let selectTypes = document.querySelector(".defectType")

    let list = await window.api.listTypes()

    for(let i = 0; i<=list.length; i++){
        let option = document.createElement("option")
        option.value = list[i].id_defecte
        option.innerHTML = list[i].name_defecte
        selectTypes.append(option)
    }
}
// createListTypes()

function clearInputs(block){
    const inputs = block.querySelectorAll('input')
    inputs.forEach(element => {
        element.value = ''
    });
}

function normalDate(strintDate){
    let date = new Date(strintDate).toUTCString()
    let normalDate = `${new Date(date).getDate().toString()}.${(new Date(date).getMonth()+1).toString()}.${new Date(date).getFullYear().toString()}`
    return normalDate
}

function getRole(role){
    if(role == 1){
        return 'Admin'
    }
    else if(role == 2){
        return 'Менеджер'
    }
    else{
        return 'Простой чел'
    }
}

async function loginUser(login, password){
    return await window.api.autorizationUser(login.trim(), password.trim())
}

function showProfil(user){
    const window = document.querySelector('.profilUser')
    window.classList.remove('hide')
    
    window.innerHTML = `
    <h2>Profil: ${user.fio} Вы ${getRole(user.id_role)}</h2>
    <p>pasport: ${user.pasport}</p>
    <p>birthday: ${normalDate(user.birthday)}</p>
    <p>address: ${user.address}</p>
    <p>mail: ${user.mail}</p>
    `
}

const btnRegWindow = document.querySelector('.btnRegWindow') 
btnRegWindow.addEventListener('click',()=>{
    const windowAuth = document.querySelector('.autoriz')
    const windowReg = document.querySelector('.registrat')
    windowAuth.classList.add('hide')
    windowReg.classList.remove('hide')
    clearInputs(windowAuth)
})


const btnAuthWindow = document.querySelector('.btnGoRegWindow') 
btnAuthWindow.addEventListener('click',()=>{
    
    windowReg.classList.add('hide')
    windowAuth.classList.remove('hide')
    clearInputs(windowReg)
})

const btnAuthorization = document.querySelector('.btnlogin')
btnAuthorization.addEventListener('click', async()=>{
    const login = document.querySelector('.loginAut').value
    const password = document.querySelector('.passwordAut').value
    const windowAut = document.querySelector('.autoriz')
    if(!(login && password)){
        return alert('Заполните поля')
    }
    const user = await loginUser(login, password)
    if(!user){
        return alert('Ошибка входа')
    }
    else{
        role = user[0].id_role
        id = user[0].id_user
        alert(`You  ${role}`)
        if(role == 1){
            Admin()
        }
        else if(role == 3){
            LightChel()
        }
        else{
            Menedger()
        }
        showWindow('exit')
    }
    showProfil(user[0])
    windowAut.classList.add('hide')
})

async function Admin(){
    let createReq = document.querySelector('.admin')
    createReq.classList.remove('hide')
    let list = await window.api.listReq()

    let ul = document.querySelector('.listActivReqOk')
    for (let i = 0; i < list.length; i++) {
        let li = document.createElement("li")
        li.innerHTML = `
        <p>${list[i].name_equipment}</p>
        <p>${list[i].description}</p>
        <p>${list[i].name_defecte}</p>
        `
        if(!list[i].employer){
            let p = document.createElement("p")
            p.textContent='Назначьте исполнителя'
            let btnCompl = document.createElement("button")
            btnCompl.textContent = 'Подтвердить заявку'

            let listEmloyers = await window.api.getEmployers()
            let select = document.createElement('select')
            for(let j = 0; j<listEmloyers.length; j++){
                let option = document.createElement("option")
                option.value = listEmloyers[j].id_user
                option.innerHTML = listEmloyers[j].fio
                select.append(option)
            }
            li.append(p, btnCompl, select)
        } 
        ul.append(li)
    }
}

function LightChel(){
    let createReq = document.querySelector('.lightChel')
    createReq.classList.remove('hide')
    createListTypes()
}
function Menedger(){}

function showWindow(nameClass){
    const element = document.querySelector(`.${nameClass}`)
    element.classList.remove('hide')
}

function hideWindow(nameClass){
    const element = document.querySelector(`.${nameClass}`)
    element.classList.add('hide')
}

const btnRegistrat = document.querySelector('.btnReg')
btnRegistrat.addEventListener('click', async ()=>{
    const windowAuth = document.querySelector('.autoriz')
    const windowReg = document.querySelector('.registrat')
    const fio = document.querySelector('.fio').value
    const login = document.querySelector('.loginReg').value
    const password = document.querySelector('.passwordReg').value
    const phone = document.querySelector('.telReg').value
    const pasport = document.querySelector('.pasportReg').value
    const mail = document.querySelector('.mailReg').value
    const address = document.querySelector('.addressReg').value
    const birthday = document.querySelector('.birthdayReg').value

    let createUser = await window.api.createUser(fio,login,password,phone,pasport,mail,address,birthday)

    if(!createUser){
        return console.log('ошибка');
    }
    
    windowAuth.classList.remove('hide')
    windowReg.classList.add('hide')
    clearInputs(windowAuth)
})

const btnCreateReq = document.querySelector('.btnCreateReq') 
btnCreateReq.addEventListener('click', async()=>{
    const inputName = document.querySelector('.inpDetails')
    const inputType = document.querySelector('.defectType')
    const inputDescription = document.querySelector('.inpDesc')
    if(!(inputName.value&&inputType.value&&inputDescription.value)){
        return
    }
    await window.api.createRequest(inputName.value,inputType.value,inputDescription.value,id)
    console.log('ok');
})

const btnExit = document.querySelector('.btnExit')
btnExit.addEventListener('click',()=>{
    let boxBtn = document.querySelector('.exit')
    boxBtn.classList.remove('hide')
    location.reload()
})