class User {
    constructor(name, email, password, dni) {
        this.id = null;
        this.name = name;
        this.email = email;
        this.password = password;
        this.dni = dni;
        this.created_at = null;
        this.updated_at = null;
    }

    get() {
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

module.exports = User