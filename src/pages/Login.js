import React from 'react'
import connectUser from "../Webservices"
import Swal from 'sweetalert2'
import { Redirect, Route, useHistory } from 'react-router-dom';

function Login() {

    let history = useHistory()

    if(sessionStorage.getItem('id') !== null){
        history.push("/maps")

    }
    const formSend = (e) =>{
        e.preventDefault();
        connectUser(e.target[0].value, e.target[1].value)
        .then((res)=>{
            if(res.message === "email"){
                Swal.fire({
                    title: 'Erreur!',
                    text: 'Email incorrect',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 1500
                })
            }else if(res.message === "password"){
                Swal.fire({
                    title: 'Erreur!',
                    text: 'Mot de passe incorrect',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 1500
                })
            }else if(res.message === "noexist"){
                Swal.fire({
                    title: 'Erreur!',
                    text: 'Ce compte n\'existe pas',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 1500
                })
            }else if(res.message === "succes"){
                sessionStorage.setItem('id', res.data.id);
                sessionStorage.setItem('profile', `${res.data.first_name} ${res.data.last_name}`);
                history.push("/maps")
            }
        })
    }

    return (
        <div className="login-container">
            <img src="./img/login/background-login.png" alt="background" className="background"/>
            <div className="bloc-container">
                <form action="" className="form" onSubmit={formSend} method="POST">
                    <input type="text" name="email" placeholder="Email"/>
                    <input type="password" name="password" placeholder="Mot de passe" className="password"/>
                    <div>
                        <div>
                            <input type="checkbox" id="check" placeholder="oui"/>
                            <label htmlFor="check">Se souvenir de moi</label>
                        </div>
                        <div>
                            <a href="http://localhost:3000/">Mot de passe oublié ?</a>
                        </div>
                    </div>
                    <button className="btn">Connexion</button>
                </form>
            </div>
        </div>
    )
}

export default Login
