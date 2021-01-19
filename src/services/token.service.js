
import jwt_decode from 'jwt-decode';


export function getTokenDetails(){
    let token = localStorage["token"] && localStorage["token"];
    if(!token){
        return null;
    } 
    return jwt_decode(token)
}
