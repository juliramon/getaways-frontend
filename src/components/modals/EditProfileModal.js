import React, {useState} from "react";
import {Modal, Form, Button} from "react-bootstrap";
import ContentService from "../../services/contentService";

const EditProfileModal = ({visibility, hideModal, user, refreshUserData}) => {
	const initialState = {
		loggedUser: user,
		formData: {
			avatar: user.avatar,
			fullName: user.fullName,
			username: user.username,
			bio: user.bio,
			location: user.location,
		},
	};
	const [state, setState] = useState(initialState);
	const service = new ContentService();

	const handleChange = (e) => {
		setState({
			...state,
			formData: {...state.formData, [e.target.name]: e.target.value},
		});
	};

	const handleFileUpload = (e) => {
		const fileToUpload = e.target.files[0];
		const uploadData = new FormData();
		uploadData.append("imageUrl", fileToUpload);
		service
			.uploadFile(uploadData)
			.then((res) =>
				setState({...state, formData: {...state.formData, avatar: res.path}})
			);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const {_id} = state.loggedUser;
		const {avatar, fullName, username, bio, location} = state.formData;
		console.log(_id, avatar, fullName, username, bio, location);
		service
			.editProfile(_id, avatar, fullName, username, bio, location)
			.then(() => {
				hideModal();
				refreshUserData();
			});
	};

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
				<Form onSubmit={handleSubmit}>
					<Form.Group>
						<Form.Control
							type="file"
							onChange={handleFileUpload}
						></Form.Control>
					</Form.Group>
					<Form.Group>
						<Form.Label>Name</Form.Label>
						<Form.Control
							type="text"
							name="fullName"
							defaultValue={state.loggedUser.fullName}
							onChange={handleChange}
							placeholder="Enter your full name"
						></Form.Control>
					</Form.Group>
					<Form.Group>
						<Form.Label>Username</Form.Label>
						<Form.Control
							type="text"
							name="username"
							defaultValue={state.loggedUser.username}
							placeholder="Choose your username"
							onChange={handleChange}
						></Form.Control>
					</Form.Group>
					<Form.Group>
						<Form.Label>Bio</Form.Label>
						<Form.Control
							as="textarea"
							rows="3"
							type="text"
							name="bio"
							defaultValue={state.loggedUser.bio}
							placeholder="Enter your bio"
							onChange={handleChange}
						></Form.Control>
					</Form.Group>
					<Form.Group>
						<Form.Label>Location</Form.Label>
						<Form.Control
							type="text"
							name="location"
							defaultValue={state.loggedUser.location}
							placeholder="Enter your location"
							onChange={handleChange}
						></Form.Control>
					</Form.Group>
					<Form.Group>
						<Button variant="primary" type="submit">
							Save changes
						</Button>
					</Form.Group>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default EditProfileModal;
