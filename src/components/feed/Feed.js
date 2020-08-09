import React from "react";
import NavigationBar from "../NavigationBar";
import {Container, Row, Col} from "react-bootstrap";

const Feed = (props) => {
	return (
		<div id="feed">
			<NavigationBar logo_url={"../logo-getaways-guru.svg"} user={props.user} />
			<Container>
				<Row>
					<Col lg={12}>
						<h1>The feed</h1>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default Feed;
