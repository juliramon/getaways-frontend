import React, {useState} from "react";
import {Navbar, Nav, Container, Form, Dropdown} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import ContentBar from "./homepage/ContentBar";

const NavigationBar = (props) => {
	const initialState = {
		searchQuery: "",
	};
	const [state, setState] = useState(initialState);
	const {logo_url, user, path} = props;
	const notLoggedHeader = {
		boxShadow: "none",
		borderBottom: "1px solid #e8e8e8",
	};

	const history = useHistory();

	const handleKeyPress = (e) => {
		let searchQuery = e.target.value;
		setState({...state, searchQuery: searchQuery});
		if (e.keyCode === 13) {
			e.preventDefault();
			history.push(`/search?query=${searchQuery}`);
		}
	};

	let styledHeader = user === "null" || !user ? notLoggedHeader : undefined;
	let logoLink = user === "null" || !user || user === undefined ? "/" : "/feed";
	let navRight = undefined;

	if (!user || user === "null") {
		navRight = (
			<Nav>
				<Nav.Link href="/login">Log in</Nav.Link>
				<Nav.Link href="/signup" className="btn signup">
					Sign up
				</Nav.Link>
			</Nav>
		);
	} else {
		navRight = (
			<Nav className="logged-user">
				<Dropdown>
					<Dropdown.Toggle variant="none" id="dropdown-basic">
						<div className="avatar avatar-nav">
							<img src={user.avatar} alt={user.fullName} />
						</div>
						<div className="user-meta">
							{user.fullName}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="icon icon-tabler icon-tabler-chevron-down"
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
								<polyline points="6 9 12 15 18 9" />
							</svg>
						</div>
					</Dropdown.Toggle>
					<Dropdown.Menu>
						<ul>
							<li>
								<Nav.Link href={`/dashboard`}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="icon icon-tabler icon-tabler-layout-list"
										width="44"
										height="44"
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
								</Nav.Link>
							</li>
							<li>
								<Nav.Link href={`/users/${user._id}`}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="icon icon-tabler icon-tabler-user"
										width="44"
										height="44"
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
									See your profile
								</Nav.Link>
							</li>
							<li>
								<Nav.Link href="/bookmarks">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="icon icon-tabler icon-tabler-bookmark"
										width="44"
										height="44"
										viewBox="0 0 24 24"
										strokeWidth="1.5"
										stroke="#2c3e50"
										fill="none"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path stroke="none" d="M0 0h24v24H0z" />
										<path d="M9 4h6a2 2 0 0 1 2 2v14l-5-3l-5 3v-14a2 2 0 0 1 2 -2" />
									</svg>{" "}
									Bookmarks
								</Nav.Link>
							</li>
							<li>
								<Nav.Link href="/logout">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="icon icon-tabler icon-tabler-power"
										width="44"
										height="44"
										viewBox="0 0 24 24"
										strokeWidth="1.5"
										stroke="#2c3e50"
										fill="none"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path stroke="none" d="M0 0h24v24H0z" />
										<path d="M7 6a7.75 7.75 0 1 0 10 0" />
										<line x1="12" y1="4" x2="12" y2="12" />
									</svg>{" "}
									Logout
								</Nav.Link>
							</li>
						</ul>
					</Dropdown.Menu>
				</Dropdown>
			</Nav>
		);
	}

	let navBar;
	if (
		path === "/activity-composer" ||
		path === "/place-composer" ||
		path === "/story-composer"
	) {
		navBar = (
			<header style={styledHeader}>
				<Navbar>
					<Container fluid className="align-items-center">
						<div className="nav-col left d-flex">
							<Navbar.Brand href={logoLink}>
								<img src={logo_url} alt="Logo Getaways.guru" />
							</Navbar.Brand>
						</div>
						<div className="nav-col right d-flex">{navRight}</div>
					</Container>
				</Navbar>
				<ContentBar user={user} />
			</header>
		);
	} else if (path === "/signup/complete-account") {
		navBar = (
			<header style={styledHeader}>
				<Navbar>
					<Container fluid className="align-items-center">
						<div className="nav-col left d-flex">
							<Navbar.Brand>
								<img src={logo_url} alt="Logo Getaways.guru" />
							</Navbar.Brand>
						</div>
						<div className="nav-col right d-flex">
							<Nav className="logged-user">
								<Dropdown>
									<Dropdown.Toggle variant="none" id="dropdown-basic">
										<div className="avatar avatar-nav">
											<img src={user.avatar} alt={user.fullName} />
										</div>
										<div className="user-meta">
											{user.fullName}
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="icon icon-tabler icon-tabler-chevron-down"
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
												<polyline points="6 9 12 15 18 9" />
											</svg>
										</div>
									</Dropdown.Toggle>
									<Dropdown.Menu>
										<ul>
											<li>
												<Nav.Link href="/logout">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="icon icon-tabler icon-tabler-power"
														width="44"
														height="44"
														viewBox="0 0 24 24"
														strokeWidth="1.5"
														stroke="#2c3e50"
														fill="none"
														strokeLinecap="round"
														strokeLinejoin="round"
													>
														<path stroke="none" d="M0 0h24v24H0z" />
														<path d="M7 6a7.75 7.75 0 1 0 10 0" />
														<line x1="12" y1="4" x2="12" y2="12" />
													</svg>{" "}
													Logout
												</Nav.Link>
											</li>
										</ul>
									</Dropdown.Menu>
								</Dropdown>
							</Nav>
						</div>
					</Container>
				</Navbar>
				<ContentBar user={user} />
			</header>
		);
	} else {
		navBar = (
			<header style={styledHeader}>
				<Navbar>
					<Container fluid className="align-items-center">
						<div className="nav-col left d-flex">
							<Navbar.Brand href={logoLink}>
								<img src={logo_url} alt="Logo Getaways.guru" />
							</Navbar.Brand>
							<Nav>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="icon icon-tabler icon-tabler-search"
									width="44"
									height="44"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="#2c3e50"
									fill="none"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path stroke="none" d="M0 0h24v24H0z" />
									<circle cx="10" cy="10" r="7" />
									<line x1="21" y1="21" x2="15" y2="15" />
								</svg>
								{/* <NativeListener> */}
								<Form>
									<Form.Control
										onKeyDown={handleKeyPress}
										type="text"
										placeholder="Search your next getaway..."
									/>

									<span className="search-helper">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="icon icon-tabler icon-tabler-keyboard"
											width="15"
											height="15"
											viewBox="0 0 24 24"
											strokeWidth="1.5"
											stroke="#2c3e50"
											fill="none"
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<path stroke="none" d="M0 0h24v24H0z" />
											<rect x="2" y="6" width="20" height="12" rx="2" />
											<line x1="6" y1="10" x2="6" y2="10" />
											<line x1="10" y1="10" x2="10" y2="10" />
											<line x1="14" y1="10" x2="14" y2="10" />
											<line x1="18" y1="10" x2="18" y2="10" />
											<line x1="6" y1="14" x2="6" y2="14.01" />
											<line x1="18" y1="14" x2="18" y2="14.01" />
											<line x1="10" y1="14" x2="14" y2="14" />
										</svg>
										Press enter to search
									</span>
								</Form>
								{/* </NativeListener> */}
							</Nav>
						</div>
						<div className="nav-col right d-flex">
							<Nav>
								<Nav.Link href="/activities">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="icon icon-tabler icon-tabler-route"
										width="44"
										height="44"
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
								</Nav.Link>
								<Nav.Link href="/places">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="icon icon-tabler icon-tabler-bed"
										width="44"
										height="44"
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
								</Nav.Link>
								<Nav.Link href="/stories">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="icon icon-tabler icon-tabler-notebook"
										width="44"
										height="44"
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
								</Nav.Link>
							</Nav>
							{navRight}
						</div>
					</Container>
				</Navbar>
				<ContentBar user={user} />
			</header>
		);
	}

	return navBar;
};

export default NavigationBar;
