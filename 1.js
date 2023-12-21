// let btn = document.querySelector('.btn')
// let list = document.querySelector('.list')
// let btnAdd = document.querySelector('.addUser')


// async function updateUsers(){
//     let result = await window.api.getUsers()
//     list.innerHTML = '';

//     for(let i = 0; i < result.length; i++){
//         let p = document.createElement('p')
//         p.textContent = `Name: ${result[i].name}, age: ${result[i].age} `
//         list.append(p)
//     }
// }

// async function addUser(){
//     let id = document.querySelector('.id').value
//     let name = document.querySelector('.name').value
//     let age = document.querySelector('.age').value

//     await window.api.createUser(parseInt(id), name, parseInt(age))
// }

// btn.addEventListener('click', updateUsers )

// btnAdd.addEventListener('click', async () => {
//     await addUser()
//     updateUsers()
// })


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

async function loginUser(login, password){
    return await window.api.autorizationUser(login.trim(), password.trim())
}

function showProfil(user){
    const window = document.querySelector('.profilUser')
    window.classList.remove('hide')
    window.innerHTML = `
    <h2>Profil: ${user.fio}</h2>
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
    showProfil(user[0])
    windowAut.classList.remove('hide')
})

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