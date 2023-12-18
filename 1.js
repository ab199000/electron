let btn = document.querySelector('.btn')
let list = document.querySelector('.list')
let btnAdd = document.querySelector('.addUser')


async function updateUsers(){
    let result = await window.api.getUsers()
    list.innerHTML = '';

    for(let i = 0; i < result.length; i++){
        let p = document.createElement('p')
        p.textContent = `Name: ${result[i].name}, age: ${result[i].age} `
        list.append(p)
    }
}

async function addUser(){
    let id = document.querySelector('.id').value
    let name = document.querySelector('.name').value
    let age = document.querySelector('.age').value

    await window.api.createUser(parseInt(id), name, parseInt(age))
}

btn.addEventListener('click', updateUsers )

btnAdd.addEventListener('click', async () => {
    await addUser()
    updateUsers()
})