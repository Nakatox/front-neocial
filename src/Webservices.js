export function connectUser(email, password){
    return new Promise((resolve, reject)=>{
        fetch('http://neocial.local/login',
            {
                method:'POST',
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: "email=" + email + "&password=" + password,
            }
        )
        .then(res=>res.json())
        .then((data)=>{
            resolve(data)
        })
    })
}

export default connectUser