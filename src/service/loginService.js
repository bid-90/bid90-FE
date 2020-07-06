import { config } from "../config/config"
import { NotificationManager} from 'react-notifications';

export const loginService={
    login,
    logout,
    isLogin,
    loginInfoUser
}
function responseHandler(response){
    
   if(response.ok){
        
        response.json().then(body => {
            
            sessionStorage.setItem('token', body.token)
            sessionStorage.setItem('name', body.user.name)
            sessionStorage.setItem('role', body.user.userRole)
            sessionStorage.setItem('email', body.user.email)
            NotificationManager.success('Success Login', body.user.name);
            window.location.reload();
        })
    }else{
        
        response.json().then(body => {
            NotificationManager.error(body.message, body.error, 3000);
        })
    }
 
}

async function login(email,password){
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password})
      };
      
    fetch(config.apiUrl+'/api/auth/login',requestOptions)
    .then(responseHandler)


    
}
function logout(){
    sessionStorage.clear();
    window.location.reload();
}
function loginInfoUser(){
    let email = sessionStorage.getItem('email');
    let name = sessionStorage.getItem('name');
    let role = sessionStorage.getItem('role');
    return {
        email,
        name,
        role
    
    }
}
function isLogin(){
    let token = sessionStorage.getItem('token');
    let email = sessionStorage.getItem('email');
    let name = sessionStorage.getItem('name');
    let role = sessionStorage.getItem('role');
    if(token !== null && email !== null && name !== null && role !== null){
        return true;
    }else{
        return false;
    }
}