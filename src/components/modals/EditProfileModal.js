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
			className="editProfileModal"
		>
			<Modal.Header closeButton>
				<Modal.Title>Edit profile</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div
					className="cover-picture box bordered"
					style={{
						backgroundImage: `url("${user.cover}")`,
					}}
				></div>
				<Form onSubmit={handleSubmit} className="user-editor">
					<Form.Group className="user-avatar">
						<label>
							<Form.Control
								type="file"
								onChange={handleFileUpload}
								className="input-avatar-user"
							></Form.Control>
							<div className="avatar">
								<img
									src={state.formData.avatar}
									alt={state.formData.fullName}
								/>
								<div className="avatar-overlay">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="icon icon-tabler icon-tabler-camera-plus"
										width="44"
										height="44"
										viewBox="0 0 24 24"
										strokeWidth="1.5"
										stroke="#ffffff"
										fill="none"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path stroke="none" d="M0 0h24v24H0z" />
										<circle cx="12" cy="13" r="3" />
										<path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h2m9 7v7a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
										<line x1="15" y1="6" x2="21" y2="6" />
										<line x1="18" y1="3" x2="18" y2="9" />
									</svg>
								</div>
							</div>
						</label>
					</Form.Group>
					<Form.Group>
						<Form.Label>Name</Form.Label>
						<Form.Control
							type="text"
							name="fullName"
							defaultValue={state.formData.fullName}
							onChange={handleChange}
							placeholder="Enter your full name"
						></Form.Control>
					</Form.Group>
					<Form.Group>
						<Form.Label>Username</Form.Label>
						<Form.Control
							type="text"
							name="username"
							defaultValue={state.formData.username}
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
							defaultValue={state.formData.bio}
							placeholder="Enter your bio"
							onChange={handleChange}
						></Form.Control>
					</Form.Group>
					<Form.Group>
						<Form.Label>Location</Form.Label>
						<Form.Control
							type="text"
							name="location"
							defaultValue={state.formData.location}
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
