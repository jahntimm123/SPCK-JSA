

function switchToSignUp() {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("signup-form").style.display = "block";
  }
  
  function switchToLogin() {
    document.getElementById("signup-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";
  }

  function signup() {
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;
  
    let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
  
    const userExists = accounts.some(account => account.username === username);
    if (userExists) {
      alert("User already exists. Please use another username.");
    } else {
      const newUser = {
        username: username,
        password: password,
        userId: generateUserID(), 
        myProducts: []
      };
  
      accounts.push(newUser);
      localStorage.setItem("accounts", JSON.stringify(accounts));
      localStorage.setItem("loggedInUser", username);
      alert("Account created and logged in.");
      window.location.href = "homepage.html";
    }
  }
  
  function generateUserID() {
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  

  function login(){
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    const user = accounts.find(account => account.username === username);

    if(user){
        localStorage.setItem("loggedInUser", username);
        alert("Logged in successfully");
        window.location.href = "homepage.html";

    }else{
        alert("No account found, please try again");
    }
  }
  function logout() {
    
    localStorage.removeItem('loggedInUser');
  
    
    window.location.href = 'index.html';
  }

