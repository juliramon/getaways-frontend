import React from "react";
import {Container, Row, Col} from "react-bootstrap";

const Footer = ({logo_url}) => {
	return (
		<section id="footer">
			<Container className="mw-1600">
				<Row>
					<Col lg={3}>
						<div className="footer-intro">
							<img src={logo_url} alt="Getawaysy.guru logo" />
							<span>
								Getaways.guru is the trusted community to search, find and
								bookmark your next perfect getaway near Barcelona. Join now to
								connect with local travellers.
							</span>
							<span></span>
						</div>
					</Col>
					<Col lg={3}>
						<div className="footer-about">
							<h4>About</h4>
						</div>
					</Col>
					<Col lg={3}>
						<div className="footer-support">
							<h4>Support</h4>
						</div>
					</Col>
					<Col lg={3}>
						<div className="footer-connect">
							<h4>Connect</h4>
						</div>
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default Footer;
