const mysql = require('../../../plugins/mysql');

class User {
    constructor(user) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.dni = user.dni;
        this.created_at = user.created_at;
        this.updated_at = user.updated_at;
    }

    getApiResource() {
        return {
            id: this.id,
            nombre: this.name,
            correo: this.email,
            dni: this.dni,
            creadoEn: this.created_at,
            editadoEn: this.updated_at,
        }
    }
}

const getAll = async () => {
    await mysql.connectDB()

    const query = 'SELECT * FROM users';

    const [data] = await mysql.execute(query);

    const users = data.map(user => new User(user))

    return users;
}



module.exports = {
    getAll,
    User
}