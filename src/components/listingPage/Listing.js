import React, {useState, useEffect, useCallback} from "react";
import NavigationBar from "../NavigationBar";
import ContentService from "../../services/contentService";
import {Container, Row, Col} from "react-bootstrap";

const Listing = (props) => {
	console.log(props);
	const initialState = {
		loggedUser: props.user,
		id: props.match.params.id,
		activity: {},
	};
	const [state, setState] = useState(initialState);
	const [dropCap, setDropCap] = useState("");
	useEffect(() => {
		const userName = state.loggedUser.fullName;
		const dropCap = userName.charAt(0);
		setDropCap(dropCap);
	}, [state.loggedUser]);
	const service = new ContentService();
	const getActivityDetails = useCallback(() => {
		service.activityDetails(state.id).then((res) => {
			setState({...state, activity: res});
		});
	}, [state, service]);

	useEffect(getActivityDetails, []);

	const {title, subtitle, description} = state.activity;
	return (
		<div id="listingPage">
			<NavigationBar
				logo_url={"../logo-getaways-guru.svg"}
				user={props.user}
				dropCap={dropCap}
			/>
			<Container fluid className="mw-1600">
				<Row>
					<Col lg={12}>
						<div className="listing-cover-pictures"></div>
					</Col>
				</Row>
				<Row>
					<Col lg={12}>
						<div className="listing-wrapper">
							<div className="listing-header">
								<h1 className="listing-title">{title}</h1>
								<p className="listing-subtitle">{subtitle}</p>
							</div>
							<div className="listing-body">
								<div className="col left">
									<div className="listing-description">{description}</div>
								</div>
								<div className="col right"></div>
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default Listing;
