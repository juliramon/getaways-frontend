import React from "react";
import {Navbar, Nav, Container, Form, Dropdown} from "react-bootstrap";
import ContentBar from "./homepage/ContentBar";

const NavigationBar = (props) => {
	const {logo_url, user, path} = props;
	const notLoggedHeader = {
		boxShadow: "none",
		borderBottom: "1px solid #e8e8e8",
	};
	let styledHeader = user ? notLoggedHeader : undefined;
	let logoLink = user ? "/feed" : "/";
	let navRight = undefined;
	if (user) {
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
								<Nav.Link href="/settings">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="icon icon-tabler icon-tabler-settings"
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
										<path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
										<circle cx="12" cy="12" r="3" />
									</svg>{" "}
									Settings & Privacy
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
	} else {
		navRight = (
			<Nav>
				<Nav.Link href="/login">Log in</Nav.Link>
				<Nav.Link href="/signup" className="btn signup">
					Sign up
				</Nav.Link>
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
						<div className="nav-col right d-flex">
							<Nav></Nav>
							{navRight}
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
								<Form>
									<Form.Control
										type="text"
										placeholder="Search where you'd like to escape..."
									/>
								</Form>
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
