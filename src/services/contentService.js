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

	activity = (
		type,
		title,
		subtitle,
		image,
		description,
		phone,
		website,
		activity_location_full_address,
		activity_location_locality,
		activity_location_administrative_area_level,
		activity_location_country,
		activity_location_lat,
		activity_location_lng,
		activity_rating,
		activity_place_id,
		activity_opening_hours,
		duration,
		price
	) => {
		return this.service
			.post("/activity", {
				type,
				title,
				subtitle,
				image,
				description,
				phone,
				website,
				activity_location_full_address,
				activity_location_locality,
				activity_location_administrative_area_level,
				activity_location_country,
				activity_location_lat,
				activity_location_lng,
				activity_rating,
				activity_place_id,
				activity_opening_hours,
				duration,
				price,
			})
			.then((res) => res.data);
	};

	activities = () => this.service.get("/activities").then((res) => res.data);

	userActivities = (id) =>
		this.service.get(`/users/${id}/activities`).then((res) => res.data);

	activityDetails = (id) =>
		this.service.get(`/activities/${id}`).then((res) => res.data);

	removeActivity = (id) =>
		this.service
			.put(`/activities/${id}`, {isRemoved: true})
			.then((res) => res.data);

	editActivity = (
		_id,
		title,
		subtitle,
		images,
		description,
		phone,
		website,
		activity_location_full_address,
		activity_location_locality,
		activity_location_administrative_area_level,
		activity_location_country,
		activity_location_lat,
		activity_location_lng,
		activity_rating,
		activity_place_id,
		activity_opening_hours,
		duration,
		price
	) =>
		this.service.put(`/activities/${_id}`, {
			title,
			subtitle,
			images,
			description,
			phone,
			website,
			activity_location_full_address,
			activity_location_locality,
			activity_location_administrative_area_level,
			activity_location_country,
			activity_location_lat,
			activity_location_lng,
			activity_rating,
			activity_place_id,
			activity_opening_hours,
			duration,
			price,
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

	editUserCover = (_id, cover) => this.service.put(`/users/${_id}`, {cover});

	getAllUsers = () => this.service.get("/users").then((res) => res.data);

	// PLACES ENDPOINTS

	place = (
		type,
		title,
		subtitle,
		image,
		description,
		phone,
		website,
		place_location_full_address,
		place_location_locality,
		place_location_administrative_area_level,
		place_location_country,
		place_location_lat,
		place_location_lng,
		place_rating,
		place_id,
		place_opening_hours,
		price
	) => {
		return this.service
			.post("/place", {
				type,
				title,
				subtitle,
				image,
				description,
				phone,
				website,
				place_location_full_address,
				place_location_locality,
				place_location_administrative_area_level,
				place_location_country,
				place_location_lat,
				place_location_lng,
				place_rating,
				place_id,
				place_opening_hours,
				price,
			})
			.then((res) => res.data);
	};

	getAllPlaces = () => this.service.get("/places").then((res) => res.data);

	getPlaceDetails = (id) =>
		this.service.get(`/places/${id}`).then((res) => res.data);

	removePlace = (id) =>
		this.service
			.put(`/places/${id}`, {isRemoved: true})
			.then((res) => res.data);

	editPlace = (
		_id,
		title,
		subtitle,
		images,
		description,
		phone,
		website,
		activity_location_full_address,
		activity_location_locality,
		activity_location_administrative_area_level,
		activity_location_country,
		activity_location_lat,
		activity_location_lng,
		activity_rating,
		activity_place_id,
		activity_opening_hours,
		price
	) =>
		this.service.put(`/places/${_id}`, {
			title,
			subtitle,
			images,
			description,
			phone,
			website,
			activity_location_full_address,
			activity_location_locality,
			activity_location_administrative_area_level,
			activity_location_country,
			activity_location_lat,
			activity_location_lng,
			activity_rating,
			activity_place_id,
			activity_opening_hours,
			price,
		});

	getUserPlaces = (id) =>
		this.service.get(`/users/${id}/places`).then((res) => res.data);

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

	// PLACES ENDPOINTS

	bookmark = (listingId, listingType) =>
		this.service
			.post("/bookmark", {listingId, listingType})
			.then((res) => res.data);

	getUserActiveBookmarks = () =>
		this.service.get("/activebookmarks").then((res) => res.data);

	getUserAllBookmarks = () =>
		this.service.get("/bookmarks").then((res) => res.data);
}

export default ContentService;
