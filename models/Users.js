class Users{

	constructor() {
		this.users = [];
	}

	agregarUsuario(id, nombre){
		let usuario = {id, nombre}	
		this.users.push(usuario)
		return this.users;
	}

	getUsuarios (){
		return this.users
	}

	getUsuario(id){
		let usuario = this.users.filter( user => user.id == id)[0]
		return usuario
	}

	borrarUsuario(id){
		let usuarioBorrado = this.getUsuario(id)
		this.users = this.users.filter( user => user.id!= id)
		return usuarioBorrado
	}

	getDestinatario(nombre){
		let destinatario = this.users.filter(user => user.nombre == nombre)[0]
		return destinatario
		}
}


module.exports = {
	Users
}
