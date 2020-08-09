import React, {useState} from "react";
import {Navbar, Nav, Container, Form} from "react-bootstrap";
import ContentBar from "./homepage/ContentBar";

const NavigationBar = (props) => {
	console.log(props);
	const {logo_url, user} = props;
	const initialState = {
		loggedUser: user,
	};
	const [state] = useState(initialState);
	let navRight = undefined;
	if (state.loggedUser) {
		console.log("user is logged");
		navRight = (
			<Nav className="logged-user">
				<Nav.Link href="/profile">
					<div className="avatar avatar-s">
						<img
							src="https://randomuser.me/api/portraits/women/3.jpg"
							alt={state.loggedUser.fullName}
						/>
					</div>
					<div className="user-meta">{state.loggedUser.fullName}</div>
				</Nav.Link>
			</Nav>
		);
	} else {
		console.log("user is not logged");
		navRight = (
			<Nav>
				<Nav.Link href="/login">Log in</Nav.Link>
				<Nav.Link href="/signup" className="btn">
					Sign up
				</Nav.Link>
			</Nav>
		);
	}
	return (
		<header>
			<Navbar>
				<Container fluid className="align-items-center">
					<div className="nav-col left d-flex">
						<Navbar.Brand href="#home">
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
							<Nav.Link href="/getaways">
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
								Getaways
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
							<Nav.Link href="/experiences">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="icon icon-tabler icon-tabler-brand-safari"
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
									<polyline points="8 16 10 10 16 8 14 14 8 16" />
									<circle cx="12" cy="12" r="9" />
								</svg>
								Experiences
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
			<ContentBar />
		</header>
	);
};

export default NavigationBar;
