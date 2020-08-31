import React, {useState} from "react";
import {Modal, Form, Button} from "react-bootstrap";

const EditProfileModal = ({visibility, hideModal, user}) => {
	const initialState = {
		loggedUser: user,
	};
	const [state, setState] = useState(initialState);
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
				<Modal.Title>Edit profile</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group>
						<Form.Control type="file" name="avatar"></Form.Control>
					</Form.Group>
					<Form.Group>
						<Form.Label>Name</Form.Label>
						<Form.Control
							type="text"
							name="fullName"
							value={state.loggedUser.fullName}
						></Form.Control>
					</Form.Group>
					<Form.Group>
						<Form.Label>Bio</Form.Label>
						<Form.Control
							type="text"
							name="bio"
							value=""
							placeholder="Enter your bio"
						></Form.Control>
					</Form.Group>
					<Form.Group>
						<Form.Label>Loaction</Form.Label>
						<Form.Control
							type="text"
							name="loaction"
							value=""
							placeholder="Enter your location"
						></Form.Control>
					</Form.Group>
					<Form.Group>
						<Button variant="primary">Save changes</Button>
					</Form.Group>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default EditProfileModal;
