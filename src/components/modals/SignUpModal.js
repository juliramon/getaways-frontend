import React from "react";
import {Modal} from "react-bootstrap";
import {Link} from "react-router-dom";

const SignUpModal = ({visibility, hideModal}) => {
	return (
		<Modal
			show={visibility}
			onHide={hideModal}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			className="signUpModal"
		>
			<Modal.Body>
				<div className="body-wrapper">
					<img src="../../sign-up-asset.svg" alt="Sign up to Getaways.guru" />
					<h1 className="modal-title">Sign up to bookmark</h1>
					<p className="modal-subtitle">
						Create your free account to save, search and find your next perfect
						getaways
					</p>
					<Link to="/signup" className="btn btn-primary text-center">
						Sign up
					</Link>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default SignUpModal;
