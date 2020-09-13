import React from "react";
import {Container, Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";

const Footer = ({logo_url}) => {
	let copyrightDate = new Date();
	copyrightDate = copyrightDate.getFullYear();
	return (
		<section id="footer">
			<Container className="mw-1200">
				<Row>
					<Col lg={4}>
						<div className="footer-intro">
							<img
								src={logo_url}
								alt="Getawaysy.guru logo"
								className="footer-logo"
							/>
							<span>
								Getaways.guru is the community to search, find and bookmark your
								next perfect getaway near Barcelona. Join now to connect with
								local travellers.
							</span>
							<span className="footer-copyright-timestamp">
								Copyright © {copyrightDate}. All rights reserved. <br />
								Designed and coded with{" "}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="icon icon-tabler icon-tabler-heart"
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
									<path
										fill="red"
										stroke="none"
										d="M12 20l-7 -7a4 4 0 0 1 6.5 -6a.9 .9 0 0 0 1 0a4 4 0 0 1 6.5 6l-7 7"
									/>
								</svg>
								by{" "}
								<a
									href="https://github.com/juliramon"
									target="_blank"
									rel="noopener noreferrer"
								>
									<u>Juli Ramon</u>
								</a>{" "}
								in Barcelona.
							</span>
						</div>
					</Col>
					<Col lg={2}></Col>
					<Col lg={2}>
						<div className="footer-about">
							<h4 className="footer-header">About</h4>
							<ul>
								<li>
									<Link to="#">About Us</Link>
								</li>
								<li>
									<Link to="#">Our Journal</Link>
								</li>
							</ul>
						</div>
					</Col>
					<Col lg={2}>
						<div className="footer-support">
							<h4 className="footer-header">Support</h4>
							<ul>
								<li>
									<Link to="#">Privacy Policy</Link>
								</li>
								<li>
									<Link to="#">Terms of Use</Link>
								</li>
								<li>
									<Link to="#">General Conditions</Link>
								</li>
								<li>
									<Link to="#">Cookies Policy</Link>
								</li>
								<li>
									<Link to="#">Security Statement</Link>
								</li>
							</ul>
						</div>
					</Col>
					<Col lg={2}>
						<div className="footer-connect">
							<h4 className="footer-header">Connect</h4>
							<ul>
								<li>
									<Link to="https://github.com/juliramon">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="icon icon-tabler icon-tabler-brand-github"
											width="22"
											height="22"
											viewBox="0 0 24 24"
											strokeWidth="1.5"
											stroke="#2c3e50"
											fill="none"
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<path stroke="none" d="M0 0h24v24H0z" />
											<path d="M9 19c-4.286 1.35-4.286-2.55-6-3m12 5v-3.5c0-1 .099-1.405-.5-2 2.791-.3 5.5-1.366 5.5-6.04a4.567 4.567 0 0 0 -1.333 -3.21a4.192 4.192 0 0 0 -.08 -3.227s-1.05-.3-3.476 1.267a12.334 12.334 0 0 0 -6.222 0C6.462 2.723 5.413 3.023 5.413 3.023a4.192 4.192 0 0 0 -.08 3.227A4.566 4.566 0 0 0 4 9.486c0 4.64 2.709 5.68 5.5 6.014-.591.589-.56 1.183-.5 2V21" />
										</svg>
										Github
									</Link>
								</li>
								<li>
									<Link to="https://www.linkedin.com/in/juliramon/">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="icon icon-tabler icon-tabler-brand-linkedin"
											width="22"
											height="22"
											viewBox="0 0 24 24"
											strokeWidth="1.5"
											stroke="#2c3e50"
											fill="none"
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<path stroke="none" d="M0 0h24v24H0z" />
											<rect x="4" y="4" width="16" height="16" rx="2" />
											<line x1="8" y1="11" x2="8" y2="16" />
											<line x1="8" y1="8" x2="8" y2="8.01" />
											<path d="M12 16v-5" />
											<path d="M16 16v-3a2 2 0 0 0 -4 0" />
										</svg>
										LinkedIn
									</Link>
								</li>
								<li>
									<Link to="https://twitter.com/juligoodie">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="icon icon-tabler icon-tabler-brand-twitter"
											width="22"
											height="22"
											viewBox="0 0 24 24"
											strokeWidth="1.5"
											stroke="#2c3e50"
											fill="none"
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<path stroke="none" d="M0 0h24v24H0z" />
											<path d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497 -3.753C20.18 7.773 21.692 5.25 22 4.009z" />
										</svg>
										Twitter
									</Link>
								</li>
								<li>
									<Link to="hello@getaways.guru">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="icon icon-tabler icon-tabler-at"
											width="22"
											height="22"
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
										</svg>
										E-mail
									</Link>
								</li>
							</ul>
						</div>
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default Footer;
