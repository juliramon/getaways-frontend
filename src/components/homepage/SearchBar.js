import React, {useState, useEffect} from "react";
import {Form, Button, Dropdown} from "react-bootstrap";
import Autocomplete from "react-google-autocomplete";
import {useHistory} from "react-router-dom";

const SearchBar = () => {
	const initialState = {
		location: undefined,
		hasLocation: false,
		queryLocation: "",
		queryPlaceType: [],
		queryActivityCategory: [],
		queryPlaceCategory: [],
		activeTab: "activities",
		isSubmittable: false,
	};
	const [state, setState] = useState(initialState);
	const history = useHistory();

	const handleTabClick = (e) => {
		if (e.target.id === "activities") {
			setState({
				...state,
				queryPlaceType: [],
				queryPlaceCategory: [],
				activeTab: "activities",
			});
		} else {
			setState({
				...state,
				queryActivityCategory: [],
				activeTab: "places",
			});
		}
	};

	const handleCheckActivityCategory = (e) => {
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

	const handleCheckPlaceCategory = (e) => {
		let query = state.queryPlaceCategory;
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
		setState({...state, queryPlaceCategory: query});
	};

	const handleCheckType = (e) => {
		let query = state.queryPlaceType;
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
		setState({...state, queryPlaceType: query});
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
		if (state.activeTab === "activities") {
			if (state.queryActivityCategory.length > 0) {
				history.push(
					`/search?activityLocation=${state.queryLocation}&${state.queryActivityCategory}`
				);
			} else {
				history.push(`/search?activityLocation=${state.queryLocation}`);
			}
		} else if (state.activeTab === "places") {
			if (
				state.queryPlaceType.length > 0 &&
				state.queryPlaceCategory.length > 0
			) {
				history.push(
					`/search?placeLocation=${state.queryLocation}&${state.queryPlaceType}&${state.queryPlaceCategory}`
				);
			} else if (state.queryPlaceType.length > 0) {
				history.push(
					`/search?placeLocation=${state.queryLocation}&${state.queryPlaceType}`
				);
			} else if (state.queryPlaceCategory.length > 0) {
				history.push(
					`/search?placeLocation=${state.queryLocation}&${state.queryPlaceCategory}`
				);
			} else {
				history.push(`/search?placeLocation=${state.queryLocation}`);
			}
		}
	};

	let categoriesDropdownValue;
	if (state.activeTab === "activities") {
		if (state.queryActivityCategory.length > 0) {
			let selection = [];
			state.queryActivityCategory.forEach((el, idx) =>
				idx === 0 ? selection.push(el.slice(17)) : selection.push(el)
			);
			let formattedSelection = selection.map((el, idx) => {
				return (
					<span key={idx} className="search-tag">
						{el}
					</span>
				);
			});
			categoriesDropdownValue = formattedSelection;
		} else {
			categoriesDropdownValue = `Select categories to filter`;
		}
	} else {
		if (state.queryPlaceCategory.length > 0) {
			let selection = [];
			state.queryPlaceCategory.forEach((el, idx) =>
				idx === 0 ? selection.push(el.slice(14)) : selection.push(el)
			);
			let formattedSelection = selection.map((el, idx) => {
				return (
					<span key={idx} className="search-tag">
						{el}
					</span>
				);
			});
			categoriesDropdownValue = formattedSelection;
		} else {
			categoriesDropdownValue = `Select categories to filter`;
		}
	}

	let typeDropdownValue;
	if (state.queryPlaceType.length > 0) {
		let selection = [];
		state.queryPlaceType.forEach((el, idx) =>
			idx === 0 ? selection.push(el.slice(10)) : selection.push(el)
		);
		let formattedSelection = selection.map((el, idx) => {
			return (
				<span key={idx} className="search-tag">
					{el}
				</span>
			);
		});
		typeDropdownValue = formattedSelection;
	} else {
		typeDropdownValue = `Select types to filter`;
	}

	let defaultValue;
	if (state.location || state.location) {
		defaultValue =
			state.location.activity_full_address || state.location.place_full_address;
	} else {
		defaultValue = undefined;
	}

	let selectedForm;
	if (state.activeTab === "activities") {
		selectedForm = (
			<Form key={1} className="header-form d-flex align-items-center">
				<Form.Group>
					<Form.Label className="input-label">Location</Form.Label>
					<Autocomplete
						className="location-control form-control"
						apiKey={"AIzaSyAUENym8OVt2pBPNIMzvYLnXj_C7lIZtSw&"}
						style={{width: "100%"}}
						defaultValue={defaultValue}
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
								queryLocation: queryLocation,
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
							<div className="form-control">{categoriesDropdownValue}</div>
						</Dropdown.Toggle>
						<Dropdown.Menu className="pac-container">
							<Form.Check
								label="Romantic"
								name="activityCategory"
								id="romantic"
								className="pac-item"
								onClick={handleCheckActivityCategory}
							/>
							<Form.Check
								label="Adventure"
								name="activityCategory"
								id="adventure"
								className="pac-item"
								onClick={handleCheckActivityCategory}
							/>
							<Form.Check
								label="Gastronomic"
								name="activityCategory"
								id="gastronomic"
								className="pac-item"
								onClick={handleCheckActivityCategory}
							/>
							<Form.Check
								label="Cultural"
								name="activityCategory"
								id="cultural"
								className="pac-item"
								onClick={handleCheckActivityCategory}
							/>
							<Form.Check
								label="Relax"
								name="activityCategory"
								id="relax"
								className="pac-item"
								onClick={handleCheckActivityCategory}
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
		);
	} else {
		selectedForm = (
			<Form key={2} className="header-form d-flex align-items-center places">
				<Form.Group>
					<Form.Label className="input-label">Location</Form.Label>
					<Autocomplete
						className="location-control form-control"
						apiKey={"AIzaSyAUENym8OVt2pBPNIMzvYLnXj_C7lIZtSw&"}
						style={{width: "100%"}}
						defaultValue={defaultValue}
						onPlaceSelected={(place) => {
							let place_full_address,
								place_locality,
								place_province,
								place_state,
								place_country;

							place_full_address = place.formatted_address;

							place.address_components.forEach((el) => {
								if (el.types[0] === "locality") {
									place_locality = el.long_name;
								}
								if (el.types[0] === "administrative_area_level_2") {
									place_province = el.long_name;
								}
								if (el.types[0] === "administrative_area_level_1") {
									place_state = el.long_name;
								}
								if (el.types[0] === "country") {
									place_country = el.long_name;
								}
							});

							let queryLocation;
							let arrToCheck = [
								place_locality,
								place_province,
								place_state,
								place_country,
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
									place_full_address: place_full_address,
									place_locality: place_locality,
									place_province: place_province,
									place_state: place_state,
									place_country: place_country,
								},
								hasLocation: true,
								queryLocation: queryLocation,
							});
						}}
						types={[]}
						placeholder={"Type to select where to escape"}
						fields={["address_components", "formatted_address"]}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label className="input-label">Type</Form.Label>
					<Dropdown>
						<Dropdown.Toggle variant="none" id="dropdownTypes">
							<div className="form-control">{typeDropdownValue}</div>
						</Dropdown.Toggle>
						<Dropdown.Menu className="pac-container">
							<Form.Check
								label="Hotel"
								name="placeType"
								id="hotel"
								className="pac-item"
								onClick={handleCheckType}
							/>
							<Form.Check
								label="Apartment"
								name="placeType"
								id="apartment"
								className="pac-item"
								onClick={handleCheckType}
							/>
							<Form.Check
								label="Cabin"
								name="placeType"
								id="cabin"
								className="pac-item"
								onClick={handleCheckType}
							/>
							<Form.Check
								label="Treehouse"
								name="placeType"
								id="treehouse"
								className="pac-item"
								onClick={handleCheckType}
							/>
							<Form.Check
								label="Ruralhouse"
								name="placeType"
								id="ruralhouse"
								className="pac-item"
								onClick={handleCheckType}
							/>
							<Form.Check
								label="Trailer"
								name="placeType"
								id="trailer"
								className="pac-item"
								onClick={handleCheckType}
							/>
						</Dropdown.Menu>
					</Dropdown>
				</Form.Group>
				<Form.Group>
					<Form.Label className="input-label">Category</Form.Label>
					<Dropdown>
						<Dropdown.Toggle variant="none" id="dropdownCategories">
							<div className="form-control">{categoriesDropdownValue}</div>
						</Dropdown.Toggle>
						<Dropdown.Menu className="pac-container">
							<Form.Check
								label="Romantic"
								name="placeCategory"
								id="romantic"
								className="pac-item"
								onClick={handleCheckPlaceCategory}
							/>
							<Form.Check
								label="Adventure"
								name="placeCategory"
								id="adventure"
								className="pac-item"
								onClick={handleCheckPlaceCategory}
							/>
							<Form.Check
								label="Gastronomic"
								name="placeCategory"
								id="gastronomic"
								className="pac-item"
								onClick={handleCheckPlaceCategory}
							/>
							<Form.Check
								label="Cultural"
								name="placeCategory"
								id="cultural"
								className="pac-item"
								onClick={handleCheckPlaceCategory}
							/>
							<Form.Check
								label="Relax"
								name="placeCategory"
								id="relax"
								className="pac-item"
								onClick={handleCheckPlaceCategory}
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
		);
	}

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
			{selectedForm}
		</div>
	);
};

export default SearchBar;
