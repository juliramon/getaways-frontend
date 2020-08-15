const {default: Axios} = require("axios");

class AuthService {
	constructor() {
		let service = Axios.create({
			baseURL: "http://localhost:5000/api/",
			withCredentials: true,
		});
		this.service = service;
	}
	signup = (fullName, email, password) => {
		return this.service
			.post("/auth/signup", {fullName, email, password})
			.then((res) => res.data);
	};
	login = (username, password) => {
		return this.service
			.post("/auth/login", {username, password})
			.then((response) => response.data);
	};
	logout = () => this.service.post("/auth/logout", {}).then((res) => res.data);
}

export default AuthService;
