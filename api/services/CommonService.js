module.exports = {

    Errors: {
        ResponseError: class ResponseError extends Error {

            constructor(responseFn, messageJson, message){
                super(message);
                this.responseFn = responseFn;
                this.messageJson = messageJson;
            }

            doit(){
                return this.responseFn(this.messageJson);
            }

        }
    }

}
