import React, {useState, useEffect, useCallback} from "react";
import {useHistory} from "react-router-dom";
import NavigationBar from "../NavigationBar";
import {Container, Row, Col, Breadcrumb, Form, Button} from "react-bootstrap";
import ContentService from "../../services/contentService";

const PlaceEditionForm = (props) => {
	const initialState = {
		loggedUser: props.user,
		id: props.match.params.id,
		place: {},
	};
	const [state, setState] = useState(initialState);
	const service = new ContentService();
	const history = useHistory();

	const getPlaceDetails = useCallback(() => {
		service.getPlaceDetails(state.id).then((res) => {
			setState({...state, place: res});
		});
	}, [state, service]);

	useEffect(getPlaceDetails, []);

	const {title, subtitle, image, description, location} = state.place;

	const handleChange = (e) =>
		setState({
			...state,
			place: {...state.place, [e.target.name]: e.target.value},
		});

	const handleSubmit = (e) => {
		e.preventDefault();
		const {_id, title, subtitle, description, location} = state.place;
		service
			.editPlace(_id, title, subtitle, description, location)
			.then(() => history.push("/dashboard"));
	};

	return (
		<div id="editForm" className="composer">
			<NavigationBar
				logo_url={
					"https://res.cloudinary.com/juligoodie/image/upload/v1598554049/Getaways.guru/logo_getaways_navbar_tpsd0w.svg"
				}
				user={props.user}
			/>
			<Container fluid className="mw-1600">
				<Row>
					<Col lg={4} className="sided-shadow">
						<Breadcrumb>
							<Breadcrumb.Item href="#">Home</Breadcrumb.Item>
							<Breadcrumb.Item href="#">Edit Place</Breadcrumb.Item>
						</Breadcrumb>
						<div className="form-composer">
							<h1>Edit Place</h1>
						</div>
						<Form onSubmit={handleSubmit}>
							<Form.Group>
								<Form.Label>Title</Form.Label>
								<Form.Control
									type="text"
									name="title"
									placeholder="Place title"
									defaultValue={title}
									onChange={handleChange}
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Subtitle</Form.Label>
								<Form.Control
									type="text"
									name="subtitle"
									placeholder="Place subtitle"
									defaultValue={subtitle}
									onChange={handleChange}
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Image</Form.Label>
								<Form.Control
									type="text"
									name="image"
									placeholder="Place image"
									defaultValue={image}
									onChange={handleChange}
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Description</Form.Label>
								<Form.Control
									as="textarea"
									rows="5"
									type="text"
									name="description"
									placeholder="Place description"
									defaultValue={description}
									onChange={handleChange}
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Location</Form.Label>
								<Form.Control
									type="text"
									name="location"
									placeholder="Place location"
									defaultValue={location}
									onChange={handleChange}
								/>
							</Form.Group>
							<div className="buttons d-flex justify-space-between">
								<Button type="submit" variant="primary">
									Post
								</Button>
							</div>
						</Form>
					</Col>
					<Col lg={8}></Col>
				</Row>
			</Container>
		</div>
	);
};

export default PlaceEditionForm;
