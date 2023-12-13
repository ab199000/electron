let btn = document.querySelector('.btn')
btn.addEventListener('click', async ()=>{

    let result = await window.api.getUsers()
    console.log(result)

    for(let i = 0; i < result.length; i++){
        let p = document.createElement('p')
        p.textContent = `Name: ${result[i].name}, age: ${result[i].age} `
        document.body.append(p)
    }
})

let btnAdd = document.querySelector('.addUser')
btnAdd.addEventListener('click', async () => {

    let id = document.querySelector('.id').value
    let name = document.querySelector('.name').value
    let age = document.querySelector('.age').value

    await window.api.createUser(parseInt(id), name, parseInt(age))
})