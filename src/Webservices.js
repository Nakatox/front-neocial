export function connectUser(email, password){
    return new Promise((resolve, reject)=>{
        fetch(`http://neocial.local/user?email=${email}&password=${password}`)
        .then(res=>res.json())
        .then((data)=>{
            resolve(data)
        })
    })
}

export default connectUser