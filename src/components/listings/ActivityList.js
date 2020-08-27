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
	const [dropCap, setDropCap] = useState("");
	const service = new ContentService();
	useEffect(() => {
		const userName = state.loggedUser.fullName;
		const dropCap = userName.charAt(0);
		setDropCap(dropCap);
	}, [state.loggedUser]);
	const getAllActivities = useCallback(() => {
		service.activities("/activities").then((res) => {
			setState({...state, activities: res});
		});
	}, [state, service]);
	useEffect(getAllActivities, []);
	const activitiesList = state.activities.map((el) => (
		<PublicContentBox
			key={el._id}
			title={el.title}
			subtitle={el.subtitle}
			location={el.location}
		/>
	));
	return (
		<div id="contentList" className="activity">
			<NavigationBar
				logo_url={"../logo-getaways-guru.svg"}
				user={user}
				dropCap={dropCap}
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
