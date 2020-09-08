import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import NavigationBar from "../NavigationBar";
import {Container, Row, Col, Breadcrumb, Form, Button} from "react-bootstrap";
import ContentService from "../../services/contentService";
import Autocomplete from "react-google-autocomplete";

const ActivityEditionForm = (props) => {
	const initialState = {
		loggedUser: props.user,
		id: props.match.params.id,
		activity: {},
	};
	const [state, setState] = useState(initialState);
	const service = new ContentService();
	const history = useHistory();

	useEffect(() => {
		const fetchData = async () => {
			const activityDetails = await service.activityDetails(state.id);
			setState({...state, activity: activityDetails});
		};
		fetchData();
	}, []);

	const {
		title,
		subtitle,
		activity_location_full_address,
		phone,
		website,
		price,
		duration,
		description,
	} = state.activity;

	const handleFileUpload = (e) => {
		const fileToUpload = e.target.files[0];
		const uploadData = new FormData();
		uploadData.append("imageUrl", fileToUpload);
		service.uploadFile(uploadData).then((res) => {
			setState({
				...state,
				activity: {
					...state.activity,
					images: [...state.activity.images, res.path],
				},
			});
		});
	};

	const handleChange = (e) =>
		setState({
			...state,
			activity: {...state.activity, [e.target.name]: e.target.value},
		});

	const handleSubmit = (e) => {
		e.preventDefault();
		const {
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
			price,
		} = state.activity;
		service
			.editActivity(
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
			)
			.then(() => history.push("/dashboard"));
	};

	return (
		<div id="activity" className="composer">
			<NavigationBar
				logo_url={
					"https://res.cloudinary.com/juligoodie/image/upload/v1598554049/Getaways.guru/logo_getaways_navbar_tpsd0w.svg"
				}
				user={props.user}
			/>
			<Container className="mw-1600">
				<Row>
					<Col lg={12} className="sided-shadow">
						<div className="form-composer">
							<h1>Edit Activity</h1>
							<p className="sub-h1">
								Edit and submit your activity so others start enjoying it.
							</p>
						</div>
						<Form onSubmit={handleSubmit}>
							<Form.Group>
								<Form.Label>Title</Form.Label>
								<Form.Control
									type="text"
									name="title"
									placeholder="Activity title"
									defaultValue={title}
									onChange={handleChange}
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Subtitle</Form.Label>
								<Form.Control
									type="text"
									name="subtitle"
									placeholder="Activity subtitle"
									defaultValue={subtitle}
									onChange={handleChange}
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Location</Form.Label>
								<Autocomplete
									className="location-control"
									apiKey={"AIzaSyAUENym8OVt2pBPNIMzvYLnXj_C7lIZtSw&"}
									style={{width: "100%"}}
									defaultValue={activity_location_full_address}
									onPlaceSelected={(place) => {
										let activity_location_full_address,
											activity_location_locality,
											activity_location_administrative_area_level,
											activity_location_country,
											activity_location_lat,
											activity_location_lng,
											activity_rating,
											activity_place_id,
											activity_opening_hours;

										activity_location_full_address = place.formatted_address;
										activity_location_locality =
											place.address_components[
												place.address_components.length - 4
											].long_name;
										activity_location_administrative_area_level =
											place.address_components[
												place.address_components.length - 3
											].long_name;
										activity_location_country =
											place.address_components[
												place.address_components.length - 2
											].long_name;

										activity_location_lat = place.geometry.viewport.Va.i;
										activity_location_lng = place.geometry.viewport.Za.i;
										activity_rating = place.rating;
										activity_place_id = place.place_id;
										activity_opening_hours = place.opening_hours.weekday_text;

										setState({
											...state,
											activity: {
												...state.activity,
												activity_location_full_address: activity_location_full_address,
												activity_location_locality: activity_location_locality,
												activity_location_administrative_area_level: activity_location_administrative_area_level,
												activity_location_country: activity_location_country,
												activity_location_lat: activity_location_lat,
												activity_location_lng: activity_location_lng,
												activity_rating: activity_rating,
												activity_place_id: activity_place_id,
												activity_opening_hours: activity_opening_hours,
											},
										});

										console.log(place);
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
											value={phone}
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
											value={website}
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
											value={price}
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
											value={duration}
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
									defaultValue={description}
									onChange={handleChange}
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
							<Button type="submit" variant="none" onClick={handleSubmit}>
								Save changes
							</Button>
						</div>
					</div>
				</Container>
			</div>
		</div>
	);
};

export default ActivityEditionForm;
