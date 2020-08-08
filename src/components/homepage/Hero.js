import React from "react";
import {Container, Row, Col} from "react-bootstrap";
import SearchBar from "./SearchBar";
import {Link} from "react-router-dom";

const Hero = ({background_url, title, subtitle}) => {
	return (
		<section
			id="hero"
			style={{
				background: `linear-gradient(rgba(46,105,228,.2), rgba(46,105,228,.3)),url('${background_url}')`,
			}}
		>
			<Container>
				<Row>
					<Col lg={12}>
						<div className="wrapper">
							<div className="header-col left">
								<h1 className="header-title">{title}</h1>
								<p className="header-subtitle">{subtitle}</p>
								<SearchBar />
							</div>
						</div>
					</Col>
				</Row>
				<div className="header-indicator d-flex align-items-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="icon icon-tabler icon-tabler-route"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="#fff"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path stroke="none" d="M0 0h24v24H0z" />
						<circle cx="6" cy="19" r="2" />
						<circle cx="18" cy="5" r="2" />
						<path d="M12 19h4.5a3.5 3.5 0 0 0 0 -7h-8a3.5 3.5 0 0 1 0 -7h3.5" />
					</svg>
					<p>
						<b>McWay Falls</b>, Big Sur, California |
						<Link to="/">
							<b> Check getaway</b>{" "}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="icon icon-tabler icon-tabler-arrow-narrow-right"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="#ffffff"
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path stroke="none" d="M0 0h24v24H0z" />
								<line x1="5" y1="12" x2="19" y2="12" />
								<line x1="15" y1="16" x2="19" y2="12" />
								<line x1="15" y1="8" x2="19" y2="12" />
							</svg>
						</Link>
					</p>
				</div>
			</Container>
		</section>
	);
};

export default Hero;
