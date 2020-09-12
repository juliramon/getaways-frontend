import React, {useState, useEffect} from "react";
import {Form, Button, Dropdown} from "react-bootstrap";
import Autocomplete from "react-google-autocomplete";
import {useHistory} from "react-router-dom";

const SearchBar = () => {
	const initialState = {
		location: undefined,
		queryLocation: "",
		hasLocation: false,
		type: [],
		queryActivityCategory: [],
		hasActivities: false,
		activeTab: "activities",
		isSubmittable: false,
	};
	const [state, setState] = useState(initialState);
	const history = useHistory();

	const handleTabClick = (e) => {
		if (e.target.id === "activities") {
			setState({...state, activeTab: "activities"});
		} else {
			setState({...state, activeTab: "places"});
		}
	};

	const handleCheckCategory = (e) => {
		console.log(`${e.target.name}: ${e.target.id}`);
		let query = state.queryActivityCategory;
		if (e.target.checked === true) {
			if (query.length < 1) {
				query.push(`${e.target.name}=${e.target.id}`);
			} else {
				query.push(e.target.id);
			}
		} else {
			let index = query.indexOf(e.target.id);
			query.splice(index, 1);
		}
		setState({...state, queryActivityCategory: query});
	};

	useEffect(() => {
		if (state.hasLocation) {
			setState({...state, isSubmittable: true});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.hasLocation]);

	let disabled;
	if (state.isSubmittable) {
		disabled = false;
	} else {
		disabled = true;
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		history.push(
			`/search?${state.queryLocation}&${state.queryActivityCategory}`
		);
	};

	return (
		<div className="search-form">
			<div className="tab-bar">
				<ul>
					<li>
						<Button
							className={state.activeTab === "activities" ? "active" : null}
							variant="none"
							id="activities"
							onClick={handleTabClick}
						>
							Activities
						</Button>
					</li>
					<li>
						<Button
							className={state.activeTab === "places" ? "active" : null}
							variant="none"
							id="places"
							onClick={handleTabClick}
						>
							Places
						</Button>
					</li>
				</ul>
			</div>

			<Form className="header-form d-flex align-items-center">
				<Form.Group>
					<Form.Label className="input-label">Location</Form.Label>
					<Autocomplete
						className="location-control form-control"
						apiKey={"AIzaSyAUENym8OVt2pBPNIMzvYLnXj_C7lIZtSw&"}
						style={{width: "100%"}}
						onPlaceSelected={(activity) => {
							let activity_full_address,
								activity_locality,
								activity_province,
								activity_state,
								activity_country;

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

							let queryLocation;
							let arrToCheck = [
								activity_locality,
								activity_province,
								activity_state,
								activity_country,
							];
							let notUndefinedLocation = [];
							arrToCheck.forEach((el) => {
								if (el !== undefined) {
									notUndefinedLocation.push(el);
								}
								queryLocation = notUndefinedLocation[0];
							});

							setState({
								...state,
								location: {
									activity_full_address: activity_full_address,
									activity_locality: activity_locality,
									activity_province: activity_province,
									activity_state: activity_state,
									activity_country: activity_country,
								},
								hasLocation: true,
								queryLocation: `activityLocation=${queryLocation}`,
							});
						}}
						types={[]}
						placeholder={"Type to select where to escape"}
						fields={["address_components", "formatted_address"]}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label className="input-label">Category</Form.Label>
					<Dropdown>
						<Dropdown.Toggle variant="none" id="dropdownCategories">
							<div className="form-control">Select categories to filter</div>
						</Dropdown.Toggle>
						<Dropdown.Menu className="pac-container">
							<Form.Check
								label="Romantic"
								name="activityCategory"
								id="romantic"
								className="pac-item"
								onClick={handleCheckCategory}
							/>
							<Form.Check
								label="Adventure"
								name="activityCategory"
								id="adventure"
								className="pac-item"
								onClick={handleCheckCategory}
							/>
							<Form.Check
								label="Gastronomic"
								name="activityCategory"
								id="gastronomic"
								className="pac-item"
								onClick={handleCheckCategory}
							/>
							<Form.Check
								label="Cultural"
								name="activityCategory"
								id="cultural"
								className="pac-item"
								onClick={handleCheckCategory}
							/>
							<Form.Check
								label="Relax"
								name="activityCategory"
								id="relax"
								className="pac-item"
								onClick={handleCheckCategory}
							/>
						</Dropdown.Menu>
					</Dropdown>
				</Form.Group>
				<Form.Group className="header-form---submit">
					<Button
						disabled={disabled}
						className="button-submit"
						type="submit"
						onClick={handleSubmit}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="icon icon-tabler icon-tabler-search"
							width="25"
							height="25"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="#fff"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" />
							<circle cx="10" cy="10" r="7" />
							<line x1="21" y1="21" x2="15" y2="15" />
						</svg>
						Search
					</Button>
				</Form.Group>
			</Form>
		</div>
	);
};

export default SearchBar;
