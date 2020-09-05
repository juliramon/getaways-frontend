import React, {useState, useEffect, useCallback} from "react";
import NavigationBar from "../NavigationBar";
import ContentService from "../../services/contentService";
import {Container, Row, Spinner} from "react-bootstrap";
import {Link} from "react-router-dom";

const PlaceListing = (props) => {
	const initialState = {
		loggedUser: props.user,
		id: props.match.params.id,
		place: {},
		placeLoaded: false,
		owner: {},
	};
	const [state, setState] = useState(initialState);
	const service = new ContentService();
	const getPlaceDetails = useCallback(() => {
		service.getPlaceDetails(state.id).then((res) => {
			console.log(res);
			setState({
				...state,
				place: res,
				placeLoaded: true,
				owner: res.owner,
			});
		});
	}, [state, service]);

	useEffect(getPlaceDetails, []);

	let {title, subtitle, location, description} = state.place;
	let image0, image1, image2, image3, image4;

	if (state.placeLoaded) {
		const imageslist = state.place.images;
		image0 = imageslist[0];
		image1 = imageslist[1];
		image2 = imageslist[2];
		image3 = imageslist[3];
		image4 = imageslist[4];
	} else {
		return (
			<Container className="spinner d-flex justify-space-between">
				<Spinner animation="border" role="status" variant="primary">
					<span className="sr-only">Loading...</span>
				</Spinner>
			</Container>
		);
	}

	return (
		<div id="listingPage">
			<NavigationBar
				logo_url={
					"https://res.cloudinary.com/juligoodie/image/upload/v1598554049/Getaways.guru/logo_getaways_navbar_tpsd0w.svg"
				}
				user={props.user}
			/>
			<Container className="mw-1600">
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
										<h1 className="listing-title">{title}</h1>
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

export default PlaceListing;
