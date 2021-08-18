import history from '../History/History';

let cookieCheck = true;
//Verify if cookie exist and match a session in the cookiestore
export const getCookie = async () => {
    if (cookieCheck) {
        cookieCheck = false;
        let response = await fetch('http://localhost:5000/cookie', {
            credentials : "include",
        }).then(res => res.json())
        
        if (response) {
            cookieCheck = true;
            setTimeout(() => {
                cookieCheck = true;
            }, 2000);
            return response;
        } 
    }
    else console.log('slow down on requests....');
}

export const logOut = async () => {
    let response = await fetch('http://localhost:5000/logout', {
        method: 'GET',
        credentials : "include"
    }).then(res => res);
    if (response) {
        history.replace('/');
        return {logged : false, user : []};
    }
}

//rgx .........

//sanitize fields .....
export const saniMail = (e) => {
    //sanitize input
    let validMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let value = e.target.value.toString();
    if (validMail.test(value)) return {error : false, errorTxt : "", val : value}; 
    else return {error : true, errorTxt : "Not a valid email", val : value};
}

export const saniPwd = (e) => {
    let value = e.target.value.toString();
    if (value.length > 6) {
        if (value === "test") return {error : true, errorTxt : "Username should have more than 4 chars", val : value}
        else return {error : false, errorTxt : "", val : value};
    } 
    else return {error : true, errorTxt : "Username should have more than 4 chars", val : value}
}
