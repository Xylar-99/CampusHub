
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
        username : {type: "string"},
        email : {type: "string" , format : 'email'},
        password : {type: "string" },
    },
    required : ['username' , 'email' , 'password'],
    additionalProperties: false

}


const detailsSchema = {
    type : "object" ,
    properties : {
        fullname : {type: "string"},
        bio      : {type: "string"},
        location : {type: "string"},
        phone    : {type: "string" , format : 'email'},
    },
    required : ['fname' , 'lname' , 'username' , 'email' , 'password'],
    additionalProperties: false

}


module.exports = {loginSchema  , detailsSchema, signupSchema};