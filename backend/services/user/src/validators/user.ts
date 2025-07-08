


const updateUserSchema = {
    type : "object" ,
    properties : {
        name : {type: "string" , minLength : 1},
        email : {type: "string" , format : 'email'},
        password : {type: "string"  ,  minLength : 2},
    },
    required : ['name' , 'email' , 'password'],
    additionalProperties: false

}



export { updateUserSchema };
