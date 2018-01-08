let validator = {
    data: {},
    types: {}, 
    messages: [],
    config: {},

    validate: function(data = this.data) {
        let i, msg, type, checker, result;
        this.messages = [];

        for(i in data) {
            if(data.hasOwnProperty(i)) {

                type = this.config[i];
                checker = this.types[type];

                if(!type)
                    continue;
                
                if(!checker) {
                    throw new Error({
                        name: "ValidatorError",
                        message: "No handler to validate type " + type,
                    })
                }
                
                result = checker.validate(data[i]);
                if(!result) {
                    msg = "Invalid value for " + i + ", instruction:" + checker.instruction;
                    this.messages.push(msg);
                }
            }
        }

        return this.hasError();
    },

    hasError: function() {
        return this.messages.length !== 0;
    }
}

validator.types.isNonEmpty = {
    validate: function(value) {
        return value !== "";
    },
    instruction: "The value cannot be empty",
}

validator.types.isNumber = {
    validate: function(value) {
        return !isNaN(value);
    },
    instruction: "The value can only be a valid number",
}

export default validator;
