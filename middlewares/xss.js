//removes '<', '>' tags to prevent app from XSS attacks

const checkXSS = (object) => {
    for(let field of Object.keys(object)){
        if((typeof object[field]) === 'object'){
            checkXSS(object[field]);
        }
        else if((typeof object[field]) === 'string'){
            object[field] = object[field].replace(/<\/?[^>]+(>|$)/g, "");
        }       
    }
}

module.exports = (request, response, next) => {
    
    if(request.body){
        checkXSS(request.body);
    }
    if(request.params){
        checkXSS(request.params);
    }
    next();  
}

