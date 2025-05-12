
const loginSchema = {
    type : "object" ,
    properties : {
        username : {type: "string"},
        password : {type: "string" },
    },
    required : ['username' , 'password'],
    additionalProperties: false

    
}


const signupSchema = {
    type : "object" ,
    properties : {
        fname : {type: "string"},
        lname : {type: "string"},
        username : {type: "string"},
        email : {type: "string" , format : 'email'},
        password : {type: "string" },
    },
    required : ['fname' , 'lname' , 'username' , 'email' , 'password'],
    additionalProperties: false

}



module.exports = {loginSchema , signupSchema};