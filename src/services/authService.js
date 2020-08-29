const {default: Axios} = require("axios");

class AuthService {
	constructor() {
		let service = Axios.create({
			baseURL: "http://localhost:5000/api/",
			withCredentials: true,
		});
		let error, response;
		service.interceptors.response.use(
			(response) => {
				console.log(response.data);
				return (this.response = response.data);
			},
			(error) => {
				if (error.response.status >= 400 && error.response.status <= 500) {
					this.error = {
						message: error.response.data.message,
						status: error.response.status,
					};
				} else {
					return Promise.reject(error);
				}
			}
		);
		this.service = service;
		this.error = error;
		this.response = response;
	}

	signup = (fullName, email, password) => {
		return this.service
			.post("/auth/signup", {fullName, email, password})
			.then(() => {
				if (this.error === undefined) {
					console.log(this.response);
					return this.response;
				} else {
					console.log(this.error);
					return this.error;
				}
			});
	};
	login = (username, password) => {
		return this.service.post("/auth/login", {username, password}).then(() => {
			if (this.error === undefined) {
				console.log(this.response);
				return this.response;
			} else {
				console.log(this.error);
				return this.error;
			}
		});
	};
	logout = () => this.service.post("/auth/logout", {}).then((res) => res.data);
}

export default AuthService;
