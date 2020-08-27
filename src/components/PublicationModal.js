import React from "react";
import {Modal} from "react-bootstrap";
import {Link} from "react-router-dom";

const PublicationModal = ({visibility, hideModal}) => {
	return (
		<Modal
			show={visibility}
			onHide={hideModal}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			className="publicationModal"
		>
			<Modal.Header closeButton>
				<Modal.Title>Create a post</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<ul className="d-flex flex-column">
					<li>
						<div className="col"></div>
						<div className="col">
							<h3>Activity</h3>
							<p>Lorem ipsum</p>
						</div>
						<div className="col">
							<Link to="/activity-composer" className="btn btn-primary">
								Create
							</Link>
						</div>
					</li>
					<li>
						<div className="col"></div>
						<div className="col">
							<h3>Place</h3>
							<p>Lorem ipsum</p>
						</div>
						<div className="col"></div>
					</li>
					<li>
						<div className="col"></div>
						<div className="col">
							<h3>Story</h3>
							<p>Lorem ipsum</p>
						</div>
						<div className="col"></div>
					</li>
				</ul>
			</Modal.Body>
		</Modal>
	);
};

export default PublicationModal;
