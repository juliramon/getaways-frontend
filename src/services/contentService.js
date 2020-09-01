const {default: Axios} = require("axios");

class ContentService {
	constructor() {
		let service = Axios.create({
			baseURL: "http://localhost:5000/api/",
			withCredentials: true,
		});
		this.service = service;
	}
	activity = (title, subtitle, description, location, status) => {
		return this.service
			.post("/activity", {
				title,
				subtitle,
				description,
				location,
				status,
			})
			.then((res) => res.data);
	};

	activities = () => this.service.get("/activities").then((res) => res.data);

	userActivities = () =>
		this.service.get("/userActivities").then((res) => res.data);

	activityDetails = (id) =>
		this.service.get(`/activities/${id}`).then((res) => res.data);

	removeActivity = (id) =>
		this.service.delete(`/activities/${id}`).then((res) => res.data);

	editActivity = (_id, title, subtitle, description, location, status) =>
		this.service.put(`/activities/${_id}`, {
			title,
			subtitle,
			description,
			location,
			status,
		});

	uploadFile = (file) =>
		this.service.post("/upload", file).then((res) => res.data);

	getUserProfile = (id) =>
		this.service.get(`/users/${id}`).then((res) => res.data);

	editProfile = (_id, avatar, fullName, username, bio, location) =>
		this.service.put(`/users/${_id}`, {
			avatar,
			fullName,
			username,
			bio,
			location,
		});

	getAllUsers = () => this.service.get("/users").then((res) => res.data);
}

export default ContentService;
