import React, {useState, useEffect} from "react";
import NavigationBar from "../NavigationBar";
import {Container, Row, Col, Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import PublicationModal from "../PublicationModal";

const Feed = ({user}) => {
	const initialState = {
		loggedUser: user,
	};
	const [state] = useState(initialState);
	const [dropCap, setDropCap] = useState("");
	const [modalVisibility, setModalVisibility] = useState(false);
	useEffect(() => {
		const userName = state.loggedUser.fullName;
		const dropCap = userName.charAt(0);
		setDropCap(dropCap);
	}, [state.loggedUser]);
	const handleModalVisibility = () => setModalVisibility(true);
	const hideModalVisibility = () => setModalVisibility(false);
	return (
		<div id="feed">
			<NavigationBar
				logo_url={"../logo-getaways-guru.svg"}
				user={user}
				dropCap={dropCap}
			/>
			<Container fluid className="mw-1600">
				<Row>
					<Col lg={2} sm={3}>
						<div className="box">
							<div className="user-meta">
								<div className="user-meta-wrapper">
									<div className="avatar avatar-s">
										<span className="dropCap">{dropCap}</span>
										<img
											src={state.loggedUser.avatar}
											alt={state.loggedUser.fullName}
										/>
									</div>
									<div className="user-text">
										<p>Welcome back,</p>
										<h1>{user.fullName}</h1>
									</div>
								</div>
							</div>
							<div className="weather-meta"></div>
							<div className="left-menu">
								<div className="topics">
									<p>Topics you follow</p>
									<ul className="menu-topics">
										<li>
											<Link to="/">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="icon icon-tabler icon-tabler-heart"
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
													<path d="M12 20l-7 -7a4 4 0 0 1 6.5 -6a.9 .9 0 0 0 1 0a4 4 0 0 1 6.5 6l-7 7" />
												</svg>{" "}
												Romantic
											</Link>
										</li>
										<li>
											<Link to="/">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="icon icon-tabler icon-tabler-map-pin"
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
													<circle cx="12" cy="11" r="3" />
													<path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1 -2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z" />
												</svg>
												Barcelona
											</Link>
										</li>
										<li>
											<Link to="/">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="icon icon-tabler icon-tabler-map-pin"
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
													<circle cx="12" cy="11" r="3" />
													<path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1 -2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z" />
												</svg>
												Costa Brava
											</Link>
										</li>
									</ul>
								</div>
								<div className="content">
									<p>Top picks for you</p>
									<ul>
										<li>
											<Link to="/">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="icon icon-tabler icon-tabler-compass"
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
													<polyline points="8 16 10 10 16 8 14 14 8 16" />
													<circle cx="12" cy="12" r="9" />
												</svg>
												Discover
											</Link>
										</li>
										<li>
											<Link to="/">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="icon icon-tabler icon-tabler-users"
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
													<circle cx="9" cy="7" r="4" />
													<path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
													<path d="M16 3.13a4 4 0 0 1 0 7.75" />
													<path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
												</svg>
												Community
											</Link>
										</li>
									</ul>
								</div>
								<div className="links">
									<p>Manage your account</p>
									<ul>
										<li>
											<Link to="/dashboard">
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
												Dashboard
											</Link>
										</li>
										<li>
											<Link to="/">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="icon icon-tabler icon-tabler-bookmark"
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
													<path d="M9 4h6a2 2 0 0 1 2 2v14l-5-3l-5 3v-14a2 2 0 0 1 2 -2" />
												</svg>
												Bookmarks
											</Link>
										</li>
										<li>
											<Link to="/">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="icon icon-tabler icon-tabler-user"
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
													<circle cx="12" cy="7" r="4" />
													<path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
												</svg>
												Profile
											</Link>
										</li>
									</ul>
								</div>
								<div className="new">
									<ul>
										<li>
											<Button
												className="btn btn-primary text-center"
												onClick={handleModalVisibility}
											>
												Add getaway
											</Button>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</Col>
				</Row>
			</Container>
			<PublicationModal
				visibility={modalVisibility}
				hideModal={hideModalVisibility}
			/>
		</div>
	);
};

export default Feed;
