const connectUser = (email, password) =>{
    return new Promise((resolve, reject)=>{
        fetch(`http://neocial.local/user?email=${email}&password=${password}`)
        .then(res=>res.json())
        .then((data)=>{
            resolve(data)
        })
    })
}


const printCourse = (id) => {
    return new Promise((resolve,reject)=>{
        fetch((`http://neocial.local/course/user/?id_user=${id}`))
        .then((res)=>{ res.json().then((data)=>{
            resolve(data)
        })
        })
    }
)}

export { connectUser, printCourse }