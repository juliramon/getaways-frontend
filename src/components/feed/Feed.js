import React from "react";
import NavigationBar from "../NavigationBar";
import {Container, Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";

const Feed = ({user}) => {
	return (
		<div id="feed">
			<NavigationBar logo_url={"../logo-getaways-guru.svg"} user={user} />
			<Container>
				<Row>
					<Col lg={3}>
						<div className="box">
							<div className="user-meta">
								<p>Welcome back,</p>
								<h1>{user.fullName}</h1>
							</div>
							<div className="weather-meta"></div>
							<div className="left-menu">
								<div className="menu-user-topics">
									<p>Topics you follow</p>
									<ul clasName="menu-topics">
										<li>
											<Link to="/">Romantic</Link>
										</li>
										<li>
											<Link to="/">Barcelona</Link>
										</li>
										<li>
											<Link to="/">Costa Brava</Link>
										</li>
									</ul>
								</div>
								<div className="menu-user-links">
									<ul>
										<li>
											<Link to="/">Bookmarks</Link>
										</li>
										<li>
											<Link to="/">Profile</Link>
										</li>
										<li>
											<Link to="/">Add getaway</Link>
										</li>
									</ul>
								</div>
								<div className="menu-user-content">
									<p>Your getaways</p>
									<ul>
										<li>
											<Link to="/">Places</Link>
										</li>
										<li>
											<Link to="/">Experiences</Link>
										</li>
										<li>
											<Link to="/">Stories</Link>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default Feed;
