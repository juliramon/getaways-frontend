import React, {useEffect, useState, useCallback} from "react";
import NavigationBar from "../NavigationBar";
import {Container, Row, Button} from "react-bootstrap";
import ContentService from "../../services/contentService";
import PublicContentBox from "../listings/PublicContentBox";
import EditProfileModal from "../modals/EditProfileModal";

const UserProfile = ({user}) => {
	const initialState = {
		loggedUser: user,
		joinedYear: 0,
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

	const getJoinedDate = () => {
		const joinedDate = new Date(state.loggedUser.createdAt);
		const yearJoined = joinedDate.getFullYear();
		setState({...state, joinedYear: yearJoined});
	};
	useEffect(getJoinedDate, [state.joinedYear]);

	const service = new ContentService();
	const getActivities = useCallback(() => {
		service.userActivities("/userActivities").then((res) => {
			setState({...state, activities: res});
		});
	}, [state, service]);

	useEffect(getActivities, []);

	let activityCopy = "";
	if (state.activities.length === 0 || state.activities.length > 1) {
		activityCopy = "activities";
	} else {
		activityCopy = "activity";
	}

	const activities = state.activities.map((el) => (
		<PublicContentBox
			key={el._id}
			id={el._id}
			title={el.title}
			subtitle={el.subtitle}
			publicationDate={el.createdAt}
			getActivities={getActivities}
		/>
	));

	return (
		<div id="userProfile">
			<NavigationBar
				logo_url={
					"https://res.cloudinary.com/juligoodie/image/upload/v1598554049/Getaways.guru/logo_getaways_navbar_tpsd0w.svg"
				}
				user={user}
				dropCap={dropCap}
			/>
			<Container fluid className="mw-1600">
				<Row>
					<div className="box d-flex">
						<div className="col left">
							<div className="user box bordered">
								<div className="avatar user-avatar">
									<img
										src={state.loggedUser.avatar}
										alt={state.loggedUser.fullName}
									/>
								</div>
								<div className="user-meta">
									<h1 className="user-fullName">{state.loggedUser.fullName}</h1>
									<ul>
										<li className="user-username">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="icon icon-tabler icon-tabler-at"
												width="18"
												height="18"
												viewBox="0 0 24 24"
												strokeWidth="1.5"
												stroke="#2c3e50"
												fill="none"
												strokeLinecap="round"
												strokeLinejoin="round"
											>
												<path stroke="none" d="M0 0h24v24H0z" />
												<circle cx="12" cy="12" r="4" />
												<path d="M16 12v1.5a2.5 2.5 0 0 0 5 0v-1.5a9 9 0 1 0 -5.5 8.28" />
											</svg>{" "}
											username
										</li>
										<li className="user-followers">
											<span>225</span> following
										</li>
										<li className="user-following">
											<span>65</span> followers
										</li>
										<hr />
										<li className="user-bio">
											Coding, designing and writing for @escapaenparella and
											@innoget ~ Sharing life with @a_waterbalance ~ cat|eng|esp
										</li>
										<hr />
										<li className="user-location d-flex align-items-center">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="icon icon-tabler icon-tabler-map-pin"
												width="18"
												height="18"
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
											Lives in Barcelona
										</li>
										<li className="user-registration d-flex align-items-center">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="icon icon-tabler icon-tabler-calendar"
												width="18"
												height="18"
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
											Joined in {state.joinedYear}
										</li>
										<li className="user-verified d-flex align-items-center">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="icon icon-tabler icon-tabler-shield-check"
												width="18"
												height="18"
												viewBox="0 0 24 24"
												strokeWidth="1.5"
												stroke="#2c3e50"
												fill="none"
												strokeLinecap="round"
												strokeLinejoin="round"
											>
												<path stroke="none" d="M0 0h24v24H0z" />
												<path d="M9 12l2 2l4 -4" />
												<path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" />
											</svg>
											Verified
										</li>
									</ul>
									<div className="new">
										<ul>
											<li>
												<Button
													className="btn btn-primary text-center sidebar"
													onClick={handleModalVisibility}
												>
													Edit profile
												</Button>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
						<div className="col center">
							<div className="filter-bar">
								<Button
									className="active d-flex align-items-center justify-content-center"
									variant="none"
								>
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
								</Button>
								<Button
									variant="none"
									className="d-flex align-items-center justify-content-center"
								>
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
								</Button>
								<Button
									variant="none"
									className="d-flex align-items-center justify-content-center"
								>
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
								</Button>
								<Button
									variant="none"
									className="d-flex align-items-center justify-content-center"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="icon icon-tabler icon-tabler-star"
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
										<path d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z" />
									</svg>
									Reviews
								</Button>
							</div>
							<div className="user-listings activities">
								<div className="box bordered">
									{state.loggedUser.fullName} published {""}
									{state.activities.length} {activityCopy}
								</div>
								{activities}
							</div>
						</div>
						<div className="col right">
							<div className="box bordered"></div>
						</div>
					</div>
				</Row>
			</Container>
			<EditProfileModal
				visibility={modalVisibility}
				hideModal={hideModalVisibility}
				user={state.loggedUser}
			/>
		</div>
	);
};

export default UserProfile;
