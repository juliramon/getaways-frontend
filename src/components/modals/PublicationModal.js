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
						<div className="col left">
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
						</div>
						<div className="col">
							<h3>Activity</h3>
							<p>
								Share your best activities or activities you manage to inspire
								others and get new clients
							</p>
						</div>
						<div className="col right">
							<Link to="/activity-composer" className="btn btn-primary">
								Create
							</Link>
						</div>
					</li>
					<li>
						<div className="col left">
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
						</div>
						<div className="col">
							<h3>Place</h3>
							<p>
								Share places you love or places you manage to inspire others and
								get new clients
							</p>
						</div>
						<div className="col right">
							<Link to="/place-composer" className="btn btn-primary">
								Create
							</Link>
						</div>
					</li>
				</ul>
			</Modal.Body>
		</Modal>
	);
};

export default PublicationModal;
