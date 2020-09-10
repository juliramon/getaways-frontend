import React, {useEffect, useCallback, useState} from "react";
import ContentService from "../../services/contentService";
import PublicContentBox from "./PublicContentBox";
import NavigationBar from "../NavigationBar";
import {Container, Row, Form} from "react-bootstrap";
import GoogleMapReact from "google-map-react";

const PlaceList = ({user}) => {
	const initialState = {
		loggedUser: user,
		places: [],
		queryPlaceType: [],
		queryPlaceRegion: [],
		queryPlaceCategory: [],
		queryPlaceSeason: [],
		updateSearch: false,
		hasPlaces: false,
	};
	const [state, setState] = useState(initialState);
	const service = new ContentService();
	const getAllPlaces = useCallback(() => {
		service.getAllPlaces("/places").then((res) => {
			setState({...state, places: res, hasPlaces: true});
		});
	}, [state, service]);
	useEffect(getAllPlaces, []);
	let placesList;
	if (state.hasPlaces === true) {
		placesList = state.places.map((el) => (
			<PublicContentBox
				key={el._id}
				type={el.type}
				id={el._id}
				image={el.images[0]}
				title={el.title}
				subtitle={el.subtitle}
				location={`${el.place_locality === undefined ? "" : el.place_locality}${
					el.place_locality === undefined ? "" : ","
				} ${el.place_province || el.place_state}, ${el.place_country}`}
			/>
		));
	}

	const handleCheckType = (e) => {
		console.log(`${e.target.name}: ${e.target.id}`);
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
		setState({...state, queryPlaceType: query, updateSearch: true});
	};

	const handleCheckRegion = (e) => {
		console.log(`${e.target.name}: ${e.target.id}`);
		let query = state.queryPlaceRegion;
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
		setState({...state, queryPlaceRegion: query, updateSearch: true});
	};

	const handleCheckCategory = (e) => {
		console.log(`${e.target.name}: ${e.target.id}`);
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
		setState({...state, queryPlaceCategory: query, updateSearch: true});
	};

	const handleCheckSeason = (e) => {
		console.log(`${e.target.name}: ${e.target.id}`);
		let query = state.queryPlaceSeason;
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
		setState({...state, queryPlaceSeason: query, updateSearch: true});
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
		state.places.forEach((place) => {
			const position = {
				lat: parseFloat(place.place_lat),
				lng: parseFloat(place.place_lng),
			};
			console.log(position);
			const contentString =
				`<div id="infoview-wrapper">` +
				`<h1 id="firstHeading" class="firstHeading">${place.title}</h1>` +
				`<p>${place.subtitle}</p>` +
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
				.searchPlaces(
					state.queryPlaceType,
					state.queryPlaceRegion,
					state.queryPlaceCategory,
					state.queryPlaceSeason
				)
				.then((res) => {
					console.log("new places fetched");
					setState({...state, places: res, updateSearch: false});
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.updateSearch]);

	return (
		<div id="contentList" className="place">
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
									<span className="block-title">Place type</span>
									<Form.Check
										label="Hotel"
										name="placeType"
										id="hotel"
										onChange={handleCheckType}
									/>
									<Form.Check
										label="Apartment"
										name="placeType"
										id="apartment"
										onChange={handleCheckType}
									/>
									<Form.Check
										label="Cabin"
										name="placeType"
										id="cabin"
										onChange={handleCheckType}
									/>
									<Form.Check
										label="Treehouse"
										name="placeType"
										id="treehouse"
										onChange={handleCheckType}
									/>
									<Form.Check
										label="Ruralhouse"
										name="placeType"
										id="ruralhouse"
										onChange={handleCheckType}
									/>
									<Form.Check
										label="Trailer"
										name="placeType"
										id="trailer"
										onChange={handleCheckType}
									/>
								</div>
								<div className="filter-block">
									<span className="block-title">Region</span>
									<Form.Check
										label="Barcelona"
										name="placeRegion"
										id="barcelona"
										onChange={handleCheckRegion}
									/>
									<Form.Check
										label="Girona"
										name="placeRegion"
										id="girona"
										onChange={handleCheckRegion}
									/>
									<Form.Check
										label="Lleida"
										name="placeRegion"
										id="lleida"
										onChange={handleCheckRegion}
									/>
									<Form.Check
										label="Tarragona"
										name="placeRegion"
										id="tarragona"
										onChange={handleCheckRegion}
									/>
									<Form.Check
										label="Costa Brava"
										name="placeRegion"
										id="costaBrava"
										onChange={handleCheckRegion}
									/>
									<Form.Check
										label="Costa Daurada"
										name="placeRegion"
										id="costaDaurada"
										onChange={handleCheckRegion}
									/>
									<Form.Check
										label="Pirineus"
										name="placeRegion"
										id="pirineus"
										onChange={handleCheckRegion}
									/>
								</div>
								<div className="filter-block">
									<span className="block-title">Category</span>
									<Form.Check
										label="Romantic"
										name="placeCategory"
										id="romantic"
										onChange={handleCheckCategory}
									/>
									<Form.Check
										label="Adventure"
										name="placeCategory"
										id="adventure"
										onChange={handleCheckCategory}
									/>
									<Form.Check
										label="Gastronomic"
										name="placeCategory"
										id="gastronomic"
										onChange={handleCheckCategory}
									/>
									<Form.Check
										label="Cultural"
										name="placeCategory"
										id="cultural"
										onChange={handleCheckCategory}
									/>
									<Form.Check
										label="Relax"
										name="placeCategory"
										id="relax"
										onChange={handleCheckCategory}
									/>
								</div>
								<div className="filter-block">
									<span className="block-title">Season</span>
									<Form.Check
										label="Winter"
										name="placeSeason"
										id="winter"
										onChange={handleCheckSeason}
									/>
									<Form.Check
										label="Spring"
										name="placeSeason"
										id="spring"
										onChange={handleCheckSeason}
									/>
									<Form.Check
										label="Summer"
										name="placeSeason"
										id="summer"
										onChange={handleCheckSeason}
									/>
									<Form.Check
										label="Autumn"
										name="placeSeason"
										id="autumn"
										onChange={handleCheckSeason}
									/>
								</div>
							</div>
						</div>
						<div className="col center">
							<div className="top-nav-wrapper">
								<h1 className="top-nav-title">Places</h1>
								<p className="top-nav-subtitle">
									Wear your best boots, your swimsuit, your backpack or your
									skis. There's a whole world waiting to be discovered. Get away
									and enjoy with the activities below.
								</p>
								<ul className="top-nav-meta d-flex align-items-center">
									<li>3 places</li>
									<li>2 contributors</li>
								</ul>
							</div>
							{placesList}
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

export default PlaceList;
