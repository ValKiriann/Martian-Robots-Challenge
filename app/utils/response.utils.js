class Response{
    constructor(statusCode){
       this.statusCode = statusCode;
       this.errors = [];
       this.data;
    }
   
}

exports.success = function (req, res, message, status) {
    let response = new Response(status || 200);
    response.data = message || {};
    res.status(response.statusCode).send(response);
}

exports.errors = function (req, res, errors) {
    let response = new Response(0);
    response.data = {};

    if (Array.isArray(errors)) {
        for (let i = 0; i < errors.length; i++) {
            response.errors.push({
                errorCode: errors[i].errorCode,
                errorData: errors[i].errorData
            });
            if (errors[i].statusCode > response.statusCode) {
                response.statusCode = errors[ index ].statusCode;
            }
        }
    }else {
        response.statusCode = errors.statusCode;
        response.errors = [
            {
                errorCode: errors.errorCode,
                errorData: errors.errorData
            }
        ];
    }   

    res.status(response.statusCode).send(response);
}