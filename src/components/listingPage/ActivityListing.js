import React, {useState, useEffect} from "react";
import NavigationBar from "../NavigationBar";
import ContentService from "../../services/contentService";
import {Container, Row, Spinner, Toast} from "react-bootstrap";
import {Link} from "react-router-dom";

const ActivityListing = (props) => {
	console.log(props);
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

	useEffect(() => {
		const fetchData = async () => {
			const userBookmarks = await service.getUserAllBookmarks();
			const activityDetails = await service.activityDetails(state.id);
			let bookmarkDetails;
			userBookmarks.map((el) =>
				el.bookmarkActivityRef._id === activityDetails._id
					? (bookmarkDetails = el)
					: null
			);
			setState({
				...state,
				activity: activityDetails,
				isActivityLoaded: true,
				owner: activityDetails.owner,
				bookmarkDetails: bookmarkDetails,
				isBookmarked: !bookmarkDetails.isRemoved,
			});
		};
		fetchData();
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

	let {title, subtitle, location, description} = state.activity;
	let image0, image1, image2, image3, image4;

	if (state.isActivityLoaded) {
		const imageslist = state.activity.images;
		image0 = imageslist[0];
		image1 = imageslist[1];
		image2 = imageslist[2];
		image3 = imageslist[3];
		image4 = imageslist[4];
	}

	const bookmarkListing = () => {
		const listingId = state.activity._id;
		const listingType = state.activity.type;
		service.bookmark(listingId, listingType).then((res) => {
			setState({
				...state,
				isBookmarked: !state.isBookmarked,
				showBookmarkToast: true,
				toastMessage: res.message,
			});
		});
	};

	let bookmarkButton;
	if (state.isBookmarked === false) {
		bookmarkButton = (
			<button className="listing-bookmark" onClick={() => bookmarkListing()}>
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
		);
	} else {
		bookmarkButton = (
			<button className="listing-bookmark" onClick={() => bookmarkListing()}>
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

	return (
		<div id="listingPage">
			<NavigationBar
				logo_url={
					"https://res.cloudinary.com/juligoodie/image/upload/v1598554049/Getaways.guru/logo_getaways_navbar_tpsd0w.svg"
				}
				user={props.user}
			/>
			<Container className="mw-1600">
				{state.showBookmarkToast ? toast : null}
				<Row>
					<div className="box">
						<section className="col">
							<div className="listing-cover d-flex justify-space-between">
								<div
									className="cover"
									style={{backgroundImage: `url('${image0}')`}}
								></div>
								<div
									className="cover"
									style={{backgroundImage: `url('${image1}')`}}
								></div>
								<div className="d-flex">
									<div
										className="cover"
										style={{backgroundImage: `url('${image2}')`}}
									></div>
									<div
										className="cover"
										style={{backgroundImage: `url('${image3}')`}}
									></div>
								</div>
								<div
									className="cover"
									style={{backgroundImage: `url('${image4}')`}}
								></div>
							</div>
						</section>
						<article className="d-flex listing-content">
							<div className="col left">
								<div className="listing-wrapper">
									<div className="listing-header">
										<div className="d-flex justify-content-between listing-header-wrapper">
											<h1 className="listing-title">{title}</h1>
											{bookmarkButton}
										</div>

										<div className="d-flex listing-meta-wrapper">
											<div className="col left">
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
											<div className="col right">
												<p className="listing-subtitle">{subtitle}</p>
												<p className="listing-location d-flex align-items-center">
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
													</svg>{" "}
													{location}
												</p>
											</div>
										</div>
									</div>
									<div className="listing-body">
										<div className="listing-description">{description}</div>
									</div>
								</div>
							</div>
							<div className="col right">
								<div className="listing-details-box"></div>
							</div>
						</article>
					</div>
				</Row>
			</Container>
		</div>
	);
};

export default ActivityListing;
