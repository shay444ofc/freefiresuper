class InvalidAccountIDError extends Error{
    constructor(){
        super("The account id is invalid.");
        this.name = "InvalidAccountID"
    }
}

class InvalidMatchModeError extends Error{
    constructor(){
        super("The match mode is invalid.");
        this.name = "InvalidMatchMode"
    }
}

class InvalidGuildIDError extends Error{
    constructor(){
        super("The guild id is invalid.");
        this.name = "InvalidGuildID"
    }
}

class InvalidParamsError extends Error{
    constructor(){
        super("The parameters are invalid.");
        this.name = "InvalidParams"
    }
}
class InvalidSerialNoError extends Error{
    constructor(){
        super("The redeem code is invalid.");
        this.name = "InvalidSerialNo"
    }
}

class ForbiddenError extends Error{
    constructor(){
        super("Access to this web event has been denied.");
        this.name = "Forbidden"
    }
}

class NotFoundError extends Error{
    constructor(){
        super("Web event not found.");
        this.name = "NotFound";
    }
}

module.exports = {
    InvalidAccountIDError,
    InvalidMatchModeError,
    InvalidGuildIDError,
    InvalidParamsError,
    ForbiddenError,
    NotFoundError,
    InvalidSerialNoError
}