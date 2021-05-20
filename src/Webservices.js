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

const updateUrlRoom = (param,id) => {
    return new Promise((resolve,reject)=>{
        fetch(`http://neocial.local/updateroom`,{ 
            method: "POST",
            mode:'no-cors',
            headers: {
                // 'Content-type': 'application/json; charset=UTF-8',
                // 'Access-Control-Allow-Origin': '*',
                // 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
                // 'Access-Control-Allow-Headers':'X-Requested-With',
                'Content-Type': 'application/x-www-form-urlencoded'

            },
            body:`id_room=${id}&new_url=${param}`
        })
        .then((res)=>{ res.json().then((data)=>{
            resolve(data)
        })
        })
    }
)}

const getAllCourse = () => {
    return new Promise((resolve,reject)=>{
        fetch((`http://neocial.local/room`))
        .then((res)=>{ res.json().then((data)=>{
            resolve(data)
        })
        })
    }
)}



export { connectUser, printCourse, updateUrlRoom, getAllCourse }