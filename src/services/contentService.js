const {default: Axios} = require("axios");

class ContentService {
	constructor() {
		let service = Axios.create({
			baseURL: "http://localhost:5000/api/",
			withCredentials: true,
		});
		this.service = service;
	}

	// ACTIVITIES ENDPOINTS

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

	// FILES ENDPOINTS

	uploadFile = (file) =>
		this.service.post("/upload", file).then((res) => res.data);

	// USERS ENDPOINTS

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

	// PLACES ENDPOINTS

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

	editPlace = (_id, title, subtitle, description, location, status) =>
		this.service.put(`/places/${_id}`, {
			title,
			subtitle,
			description,
			location,
			status,
		});

	getUserPlaces = (id) =>
		this.service.get(`/users/${id}/places`).then((res) => res.data);

	removePlace = (id) =>
		this.service.delete(`/places/${id}`).then((res) => res.data);

	// STORIES ENDPOINTS

	story = (type, title, subtitle, image, description) => {
		return this.service
			.post("/story", {
				type,
				title,
				subtitle,
				image,
				description,
			})
			.then((res) => res.data);
	};

	getAllStories = () => this.service.get("/stories").then((res) => res.data);

	getStoryDetails = (id) =>
		this.service.get(`/stories/${id}`).then((res) => res.data);

	getUserStories = (id) =>
		this.service.get(`/users/${id}/stories`).then((res) => res.data);

	editStory = (_id, title, subtitle, description, location, status) =>
		this.service.put(`/stories/${_id}`, {
			title,
			subtitle,
			description,
			location,
			status,
		});

	removeStory = (id) =>
		this.service.delete(`/stories/${id}`).then((res) => res.data);
}

export default ContentService;
