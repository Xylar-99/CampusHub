

const loginSchema = {
    type : "object" ,
    properties : {
        email : {type: "string" , format : 'email'},
        password : {type: "string" ,  minLength : 4 },
    },
    required : ['email' , 'password'],
    additionalProperties: false
}


const signupSchema = {
    type : "object" ,
    properties : {
        fname : {type: "string"},
        lname : {type: "string"},
        username : {type: "string"},
        email : {type: "string" , format : 'email'},
        password : {type: "string"  ,  minLength : 6},
    },
    required : ['email' , 'username' , 'fname' , 'lname' , 'password'],
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



const verifyEmailSchema = {
    type : "object" ,
    properties : {
        email : {type: "string" , format : 'email'},
        code : {type: "string" ,  minLength : 2 },
    },
    required : ['email' , 'code'],
    additionalProperties: false

    
}

export { loginSchema  , verifyEmailSchema , signupSchema, detailsSchema };
