import React, {useEffect, useCallback, useState} from "react";
import ContentService from "../../services/contentService";
import PublicContentBox from "./PublicContentBox";
import NavigationBar from "../NavigationBar";
import {Container, Row, Form} from "react-bootstrap";

const ActivityList = ({user}) => {
	const initialState = {
		loggedUser: user,
		activities: [],
	};
	const [state, setState] = useState(initialState);
	const service = new ContentService();
	const getAllActivities = useCallback(() => {
		service.activities("/activities").then((res) => {
			setState({...state, activities: res});
		});
	}, [state, service]);
	useEffect(getAllActivities, []);
	const activitiesList = state.activities.map((el) => (
		<PublicContentBox
			key={el._id}
			id={el._id}
			image={el.images[0]}
			title={el.title}
			subtitle={el.subtitle}
			location={el.location}
		/>
	));
	return (
		<div id="contentList" className="activity">
			<NavigationBar
				logo_url={
					"https://res.cloudinary.com/juligoodie/image/upload/v1598554049/Getaways.guru/logo_getaways_navbar_tpsd0w.svg"
				}
				user={user}
			/>
			<Container fluid className="top-nav">
				<div className="top-nav-wrapper">
					<h1 className="top-nav-title">Activities</h1>
					<p className="top-nav-subtitle">
						Wear your best boots, your swimsuit, your backpack or your skis.
						There's a whole world waiting to be discovered. Get away and enjoy
						with the activities below.
					</p>
					<ul className="top-nav-meta d-flex align-items-center">
						<li>3 activities</li>
						<li>2 contributors</li>
					</ul>
				</div>
			</Container>
			<Container fluid className="mw-1600">
				<Row>
					<div className="box d-flex">
						<div className="col left">
							<div className="filter-list">
								<div className="filter-block">
									<span className="block-title">Verified</span>
									<Form.Check label="Yes" />
									<Form.Check label="No" />
								</div>
								<div className="filter-block">
									<span className="block-title">Price</span>
									<Form.Check label="Free" />
									<Form.Check label="€" />
									<Form.Check label="€€" />
									<Form.Check label="€€€" />
								</div>
								<div className="filter-block">
									<span className="block-title">Location</span>
									<Form.Check label="> 100 km" />
									<Form.Check label="50 - 100 km" />
									<Form.Check label="20 - 50 km" />
									<Form.Check label="< 20 km" />
								</div>
								<div className="filter-block">
									<span className="block-title">Category</span>
									<Form.Check label="Romantic" />
									<Form.Check label="Adventure" />
									<Form.Check label="Gastronomic" />
									<Form.Check label="Cultural" />
									<Form.Check label="Winter" />
									<Form.Check label="Summer" />
									<Form.Check label="Health & Wellness" />
								</div>
							</div>
						</div>
						<div className="col center">{activitiesList}</div>
						<div className="col right">
							<div className="an-wrapper">
								<div className="an-block"></div>
							</div>
						</div>
					</div>
				</Row>
			</Container>
		</div>
	);
};

export default ActivityList;
