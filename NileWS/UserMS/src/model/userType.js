class User {
    constructor ( obj ) {
        this.id = obj.id;
        this.email = obj.email;
        this.password = obj.password;
        this.phoneNumber = obj.phoneNumber;
        this.address = obj.address;
    }
}

module.exports = User;
