const validation = (firstname, lastname, username, email, password) => {
    const name_pattern = /^[a-zA-Z]+$/
    const username_pattern = /^[a-zA-Z0-9]+$/
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    
    if(firstname === "") {
        alert("First name should not be empty")
    }
    else if(lastname === "") {
        alert("Last name should not be empty")
    }
    else if(username === "") {
        alert("Username should not be empty")
    }
    else if(email === "") {
        alert("Email should not be empty")
    }
    else if(password === "") {
        alert("Password should not be empty")
    }
    else if(!name_pattern.test(firstname)) {
        alert("Register Failed!")
    }
    else if(!name_pattern.test(lastname)) {
        alert("Register Failed!")
    }
    else if(!username_pattern.test(username)) {
        alert("Register Failed!")
    }
    else if(!email_pattern.test(email)) {
        alert("Register Failed!")
    }
    else if(!password_pattern.test(password)) {
        alert("Register Failed!")
    }
    else {
    }

}