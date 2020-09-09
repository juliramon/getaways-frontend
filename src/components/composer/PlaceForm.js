import React, {useState, useEffect} from "react";
import NavigationBar from "../NavigationBar";
import {Container, Row, Col, Form, Button} from "react-bootstrap";
import ContentService from "../../services/contentService";
import {useHistory} from "react-router-dom";
import Autocomplete from "react-google-autocomplete";

const PlaceForm = ({user}) => {
	const initialState = {
		loggedUser: user,
		formData: {
			emptyForm: true,
			type: "place",
			title: "",
			subtitle: "",
			categories: [],
			seasons: [],
			region: "",
			placeType: "",
			images: [],
			description: "",
			phone: "",
			website: "",
			place_location_full_address: "",
			place_location_locality: "",
			place_location_administrative_area_level: "",
			place_location_country: "",
			place_location_lat: "",
			place_location_lng: "",
			place_rating: 0,
			place_id: "",
			place_opening_hours: "",
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

	const handleCheckPlaceType = (e) => {
		setState({
			...state,
			formData: {...state.formData, placeType: e.target.id},
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

	const submitPlace = () => {
		const {
			type,
			title,
			subtitle,
			categories,
			seasons,
			region,
			placeType,
			images,
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
		} = state.formData;
		service
			.place(
				type,
				title,
				subtitle,
				categories,
				seasons,
				region,
				placeType,
				images,
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
			)
			.then(() => {
				setState({
					...state,
					formData: {
						emptyForm: true,
						type: "place",
						title: "",
						subtitle: "",
						categories: [],
						seasons: [],
						region: "",
						placeType: "",
						images: [],
						description: "",
						phone: "",
						website: "",
						place_location_full_address: "",
						place_location_locality: "",
						place_location_administrative_area_level: "",
						place_location_country: "",
						place_location_lat: "",
						place_location_lng: "",
						place_rating: 0,
						place_id: "",
						place_opening_hours: "",
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
		submitPlace();
	};

	useEffect(() => {
		const {
			title,
			subtitle,
			categories,
			seasons,
			region,
			placeType,
			place_location_full_address,
			phone,
			website,
			images,
			price,
			description,
		} = state.formData;

		if (
			title &&
			subtitle &&
			categories &&
			seasons &&
			region &&
			placeType &&
			place_location_full_address &&
			phone &&
			website &&
			images.length > 0 &&
			description &&
			price
		) {
			setState((state) => ({...state, isReadyToSubmit: true}));
		}
	}, [state.formData]);

	return (
		<div id="place" className="composer">
			<NavigationBar
				logo_url={
					"https://res.cloudinary.com/juligoodie/image/upload/v1598554049/Getaways.guru/logo_getaways_navbar_tpsd0w.svg"
				}
				user={user}
			/>
			<Container className="mw-1600">
				<Row>
					<Col lg={12} className="sided-shadow">
						<div className="form-composer">
							<h1>Create Place</h1>
							<p className="sub-h1">
								Describe and publish your place so others start enjoying it.
							</p>
						</div>
						<Form>
							<Form.Group>
								<Form.Label>Title</Form.Label>
								<Form.Control
									type="text"
									name="title"
									placeholder="Place title"
									onChange={handleChange}
									value={state.formData.title}
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Subtitle</Form.Label>
								<Form.Control
									type="text"
									name="subtitle"
									placeholder="Place subtitle"
									onChange={handleChange}
									value={state.formData.subtitle}
								/>
							</Form.Group>
							<Form.Row>
								<Col lg={3}>
									<Form.Group>
										<Form.Label>Place Category</Form.Label>
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
								<Col lg={3}>
									<Form.Group>
										<Form.Label>Place Season</Form.Label>
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
								<Col lg={3}>
									<Form.Group>
										<Form.Group>
											<Form.Label>Place Region</Form.Label>
											<Form.Check
												type="radio"
												id="barcelona"
												label="Barcelona"
												name="activitySeason"
												onChange={handleCheckRegion}
											/>
											<Form.Check
												type="radio"
												id="tarragona"
												label="Tarragona"
												name="activitySeason"
												onChange={handleCheckRegion}
											/>
											<Form.Check
												type="radio"
												id="girona"
												label="Girona"
												name="activitySeason"
												onChange={handleCheckRegion}
											/>
											<Form.Check
												type="radio"
												id="lleida"
												label="Lleida"
												name="activitySeason"
												onChange={handleCheckRegion}
											/>
											<Form.Check
												type="radio"
												id="costaBrava"
												label="Costa Brava"
												name="activitySeason"
												onChange={handleCheckRegion}
											/>
											<Form.Check
												type="radio"
												id="costaDaurada"
												label="Costa Daurada"
												name="activitySeason"
												onChange={handleCheckRegion}
											/>
											<Form.Check
												type="radio"
												id="pirineus"
												label="Pirineus"
												name="activitySeason"
												onChange={handleCheckRegion}
											/>
										</Form.Group>
									</Form.Group>
								</Col>
								<Col lg={3}>
									<Form.Group>
										<Form.Group>
											<Form.Label>Place Type</Form.Label>
											<Form.Check
												type="radio"
												id="hotel"
												label="Hotel"
												name="placeType"
												onChange={handleCheckPlaceType}
											/>
											<Form.Check
												type="radio"
												id="apartment"
												label="Apartment"
												name="placeType"
												onChange={handleCheckPlaceType}
											/>
											<Form.Check
												type="radio"
												id="cabin"
												label="Cabin"
												name="placeType"
												onChange={handleCheckPlaceType}
											/>
											<Form.Check
												type="radio"
												id="treeHouse"
												label="Treehouse"
												name="placeType"
												onChange={handleCheckPlaceType}
											/>
											<Form.Check
												type="radio"
												id="ruralHouse"
												label="Rural house"
												name="placeType"
												onChange={handleCheckPlaceType}
											/>
											<Form.Check
												type="radio"
												id="trailer"
												label="Trailer"
												name="placeType"
												onChange={handleCheckPlaceType}
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
									onPlaceSelected={(place) => {
										let place_location_full_address,
											place_location_locality,
											place_location_administrative_area_level,
											place_location_country,
											place_location_lat,
											place_location_lng,
											place_rating,
											place_id,
											place_opening_hours;

										place_location_full_address = place.formatted_address;
										place_location_locality =
											place.address_components[
												place.address_components.length - 5
											].long_name;
										place_location_administrative_area_level =
											place.address_components[
												place.address_components.length - 3
											].long_name;
										place_location_country =
											place.address_components[
												place.address_components.length - 2
											].long_name;

										if (place.geometry.viewport) {
											if (place.geometry.viewport.Za) {
												place_location_lat = place.geometry.viewport.Za.i;
											} else {
												place_location_lat = place.geometry.viewport.ab.i;
											}
											place_location_lng = place.geometry.viewport.Va.i;
										}
										place_rating = place.rating;
										place_id = place.place_id;
										if (place.opening_hours) {
											place_opening_hours = place.opening_hours.weekday_text;
										}

										setState({
											...state,
											formData: {
												...state.formData,
												place_location_full_address: place_location_full_address,
												place_location_locality: place_location_locality,
												place_location_administrative_area_level: place_location_administrative_area_level,
												place_location_country: place_location_country,
												place_location_lat: place_location_lat,
												place_location_lng: place_location_lng,
												place_rating: place_rating,
												place_id: place_id,
												place_opening_hours: place_opening_hours,
											},
										});

										console.log(place);
									}}
									types={["establishment"]}
									placeholder={"Type the place address"}
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
								<Col lg={4}>
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
								<Col lg={4}>
									<Form.Group>
										<Form.Label>Website</Form.Label>
										<Form.Control
											type="url"
											name="website"
											placeholder="Place website"
											onChange={handleChange}
											value={state.formData.website}
										/>
									</Form.Group>
								</Col>
								<Col lg={4}>
									<Form.Group>
										<Form.Label>Price per night (€)</Form.Label>
										<Form.Control
											type="number"
											name="price"
											placeholder="Place price per night"
											onChange={handleChange}
											value={state.formData.price}
										/>
									</Form.Group>
								</Col>
							</Form.Row>
							<div className="images">
								<span>Place Images</span>
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
									placeholder="Place description"
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

export default PlaceForm;
