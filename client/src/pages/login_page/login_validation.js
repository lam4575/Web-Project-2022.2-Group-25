const validation = (username, password) => {
    const username_pattern = /^[a-zA-Z0-9]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    
    if(username === "") {
        alert("Username should not be empty")
    }
    else if(password === "") {
        alert("Password should not be empty")
    }
    else if(!username_pattern.test(username)) {
        alert("Register Failed!")
    }
    else if(!password_pattern.test(password)) {
        alert("Register Failed!")
    }
    else {
    }

}