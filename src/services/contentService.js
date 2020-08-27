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
}

export default ContentService;
