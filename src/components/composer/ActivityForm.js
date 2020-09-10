import React, {useState, useEffect} from "react";
import NavigationBar from "../NavigationBar";
import {Container, Row, Col, Form, Button} from "react-bootstrap";
import ContentService from "../../services/contentService";
import {useHistory} from "react-router-dom";
import Autocomplete from "react-google-autocomplete";

const ActivityForm = ({user, match}) => {
	const initialState = {
		loggedUser: user,
		formData: {
			emptyForm: true,
			type: "activity",
			title: "",
			subtitle: "",
			categories: [],
			seasons: [],
			region: "",
			images: [],
			description: "",
			phone: "",
			website: "",
			activity_full_address: "",
			activity_locality: "",
			activity_province: "",
			activity_state: "",
			activity_country: "",
			activity_lat: "",
			activity_lng: "",
			activity_rating: 0,
			activity_place_id: "",
			activity_opening_hours: "",
			duration: "",
			price: "",
			isReadyToSubmit: false,
		},
	};
	const [state, setState] = useState(initialState);
	const service = new ContentService();
	const history = useHistory();

	const handleFileUpload = (e) => {
		const fileToUpload = e.target.files[0];
		const uploadData = new FormData();
		uploadData.append("imageUrl", fileToUpload);
		service.uploadFile(uploadData).then((res) => {
			setState({
				...state,
				formData: {
					...state.formData,
					images: [...state.formData.images, res.path],
				},
			});
		});
	};

	const handleCheckCategory = (e) => {
		let categories = state.formData.categories;
		if (e.target.checked === true) {
			categories.push(e.target.id);
		} else {
			let index = categories.indexOf(e.target.id);
			categories.splice(index, 1);
		}
		setState({
			...state,
			formData: {...state.formData, categories: categories},
		});
	};

	const handleCheckSeason = (e) => {
		let seasons = state.formData.seasons;
		if (e.target.checked === true) {
			seasons.push(e.target.id);
		} else {
			let index = seasons.indexOf(e.target.id);
			seasons.splice(index, 1);
		}
		setState({
			...state,
			formData: {...state.formData, seasons: seasons},
		});
	};

	const handleCheckRegion = (e) => {
		setState({
			...state,
			formData: {...state.formData, region: e.target.id},
		});
	};

	const handleChange = (e) => {
		setState({
			...state,
			formData: {
				...state.formData,
				[e.target.name]: e.target.value,
				emptyForm: false,
			},
		});
	};

	const submitActivity = () => {
		const {
			type,
			title,
			subtitle,
			categories,
			seasons,
			region,
			images,
			description,
			phone,
			website,
			activity_full_address,
			activity_locality,
			activity_province,
			activity_state,
			activity_country,
			activity_lat,
			activity_lng,
			activity_rating,
			activity_place_id,
			activity_opening_hours,
			duration,
			price,
		} = state.formData;
		service
			.activity(
				type,
				title,
				subtitle,
				categories,
				seasons,
				region,
				images,
				description,
				phone,
				website,
				activity_full_address,
				activity_locality,
				activity_province,
				activity_state,
				activity_country,
				activity_lat,
				activity_lng,
				activity_rating,
				activity_place_id,
				activity_opening_hours,
				duration,
				price
			)
			.then(() => {
				setState({
					...state,
					formData: {
						emptyForm: true,
						type: "activity",
						title: "",
						subtitle: "",
						categories: [],
						seasons: [],
						region: "",
						images: [],
						description: "",
						phone: "",
						website: "",
						activity_full_address: "",
						activity_locality: "",
						activity_province: "",
						activity_state: "",
						activity_country: "",
						activity_lat: "",
						activity_lng: "",
						activity_rating: 0,
						activity_place_id: "",
						activity_opening_hours: "",
						duration: "",
						price: "",
						isReadyToSubmit: false,
					},
				});
				history.push("/dashboard");
			})
			.catch((err) => console.log(err));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		submitActivity();
	};

	useEffect(() => {
		const {
			title,
			subtitle,
			categories,
			seasons,
			region,
			activity_full_address,
			phone,
			website,
			images,
			price,
			duration,
			description,
		} = state.formData;

		if (
			title &&
			subtitle &&
			categories &&
			seasons &&
			region &&
			activity_full_address &&
			phone &&
			website &&
			images.length > 0 &&
			description &&
			duration &&
			price
		) {
			setState((state) => ({...state, isReadyToSubmit: true}));
		}
	}, [state.formData]);

	return (
		<div id="activity" className="composer">
			<NavigationBar
				logo_url={
					"https://res.cloudinary.com/juligoodie/image/upload/v1598554049/Getaways.guru/logo_getaways_navbar_tpsd0w.svg"
				}
				user={user}
				path={match.path}
			/>
			<Container className="mw-1600">
				<Row>
					<Col lg={12} className="sided-shadow">
						<div className="form-composer">
							<h1>Create Activity</h1>
							<p className="sub-h1">
								Describe and publish your activity so others start enjoying it.
							</p>
						</div>
						<Form>
							<Form.Group>
								<Form.Label>Title</Form.Label>
								<Form.Control
									type="text"
									name="title"
									placeholder="Activity title"
									onChange={handleChange}
									value={state.formData.title}
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Subtitle</Form.Label>
								<Form.Control
									type="text"
									name="subtitle"
									placeholder="Activity subtitle"
									onChange={handleChange}
									value={state.formData.subtitle}
								/>
							</Form.Group>
							<Form.Row>
								<Col lg={4}>
									<Form.Group>
										<Form.Label>Activity Category</Form.Label>
										<Form.Check
											type="checkbox"
											name="romantic"
											id="romantic"
											label="Romantic"
											onChange={handleCheckCategory}
										/>
										<Form.Check
											type="checkbox"
											name="adventure"
											id="adventure"
											label="Adventure"
											onChange={handleCheckCategory}
										/>
										<Form.Check
											type="checkbox"
											name="gastronomic"
											id="gastronomic"
											label="Gastronomic"
											onChange={handleCheckCategory}
										/>
										<Form.Check
											type="checkbox"
											name="cultural"
											id="cultural"
											label="Cultural"
											onChange={handleCheckCategory}
										/>
										<Form.Check
											type="checkbox"
											name="relax"
											id="relax"
											label="Relax"
											onChange={handleCheckCategory}
										/>
									</Form.Group>
								</Col>
								<Col lg={4}>
									<Form.Group>
										<Form.Label>Activity Season</Form.Label>
										<Form.Check
											type="checkbox"
											name="winter"
											id="winter"
											label="Winter"
											onChange={handleCheckSeason}
										/>
										<Form.Check
											type="checkbox"
											name="spring"
											id="spring"
											label="Spring"
											onChange={handleCheckSeason}
										/>
										<Form.Check
											type="checkbox"
											name="summer"
											id="summer"
											label="Summer"
											onChange={handleCheckSeason}
										/>
										<Form.Check
											type="checkbox"
											name="autumn"
											id="autumn"
											label="Autumn"
											onChange={handleCheckSeason}
										/>
									</Form.Group>
								</Col>
								<Col lg={4}>
									<Form.Group>
										<Form.Group>
											<Form.Label>Activity Region</Form.Label>
											<Form.Check
												type="radio"
												id="barcelona"
												label="Barcelona"
												name="activityRegion"
												onChange={handleCheckRegion}
											/>
											<Form.Check
												type="radio"
												id="tarragona"
												label="Tarragona"
												name="activityRegion"
												onChange={handleCheckRegion}
											/>
											<Form.Check
												type="radio"
												id="girona"
												label="Girona"
												name="activityRegion"
												onChange={handleCheckRegion}
											/>
											<Form.Check
												type="radio"
												id="lleida"
												label="Lleida"
												name="activityRegion"
												onChange={handleCheckRegion}
											/>
											<Form.Check
												type="radio"
												id="costaBrava"
												label="Costa Brava"
												name="activityRegion"
												onChange={handleCheckRegion}
											/>
											<Form.Check
												type="radio"
												id="costaDaurada"
												label="Costa Daurada"
												name="activityRegion"
												onChange={handleCheckRegion}
											/>
											<Form.Check
												type="radio"
												id="pirineus"
												label="Pirineus"
												name="activityRegion"
												onChange={handleCheckRegion}
											/>
										</Form.Group>
									</Form.Group>
								</Col>
							</Form.Row>
							<Form.Group>
								<Form.Label>Location</Form.Label>
								<Autocomplete
									className="location-control"
									apiKey={"AIzaSyAUENym8OVt2pBPNIMzvYLnXj_C7lIZtSw&"}
									style={{width: "100%"}}
									onPlaceSelected={(activity) => {
										let activity_full_address,
											activity_locality,
											activity_province,
											activity_state,
											activity_country,
											activity_lat,
											activity_lng,
											activity_rating,
											activity_id,
											activity_opening_hours;

										activity_full_address = activity.formatted_address;
										activity.address_components.forEach((el) => {
											if (el.types[0] === "locality") {
												activity_locality = el.long_name;
											}
											if (el.types[0] === "administrative_area_level_2") {
												activity_province = el.long_name;
											}
											if (el.types[0] === "administrative_area_level_1") {
												activity_state = el.long_name;
											}
											if (el.types[0] === "country") {
												activity_country = el.long_name;
											}
										});

										if (activity.geometry.viewport) {
											if (activity.geometry.viewport.Za) {
												activity_lat = activity.geometry.viewport.Za.i;
											} else {
												activity_lat = activity.geometry.viewport.ab.i;
											}
											activity_lng = activity.geometry.viewport.Va.i;
										}

										activity_rating = activity.rating;
										activity_id = activity.place_id;

										if (activity.opening_hours) {
											activity_opening_hours =
												activity.opening_hours.weekday_text;
										}

										setState({
											...state,
											formData: {
												...state.formData,
												activity_full_address: activity_full_address,
												activity_locality: activity_locality,
												activity_province: activity_province,
												activity_state: activity_state,
												activity_country: activity_country,
												activity_lat: activity_lat,
												activity_lng: activity_lng,
												activity_rating: activity_rating,
												activity_id: activity_id,
												activity_opening_hours: activity_opening_hours,
											},
										});

										console.log(activity);
									}}
									types={["establishment"]}
									placeholder={"Type the activity address"}
									fields={[
										"rating",
										"place_id",
										"opening_hours",
										"address_components",
										"formatted_address",
										"geometry",
									]}
								/>
							</Form.Group>
							<Form.Row>
								<Col lg={6}>
									<Form.Group>
										<Form.Label>Phone Number</Form.Label>
										<Form.Control
											type="tel"
											name="phone"
											placeholder="Phone number for contact details"
											onChange={handleChange}
											value={state.formData.phone}
										/>
									</Form.Group>
								</Col>
								<Col lg={6}>
									<Form.Group>
										<Form.Label>Website</Form.Label>
										<Form.Control
											type="url"
											name="website"
											placeholder="Activity website"
											onChange={handleChange}
											value={state.formData.website}
										/>
									</Form.Group>
								</Col>
							</Form.Row>
							<Form.Row>
								<Col lg={6}>
									<Form.Group>
										<Form.Label>Price (€)</Form.Label>
										<Form.Control
											type="number"
											name="price"
											placeholder="Activity price"
											onChange={handleChange}
											value={state.formData.price}
										/>
									</Form.Group>
								</Col>
								<Col lg={6}>
									<Form.Group>
										<Form.Label>Duration (h)</Form.Label>
										<Form.Control
											type="number"
											name="duration"
											placeholder="Activity duration"
											onChange={handleChange}
											value={state.formData.duration}
										/>
									</Form.Group>
								</Col>
							</Form.Row>
							<div className="images">
								<span>Activity Images</span>
								<Form.Row>
									<Col lg={2}>
										<Form.Group>
											<div className="image-drop-zone">
												<Form.Label>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="icon icon-tabler icon-tabler-photo"
														width="44"
														height="44"
														viewBox="0 0 24 24"
														strokeWidth="1.5"
														stroke="#2c3e50"
														fill="none"
														strokeLinecap="round"
														strokeLinejoin="round"
													>
														<path stroke="none" d="M0 0h24v24H0z" />
														<line x1="15" y1="8" x2="15.01" y2="8" />
														<rect x="4" y="4" width="16" height="16" rx="3" />
														<path d="M4 15l4 -4a3 5 0 0 1 3 0l 5 5" />
														<path d="M14 14l1 -1a3 5 0 0 1 3 0l 2 2" />
													</svg>
													<Form.Control
														type="file"
														onChange={handleFileUpload}
													/>
												</Form.Label>
											</div>
										</Form.Group>
									</Col>
									<Col lg={2}>
										<Form.Group>
											<div className="image-drop-zone">
												<Form.Label>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="icon icon-tabler icon-tabler-photo"
														width="44"
														height="44"
														viewBox="0 0 24 24"
														strokeWidth="1.5"
														stroke="#2c3e50"
														fill="none"
														strokeLinecap="round"
														strokeLinejoin="round"
													>
														<path stroke="none" d="M0 0h24v24H0z" />
														<line x1="15" y1="8" x2="15.01" y2="8" />
														<rect x="4" y="4" width="16" height="16" rx="3" />
														<path d="M4 15l4 -4a3 5 0 0 1 3 0l 5 5" />
														<path d="M14 14l1 -1a3 5 0 0 1 3 0l 2 2" />
													</svg>
													<Form.Control
														type="file"
														onChange={handleFileUpload}
													/>
												</Form.Label>
											</div>
										</Form.Group>
									</Col>
									<Col lg={2}>
										<Form.Group>
											<div className="image-drop-zone">
												<Form.Label>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="icon icon-tabler icon-tabler-photo"
														width="44"
														height="44"
														viewBox="0 0 24 24"
														strokeWidth="1.5"
														stroke="#2c3e50"
														fill="none"
														strokeLinecap="round"
														strokeLinejoin="round"
													>
														<path stroke="none" d="M0 0h24v24H0z" />
														<line x1="15" y1="8" x2="15.01" y2="8" />
														<rect x="4" y="4" width="16" height="16" rx="3" />
														<path d="M4 15l4 -4a3 5 0 0 1 3 0l 5 5" />
														<path d="M14 14l1 -1a3 5 0 0 1 3 0l 2 2" />
													</svg>
													<Form.Control
														type="file"
														onChange={handleFileUpload}
													/>
												</Form.Label>
											</div>
										</Form.Group>
									</Col>
									<Col lg={2}>
										<Form.Group>
											<div className="image-drop-zone">
												<Form.Label>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="icon icon-tabler icon-tabler-photo"
														width="44"
														height="44"
														viewBox="0 0 24 24"
														strokeWidth="1.5"
														stroke="#2c3e50"
														fill="none"
														strokeLinecap="round"
														strokeLinejoin="round"
													>
														<path stroke="none" d="M0 0h24v24H0z" />
														<line x1="15" y1="8" x2="15.01" y2="8" />
														<rect x="4" y="4" width="16" height="16" rx="3" />
														<path d="M4 15l4 -4a3 5 0 0 1 3 0l 5 5" />
														<path d="M14 14l1 -1a3 5 0 0 1 3 0l 2 2" />
													</svg>
													<Form.Control
														type="file"
														onChange={handleFileUpload}
													/>
												</Form.Label>
											</div>
										</Form.Group>
									</Col>
									<Col lg={2}>
										<Form.Group>
											<div className="image-drop-zone">
												<Form.Label>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="icon icon-tabler icon-tabler-photo"
														width="44"
														height="44"
														viewBox="0 0 24 24"
														strokeWidth="1.5"
														stroke="#2c3e50"
														fill="none"
														strokeLinecap="round"
														strokeLinejoin="round"
													>
														<path stroke="none" d="M0 0h24v24H0z" />
														<line x1="15" y1="8" x2="15.01" y2="8" />
														<rect x="4" y="4" width="16" height="16" rx="3" />
														<path d="M4 15l4 -4a3 5 0 0 1 3 0l 5 5" />
														<path d="M14 14l1 -1a3 5 0 0 1 3 0l 2 2" />
													</svg>
													<Form.Control
														type="file"
														onChange={handleFileUpload}
													/>
												</Form.Label>
											</div>
										</Form.Group>
									</Col>
								</Form.Row>
							</div>
							<Form.Group>
								<Form.Label>Description</Form.Label>
								<Form.Control
									as="textarea"
									rows="5"
									type="text"
									name="description"
									placeholder="Activity description"
									onChange={handleChange}
									value={state.formData.description}
								/>
							</Form.Group>
						</Form>
					</Col>
				</Row>
			</Container>
			<div className="progress-bar-outter">
				<Container className="d-flex align-items-center">
					<div className="col left">{/* <span>Section 1 of 7 </span> */}</div>
					<div className="col center">
						{/* <div className="progress">
							<div
								className="progress-bar"
								role="progressbar"
								style={{width: "33%"}}
								aria-valuenow="25"
								aria-valuemin="0"
								aria-valuemax="100"
							></div>
						</div> */}
					</div>
					<div className="col right">
						<div className="buttons d-flex justify-space-between justify-content-end">
							{state.isReadyToSubmit ? (
								<Button type="submit" variant="none" onClick={handleSubmit}>
									Publish
								</Button>
							) : (
								<Button type="submit" variant="none" disabled>
									Publish
								</Button>
							)}
						</div>
					</div>
				</Container>
			</div>
		</div>
	);
};

export default ActivityForm;
