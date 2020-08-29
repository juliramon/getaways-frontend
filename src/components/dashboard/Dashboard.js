import React, {useEffect, useState, useCallback} from "react";
import {Container, Row, Button} from "react-bootstrap";
import NavigationBar from "../NavigationBar";
import ContentService from "../../services/contentService";
import ContentBox from "./ContentBox";
import PublicationModal from "../PublicationModal";

const Dashboard = ({user}) => {
	const initialState = {
		loggedUser: user,
		activities: [],
	};
	const [state, setState] = useState(initialState);
	const [dropCap, setDropCap] = useState("");
	const [modalVisibility, setModalVisibility] = useState(false);
	const handleModalVisibility = () => setModalVisibility(true);
	const hideModalVisibility = () => setModalVisibility(false);

	useEffect(() => {
		const userName = state.loggedUser.fullName;
		const dropCap = userName.charAt(0);
		setDropCap(dropCap);
	}, [state.loggedUser]);

	const service = new ContentService();
	const getActivities = useCallback(() => {
		service.userActivities("/userActivities").then((res) => {
			setState({...state, activities: res});
		});
	}, [state, service]);

	useEffect(getActivities, []);

	let filterBox, activities;
	if (state.activities.length > 0) {
		filterBox = (
			<div className="filter-box d-flex align-items-center justify-content-between">
				<Button variant="none">Image</Button>
				<Button variant="none" className="filter">
					Title
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="icon icon-tabler icon-tabler-arrows-sort"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="#212529"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path stroke="none" d="M0 0h24v24H0z" />
						<path d="M3 9l4-4l4 4m-4 -4v14" />
						<path d="M21 15l-4 4l-4-4m4 4v-14" />
					</svg>
				</Button>
				<Button variant="none" className="filter">
					Subtitle
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="icon icon-tabler icon-tabler-arrows-sort"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="#212529"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path stroke="none" d="M0 0h24v24H0z" />
						<path d="M3 9l4-4l4 4m-4 -4v14" />
						<path d="M21 15l-4 4l-4-4m4 4v-14" />
					</svg>
				</Button>
				<Button variant="none" className="filter">
					Date
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="icon icon-tabler icon-tabler-arrows-sort"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="#212529"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path stroke="none" d="M0 0h24v24H0z" />
						<path d="M3 9l4-4l4 4m-4 -4v14" />
						<path d="M21 15l-4 4l-4-4m4 4v-14" />
					</svg>
				</Button>
				<Button variant="none">Actions</Button>
			</div>
		);
		activities = state.activities.map((el) => (
			<ContentBox
				key={el._id}
				id={el._id}
				title={el.title}
				subtitle={el.subtitle}
				publicationDate={el.createdAt}
				getActivities={getActivities}
			/>
		));
	} else {
		filterBox = null;
		activities = (
			<div className="box empty d-flex">
				<div className="media">
					<img src="../../no-results.svg" alt="" />
				</div>
				<div className="text">
					<p>
						Oh no, this looks so empty.
						<br />
						Let's create your first activity to inspire others.
					</p>
					<Button
						className="btn btn-primary text-center"
						onClick={handleModalVisibility}
					>
						Add getaway
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div id="dashboard">
			<NavigationBar
				logo_url={
					"https://res.cloudinary.com/juligoodie/image/upload/v1598554049/Getaways.guru/logo_getaways_navbar_tpsd0w.svg"
				}
				user={user}
				dropCap={dropCap}
			/>
			<Container fluid className="top-nav">
				<div className="top-nav-wrapper">
					<h1 className="top-nav-title db">Dashboard</h1>
				</div>
			</Container>
			<Container fluid className="mw-1600">
				<Row>
					<div className="box d-flex">
						<div className="col left">
							<ul>
								<li className="list-title">Your getaways</li>
								<li className="list-item active">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="icon icon-tabler icon-tabler-layout-list"
										width="28"
										height="28"
										viewBox="0 0 24 24"
										strokeWidth="1.5"
										stroke="#2c3e50"
										fill="none"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path stroke="none" d="M0 0h24v24H0z" />
										<rect x="4" y="4" width="16" height="6" rx="2" />
										<rect x="4" y="14" width="16" height="6" rx="2" />
									</svg>
									All
								</li>
								<li className="list-item">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="icon icon-tabler icon-tabler-route"
										width="28"
										height="28"
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
									Activities
								</li>
								<li className="list-item">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="icon icon-tabler icon-tabler-bed"
										width="28"
										height="28"
										viewBox="0 0 24 24"
										strokeWidth="1.5"
										stroke="#2c3e50"
										fill="none"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path stroke="none" d="M0 0h24v24H0z" />
										<path d="M3 7v11m0 -4h18m0 4v-8a2 2 0 0 0 -2 -2h-8v6" />
										<circle cx="7" cy="10" r="1" />
									</svg>
									Places
								</li>
								<li className="list-item">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="icon icon-tabler icon-tabler-notebook"
										width="28"
										height="28"
										viewBox="0 0 24 24"
										strokeWidth="1.5"
										stroke="#2c3e50"
										fill="none"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path stroke="none" d="M0 0h24v24H0z" />
										<path d="M6 4h11a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-11a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1m3 0v18" />
										<line x1="13" y1="8" x2="15" y2="8" />
										<line x1="13" y1="12" x2="15" y2="12" />
									</svg>
									Stories
								</li>
							</ul>
							<div className="new">
								<ul>
									<li>
										<Button
											className="btn btn-primary text-center sidebar"
											onClick={handleModalVisibility}
										>
											Add getaway
										</Button>
									</li>
								</ul>
							</div>
						</div>
						<div className="col right">
							{filterBox}
							<div className="content-box-wrapper">{activities}</div>
						</div>
					</div>
				</Row>
			</Container>
			<PublicationModal
				visibility={modalVisibility}
				hideModal={hideModalVisibility}
			/>
		</div>
	);
};

export default Dashboard;
