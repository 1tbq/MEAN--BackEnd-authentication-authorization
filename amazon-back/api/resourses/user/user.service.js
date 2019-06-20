const Joi = require('@hapi/joi');
export default{
    validateSchema(body){
        console.log('hi from validate schema');
        const schema = Joi.object().keys({
            email:Joi.string().email().required(),
            password:Joi.string().required()
       });
       const {error,value}=Joi.validate(body,schema);
       if(error && error.details){
           return {error};
        }
        console.log(value);
        return{value};
    },
};