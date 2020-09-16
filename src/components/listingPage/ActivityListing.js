import React, {useState, useEffect} from "react";
import NavigationBar from "../NavigationBar";
import ContentService from "../../services/contentService";
import {Container, Row, Spinner, Toast, Col} from "react-bootstrap";
import {Link} from "react-router-dom";
import GoogleMapReact from "google-map-react";
import SignUpModal from "../modals/SignUpModal";

const ActivityListing = (props) => {
	const initialState = {
		loggedUser: props.user,
		id: props.match.params.id,
		activity: {},
		isActivityLoaded: false,
		owner: {},
		bookmarkDetails: {},
		isBookmarked: false,
		showBookmarkToast: false,
		toastMessage: "",
	};
	const [state, setState] = useState(initialState);
	const service = new ContentService();

	const [modalVisibility, setModalVisibility] = useState(false);
	const handleModalVisibility = () => setModalVisibility(true);
	const hideModalVisibility = () => setModalVisibility(false);

	useEffect(() => {
		const fetchData = async () => {
			let userBookmarks;
			if (state.loggedUser && state.loggedUser !== "null") {
				userBookmarks = await service.getUserAllBookmarks();
			}
			const activityDetails = await service.activityDetails(state.id);
			let bookmarkDetails, isBookmarked;
			if (userBookmarks.length > 0) {
				userBookmarks.forEach((el) => {
					if (
						el.bookmarkActivityRef &&
						el.bookmarkActivityRef._id === activityDetails._id
					) {
						return (bookmarkDetails = el);
					}
				});
			}
			if (bookmarkDetails) {
				isBookmarked = !bookmarkDetails.isRemoved;
			} else {
				isBookmarked = false;
			}
			setState({
				...state,
				activity: activityDetails,
				isActivityLoaded: true,
				owner: activityDetails.owner,
				bookmarkDetails: bookmarkDetails,
				isBookmarked: isBookmarked,
			});
		};
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (state.isActivityLoaded === false) {
		return (
			<Container className="spinner d-flex justify-space-between">
				<Spinner animation="border" role="status" variant="primary">
					<span className="sr-only">Loading...</span>
				</Spinner>
			</Container>
		);
	}

	let {title, subtitle, description} = state.activity;

	const bookmarkListing = () => {
		const listingId = state.activity._id;
		const listingType = state.activity.type;
		service.bookmark(listingId, listingType).then((res) => {
			setState({
				...state,
				isBookmarked: !state.isBookmarked,
				showBookmarkToast: true,
				toastMessage: res.message || "Listing bookmarked!",
			});
		});
	};

	let bookmarkButton;

	if (props.user && props.user !== "null") {
		if (state.isBookmarked === false) {
			bookmarkButton = (
				<div
					className="listing-bookmark-wrapper"
					onClick={() => bookmarkListing()}
				>
					<button className="listing-bookmark">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="icon icon-tabler icon-tabler-bookmark"
							width="44"
							height="44"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="#0d1f44"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" />
							<path d="M9 4h6a2 2 0 0 1 2 2v14l-5-3l-5 3v-14a2 2 0 0 1 2 -2" />
						</svg>
					</button>
					<span>Bookmark</span>
				</div>
			);
		} else {
			bookmarkButton = (
				<div
					className="listing-bookmark-wrapper"
					onClick={() => bookmarkListing()}
				>
					<button className="listing-bookmark">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="icon icon-tabler icon-tabler-bookmark"
							width="44"
							height="44"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="#0d1f44"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" />
							<path
								fill="#0d1f44"
								d="M9 4h6a2 2 0 0 1 2 2v14l-5-3l-5 3v-14a2 2 0 0 1 2 -2"
							/>
						</svg>
					</button>
					<span>Unbookmark</span>
				</div>
			);
		}
	} else {
		bookmarkButton = (
			<div
				className="listing-bookmark-wrapper"
				onClick={() => handleModalVisibility()}
			>
				<button className="listing-bookmark">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="icon icon-tabler icon-tabler-bookmark"
						width="44"
						height="44"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="#0d1f44"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path stroke="none" d="M0 0h24v24H0z" />
						<path d="M9 4h6a2 2 0 0 1 2 2v14l-5-3l-5 3v-14a2 2 0 0 1 2 -2" />
					</svg>
				</button>
				<span>Bookmark</span>
			</div>
		);
	}

	const toast = (
		<Toast
			onClose={() =>
				setState({...state, showBookmarkToast: false, toastMessage: ""})
			}
			show={state.showBookmarkToast}
			delay={5000}
			autohide
		>
			<Toast.Header>
				<img src="../../logo-xs.svg" className="rounded mr-2" alt="" />
				<strong className="mr-auto">Getaways.guru</strong>
			</Toast.Header>
			<Toast.Body>
				{state.toastMessage} <br />{" "}
				<Link to={"/bookmarks"}>See all bookmarks</Link>{" "}
			</Toast.Body>
		</Toast>
	);

	const center = {
		lat: parseFloat(state.activity.activity_lat),
		lng: parseFloat(state.activity.activity_lng),
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
		const position = {
			lat: parseFloat(state.activity.activity_lat),
			lng: parseFloat(state.activity.activity_lng),
		};
		new maps.Marker({position: position, map, title: "Hello"});
	};

	const coversList = state.activity.images.map((cover, idx) => (
		<div
			key={idx}
			className="cover"
			style={{backgroundImage: `url(${cover})`}}
		></div>
	));

	let activityHours, hasOpeningHours;
	if (state.activity.activity_opening_hours.length > 0) {
		activityHours = state.activity.activity_opening_hours.map((hour, idx) => (
			<li key={idx} className="activity-hour">
				{hour}
			</li>
		));
		hasOpeningHours = (
			<div className="listing-activity-hours">
				<ul className="listing-activity-hours-list">
					<li className="header">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="icon icon-tabler icon-tabler-calendar"
							width="22"
							height="22"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="#2c3e50"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" />
							<rect x="4" y="5" width="16" height="16" rx="2" />
							<line x1="16" y1="3" x2="16" y2="7" />
							<line x1="8" y1="3" x2="8" y2="7" />
							<line x1="4" y1="11" x2="20" y2="11" />
							<line x1="11" y1="15" x2="12" y2="15" />
							<line x1="12" y1="15" x2="12" y2="18" />
						</svg>
						Opening Hours
					</li>
					{activityHours}
				</ul>
			</div>
		);
	}

	const activityCategories = state.activity.categories.map((category, idx) => (
		<li key={idx} className="activity-category">
			{category} getaway
		</li>
	));

	const activitySeasons = state.activity.seasons.map((season, idx) => (
		<li key={idx} className="activity-season">
			{season}
		</li>
	));

	const activityRegion = state.activity.region.map((region, idx) => (
		<li key={idx} className="activity-region">
			{region}
		</li>
	));

	return (
		<div id="listingPage">
			<NavigationBar
				logo_url={
					"https://res.cloudinary.com/juligoodie/image/upload/c_scale,q_100,w_135/v1600008855/getaways-guru/static-files/logo-getaways-guru_vvbikk.svg"
				}
				user={props.user}
			/>
			<Container className="mw-1200">
				{state.showBookmarkToast ? toast : null}
				<div className="box">
					<Row>
						<section className="listing-header-wrapper">
							<Col lg={12}>
								<div className="listing-header">
									<div className="col left">
										<div className="listing-title-wrapper">
											<h1 className="listing-title">{title}</h1>
										</div>
										<div className="listing-meta-bar">
											<ul>
												<li className="listing-type">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="icon icon-tabler icon-tabler-route"
														width="20"
														height="20"
														viewBox="0 0 24 24"
														strokeWidth="1.5"
														stroke="#2c3e50"
														fill="none"
														strokeLinecap="round"
														strokeLinejoin="round"
													>
														<path stroke="none" d="M0 0h24v24H0z" />
														<circle cx="6" cy="19" r="2" />
														<circle cx="18" cy="5" r="2" />
														<path d="M12 19h4.5a3.5 3.5 0 0 0 0 -7h-8a3.5 3.5 0 0 1 0 -7h3.5" />
													</svg>
													<span>{state.activity.type}</span>
												</li>
												<li className="listing-rating">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="icon icon-tabler icon-tabler-star"
														width="20"
														height="20"
														viewBox="0 0 24 24"
														strokeWidth="1.5"
														stroke="#2c3e50"
														fill="none"
														strokeLinecap="round"
														strokeLinejoin="round"
													>
														<path stroke="none" d="M0 0h24v24H0z" />
														<path d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z" />
													</svg>
													<span>{state.activity.activity_rating}</span>
												</li>
												<li className="listing-location">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="icon icon-tabler icon-tabler-map-pin"
														width="20"
														height="20"
														viewBox="0 0 24 24"
														strokeWidth="1.5"
														stroke="#2c3e50"
														fill="none"
														strokeLinecap="round"
														strokeLinejoin="round"
													>
														<path stroke="none" d="M0 0h24v24H0z" />
														<circle cx="12" cy="11" r="3" />
														<path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1 -2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z" />
													</svg>
													<span>{`${
														state.activity.activity_locality === undefined
															? ""
															: state.activity.activity_locality
													}${
														state.activity.activity_locality === undefined
															? ""
															: ","
													} ${
														state.activity.activity_province ||
														state.activity.activity_state
													}, ${state.activity.activity_country}`}</span>
												</li>
											</ul>
										</div>
									</div>
									<div className="col right">{bookmarkButton}</div>
								</div>
								<div className="listing-cover d-flex justify-space-between">
									{coversList}
								</div>
							</Col>
						</section>
					</Row>
					<Row>
						<article className="listing-body">
							<Col lg={7}>
								<div className="listing-body-wrapper d-flex justify-content-between align-items-center">
									<p className="listing-subtitle">{subtitle}</p>
									<div className="listing-owner">
										<Link to={`/users/${state.owner._id}`}>
											<div className="avatar">
												<img
													src={state.owner.avatar}
													alt={state.owner.fullName}
												/>
											</div>
											<p className="listing-owner-name">
												{state.owner.fullName}
											</p>
										</Link>
									</div>
								</div>
								<div className="listing-details-body d-flex">
									<div className="listing-categories">
										<span>Ideal for a</span>
										<ul>{activityCategories}</ul>
									</div>
									<div className="listing-seasons">
										<span>Must perform in</span>
										<ul>{activitySeasons}</ul>
									</div>
									<div className="d-flex right">
										<div className="listing-region">
											<span>Based in</span>
											<ul>{activityRegion}</ul>
										</div>
										<div className="listing-duration">
											<span>Duration</span>
											{state.activity.duration} hours
										</div>
										<div className="listing-price">
											<span>Activity price</span>
											{state.activity.price} €
										</div>
									</div>
								</div>
								<div className="listing-description">{description}</div>
							</Col>
							<Col lg={1}></Col>
							<Col lg={4}>
								<div className="listing-details-box">
									<div className="listing-map">
										<GoogleMapReact
											bootstrapURLKeys={{
												key: "AIzaSyAUENym8OVt2pBPNIMzvYLnXj_C7lIZtSw",
											}}
											defaultCenter={center}
											defaultZoom={11}
											options={getMapOptions}
											yesIWantToUseGoogleMapApiInternals
											onGoogleApiLoaded={({map, maps}) =>
												renderMarker(map, maps)
											}
										/>
									</div>
									{hasOpeningHours}
									<ul className="listing-details-list">
										<li className="listing-location">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="icon icon-tabler icon-tabler-map-pin"
												width="22"
												height="22"
												viewBox="0 0 24 24"
												strokeWidth="1.5"
												stroke="#2c3e50"
												fill="none"
												strokeLinecap="round"
												strokeLinejoin="round"
											>
												<path stroke="none" d="M0 0h24v24H0z" />
												<circle cx="12" cy="11" r="3" />
												<path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1 -2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z" />
											</svg>
											{state.activity.activity_full_address}
										</li>
										<li className="listing-phone">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="icon icon-tabler icon-tabler-phone-call"
												width="22"
												height="22"
												viewBox="0 0 24 24"
												strokeWidth="1.5"
												stroke="#2c3e50"
												fill="none"
												strokeLinecap="round"
												strokeLinejoin="round"
											>
												<path stroke="none" d="M0 0h24v24H0z" />
												<path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
												<path d="M15 7a2 2 0 0 1 2 2" />
												<path d="M15 3a6 6 0 0 1 6 6" />
											</svg>
											<a href={`tel:${state.activity.phone}`}>
												{state.activity.phone}
											</a>
										</li>
										<li className="listing-website">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="icon icon-tabler icon-tabler-link"
												width="22"
												height="22"
												viewBox="0 0 24 24"
												strokeWidth="1.5"
												stroke="#2c3e50"
												fill="none"
												strokeLinecap="round"
												strokeLinejoin="round"
											>
												<path stroke="none" d="M0 0h24v24H0z" />
												<path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5" />
												<path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5" />
											</svg>
											<a href={`http://${state.activity.website}`}>
												{state.activity.website}
											</a>
										</li>
									</ul>
								</div>
							</Col>
						</article>
					</Row>
				</div>
			</Container>
			<SignUpModal
				visibility={modalVisibility}
				hideModal={hideModalVisibility}
			/>
		</div>
	);
};

export default ActivityListing;
