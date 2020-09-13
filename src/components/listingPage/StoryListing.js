import React, {useState, useEffect, useCallback} from "react";
import NavigationBar from "../NavigationBar";
import ContentService from "../../services/contentService";
import {Container, Row, Spinner} from "react-bootstrap";
import {Link} from "react-router-dom";

const StoryListing = (props) => {
	const initialState = {
		loggedUser: props.user,
		id: props.match.params.id,
		story: {},
		storyLoaded: false,
		owner: {},
	};
	const [state, setState] = useState(initialState);
	const service = new ContentService();
	const getStoryDetails = useCallback(() => {
		service.getStoryDetails(state.id).then((res) => {
			console.log(res);
			setState({
				...state,
				story: res,
				storyLoaded: true,
				owner: res.owner,
			});
		});
	}, [state, service]);

	useEffect(getStoryDetails, []);

	let {title, subtitle, description} = state.story;
	let image0, image1, image2, image3, image4;

	if (state.storyLoaded) {
		const imageslist = state.story.images;
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
					"https://res.cloudinary.com/juligoodie/image/upload/c_scale,q_100,w_135/v1600008855/getaways-guru/static-files/logo-getaways-guru_vvbikk.svg"
				}
				user={props.user}
			/>
			<Container className="mw-1200">
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

export default StoryListing;
