



const account = document.getElementById("account");
const profile = document.getElementById("profile");



function translate_profile()
{
  profile.classList.add("z-2")
}


// form data

const FormSignup = document.getElementById("FormSignup");
const FormVerify = document.getElementById("FormVerify");
const FormLogin = document.getElementById("FormLogin");

  function signup(e) 
  {
      e.preventDefault(); // for  not reload page html 

      const form = e.target;
      const formData = new FormData(form);
      
      const jsonData = {};
      formData.forEach((value, key) => {
        jsonData[key] = value;
      });


      fetch("http://localhost:4000/signup", { method: "POST", headers: {   "Content-Type": "application/json" }, body: JSON.stringify(jsonData) })
      .then(async response => {
        if (!response.ok)
            translate_signup();
          else
            translate_verify();
      })
      .catch(error => {
      });
  }



  function verify(e) 
  {
      e.preventDefault(); // for  not reload page html 

      const form = e.target;
      const formData = new FormData(form);
      
      const jsonData = {};
      formData.forEach((value, key) => {
        jsonData[key] = value;
      });


      fetch("http://localhost:4000/verification", { method: "POST", headers: {   "Content-Type": "application/json" }, body: JSON.stringify(jsonData) })
      .then(async response => {
        if (!response.ok)
            translate_verify();
          else
            translate_login();
      })
      .catch(error => {
      });
  }

  
  
  function login(e) 
  {
      e.preventDefault(); 

      const form = e.target;
      const formData = new FormData(form);
      
      const jsonData = {};
      formData.forEach((value, key) => {
        jsonData[key] = value;
      });


      fetch("http://localhost:4000/login", { method: "POST", headers: {   "Content-Type": "application/json" }, body: JSON.stringify(jsonData) })
      .then(async response => {
        if (!response.ok)
            translate_login();
          else
            translate_profile();
      })
      .catch(error => {
      });
  }
  

  FormSignup.addEventListener("submit", signup);
  FormVerify.addEventListener("submit", verify);
  FormLogin.addEventListener("submit", login);






  // translate divs
  
  const log  = document.getElementById("login");
  const sign  = document.getElementById("signup");
  const forg = document.getElementById("forget");
  const verf = document.getElementById("verify");

  function translate_login()
  {
    log.classList.remove("translate-x-[100%]");
    sign.classList.add("translate-x-[100%]")
    forg.classList.add("translate-x-[100%]")
    verf.classList.add("translate-x-[100%]")
  }
  

  function translate_verify()
  {
    verf.classList.remove("translate-x-[100%]")
    log.classList.add("translate-x-[100%]");
    sign.classList.add("translate-x-[100%]");
    forg.classList.add("translate-x-[100%]");
  }

  function translate_forget()
  {
    forg.classList.remove("translate-x-[100%]")
    log.classList.add("translate-x-[100%]");
    sign.classList.add("translate-x-[100%]");
    verf.classList.add("translate-x-[100%]");
  }
  
  function translate_signup()
  {
    sign.classList.remove("translate-x-[100%]");
    log.classList.add("translate-x-[100%]")
    forg.classList.add("translate-x-[100%]")
    verf.classList.add("translate-x-[100%]")
  }

