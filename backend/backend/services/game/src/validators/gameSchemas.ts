

const moveSchema = {
    type : "object" ,
    properties : {
        name : {type: "string" , minLength : 1},
        email : {type: "string" , format : 'email'},
        password : {type: "string"  ,  minLength : 2},
    },
    required : ['name' , 'email' , 'password'],
    additionalProperties: false

}


const startGameSchema = {
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


export { moveSchema, startGameSchema };
