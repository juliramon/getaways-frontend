import React, {useEffect, useCallback, useState} from "react";
import ContentService from "../../services/contentService";
import PublicContentBox from "./PublicContentBox";
import NavigationBar from "../NavigationBar";
import {Container, Row, Form} from "react-bootstrap";
import GoogleMapReact from "google-map-react";

const ActivityList = ({user}) => {
	const initialState = {
		loggedUser: user,
		activities: [],
		queryActivityRegion: [],
		queryActivityCategory: [],
		queryActivitySeason: [],
		updateSearch: false,
		hasActivities: false,
	};
	const [state, setState] = useState(initialState);
	const service = new ContentService();
	const getAllActivities = useCallback(() => {
		service.activities("/activities").then((res) => {
			setState({...state, activities: res});
		});
	}, [state, service]);
	useEffect(getAllActivities, []);
	let activitiesList;
	if (state.hasActivities) {
		activitiesList = state.activities.map((el) => (
			<PublicContentBox
				key={el._id}
				type={el.type}
				id={el._id}
				image={el.images[0]}
				title={el.title}
				subtitle={el.subtitle}
				location={`${
					el.activity_locality === undefined ? "" : el.activity_locality
				} ${el.activity_locality === undefined ? "" : ","} ${
					el.activity_province || el.activity_state
				}, ${el.activity_country}`}
			/>
		));
	}

	const handleCheckRegion = (e) => {
		console.log(`${e.target.name}: ${e.target.id}`);
		let query = state.queryActivityRegion;
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
		setState({...state, queryActivityRegion: query, updateSearch: true});
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
		setState({...state, queryActivityCategory: query, updateSearch: true});
	};

	const handleCheckSeason = (e) => {
		console.log(`${e.target.name}: ${e.target.id}`);
		let query = state.queryActivitySeason;
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
		setState({...state, queryActivitySeason: query, updateSearch: true});
	};

	const center = {
		lat: 59.95,
		lng: 30.33,
	};

	const getMapOptions = (maps) => {
		return {
			disableDefaultUI: true,
			styles: [
				{
					featureType: "poi",
					elementType: "labels",
					styles: [{visibility: "on"}],
				},
			],
		};
	};

	const renderMarker = (map, maps) => {
		const bounds = new maps.LatLngBounds();
		state.activities.forEach((activity) => {
			const position = {
				lat: parseFloat(activity.activity_lat),
				lng: parseFloat(activity.activity_lng),
			};
			console.log(position);
			const contentString =
				`<div id="infoview-wrapper">` +
				`<h1 id="firstHeading" class="firstHeading">${activity.title}</h1>` +
				`<p>${activity.subtitle}</p>` +
				`</div>`;
			const infowindow = new maps.InfoWindow({
				content: contentString,
			});
			console.log(infowindow.content);
			const marker = new maps.Marker({
				position: position,
				map,
				icon: "../../empty-avatar.svg",
			});
			bounds.extend(marker.position);

			marker.addListener("click", () => infowindow.open(map, marker));
		});
		map.fitBounds(bounds);
	};

	useEffect(() => {
		if (state.updateSearch === true) {
			service
				.searchActivities(
					state.queryActivityRegion,
					state.queryActivityCategory,
					state.queryActivitySeason
				)
				.then((res) => {
					console.log("new activities fetched");
					setState({...state, activities: res, updateSearch: false});
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.updateSearch]);

	return (
		<div id="contentList" className="activity">
			<NavigationBar
				logo_url={
					"https://res.cloudinary.com/juligoodie/image/upload/v1598554049/Getaways.guru/logo_getaways_navbar_tpsd0w.svg"
				}
				user={user}
			/>
			<Container fluid className="mw-1600">
				<Row>
					<div className="box d-flex">
						<div className="col left">
							<div className="filter-list">
								<div className="filter-block">
									<span className="block-title">Region</span>
									<Form.Check
										label="Barcelona"
										name="activityRegion"
										id="barcelona"
										onChange={handleCheckRegion}
									/>
									<Form.Check
										label="Girona"
										name="activityRegion"
										id="girona"
										onChange={handleCheckRegion}
									/>
									<Form.Check
										label="Lleida"
										name="activityRegion"
										id="lleida"
										onChange={handleCheckRegion}
									/>
									<Form.Check
										label="Tarragona"
										name="activityRegion"
										id="tarragona"
										onChange={handleCheckRegion}
									/>
									<Form.Check
										label="Costa Brava"
										name="activityRegion"
										id="costaBrava"
										onChange={handleCheckRegion}
									/>
									<Form.Check
										label="Costa Daurada"
										name="activityRegion"
										id="costaDaurada"
										onChange={handleCheckRegion}
									/>
									<Form.Check
										label="Pirineus"
										name="activityRegion"
										id="pirineus"
										onChange={handleCheckRegion}
									/>
								</div>
								<div className="filter-block">
									<span className="block-title">Category</span>
									<Form.Check
										label="Romantic"
										name="activityCategory"
										id="romantic"
										onChange={handleCheckCategory}
									/>
									<Form.Check
										label="Adventure"
										name="activityCategory"
										id="adventure"
										onChange={handleCheckCategory}
									/>
									<Form.Check
										label="Gastronomic"
										name="activityCategory"
										id="gastronomic"
										onChange={handleCheckCategory}
									/>
									<Form.Check
										label="Cultural"
										name="activityCategory"
										id="cultural"
										onChange={handleCheckCategory}
									/>
									<Form.Check
										label="Relax"
										name="activityCategory"
										id="relax"
										onChange={handleCheckCategory}
									/>
								</div>
								<div className="filter-block">
									<span className="block-title">Season</span>
									<Form.Check
										label="Winter"
										name="activitySeason"
										id="winter"
										onChange={handleCheckSeason}
									/>
									<Form.Check
										label="Spring"
										name="activitySeason"
										id="spring"
										onChange={handleCheckSeason}
									/>
									<Form.Check
										label="Summer"
										name="activitySeason"
										id="summer"
										onChange={handleCheckSeason}
									/>
									<Form.Check
										label="Autumn"
										name="activitySeason"
										id="autumn"
										onChange={handleCheckSeason}
									/>
								</div>
							</div>
						</div>
						<div className="col center">
							<div className="top-nav-wrapper">
								<h1 className="top-nav-title">Activities</h1>
								<p className="top-nav-subtitle">
									Wear your best boots, your swimsuit, your backpack or your
									skis. There's a whole world waiting to be discovered. Get away
									and enjoy with the activities below.
								</p>
								<ul className="top-nav-meta d-flex align-items-center">
									<li>3 activities</li>
									<li>2 contributors</li>
								</ul>
							</div>
							{activitiesList}
						</div>
						<div className="col right">
							<div className="map-wrapper">
								<div className="map-block">
									<GoogleMapReact
										bootstrapURLKeys={{
											key: "AIzaSyAUENym8OVt2pBPNIMzvYLnXj_C7lIZtSw",
										}}
										defaultCenter={center}
										defaultZoom={11}
										options={getMapOptions}
										yesIWantToUseGoogleMapApiInternals
										onGoogleApiLoaded={({map, maps}) => renderMarker(map, maps)}
									/>
								</div>
							</div>
						</div>
					</div>
				</Row>
			</Container>
		</div>
	);
};

export default ActivityList;
