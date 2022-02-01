export function CanAccess(){
    let token = window.localStorage.getItem("token");
    if(token == null)
        token = window.sessionStorage.getItem("token");
    return token == null? false: true;
}