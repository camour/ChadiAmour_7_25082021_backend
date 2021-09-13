//removes '<', '>' tags to prevent app from XSS attacks
module.exports = (request, response, next) => {
    let ok = true;
    let input = '';
    for(let field of Object.keys(request.body)){
        request.body[field] = request.body[field].replace(/<\/?[^>]+(>|$)/g, "");
        if((request.body[field]) === ''){
            ok = false;
            input = field;
        }
    }
    if(!ok){
        response.status(400).json({message: 'invalid ' + input});
    }else{
        next();
    }    
}