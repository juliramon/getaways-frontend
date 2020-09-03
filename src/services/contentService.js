const {default: Axios} = require("axios");

class ContentService {
	constructor() {
		let service = Axios.create({
			baseURL: "http://localhost:5000/api/",
			withCredentials: true,
		});
		this.service = service;
	}
	activity = (type, title, subtitle, image, description, location, status) => {
		return this.service
			.post("/activity", {
				type,
				title,
				subtitle,
				image,
				description,
				location,
				status,
			})
			.then((res) => res.data);
	};

	activities = () => this.service.get("/activities").then((res) => res.data);

	userActivities = (id) =>
		this.service.get(`/users/${id}/activities`).then((res) => res.data);

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

	place = (type, title, subtitle, image, description, location, status) => {
		return this.service
			.post("/place", {
				type,
				title,
				subtitle,
				image,
				description,
				location,
				status,
			})
			.then((res) => res.data);
	};

	getAllPlaces = () => this.service.get("/places").then((res) => res.data);

	getPlaceDetails = (id) =>
		this.service.get(`/places/${id}`).then((res) => res.data);

	getUserPlaces = (id) =>
		this.service.get(`/users/${id}/places`).then((res) => res.data);

	removePlace = (id) =>
		this.service.delete(`/places/${id}`).then((res) => res.data);
}

export default ContentService;
