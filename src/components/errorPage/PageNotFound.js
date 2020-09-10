import React from "react";
import {Container, Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";

const PageNotFound = () => {
	return (
		<div id="404NotFound">
			<Container>
				<Row>
					<Col lg={12}>
						<h1>Oops! 404 not found</h1>
						<Link to="/">Go home</Link>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default PageNotFound;
