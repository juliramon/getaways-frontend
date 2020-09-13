import React, {useState, useEffect, useCallback} from "react";
import {useHistory} from "react-router-dom";
import NavigationBar from "../NavigationBar";
import {Container, Row, Col, Breadcrumb, Form, Button} from "react-bootstrap";
import ContentService from "../../services/contentService";

const StoryEditionForm = (props) => {
	const initialState = {
		loggedUser: props.user,
		id: props.match.params.id,
		story: {},
	};
	const [state, setState] = useState(initialState);
	const service = new ContentService();
	const history = useHistory();

	const getStoryDetails = useCallback(() => {
		service.getStoryDetails(state.id).then((res) => {
			setState({...state, story: res});
		});
	}, [state, service]);

	useEffect(getStoryDetails, []);

	const {title, subtitle, image, description} = state.story;

	const handleChange = (e) =>
		setState({
			...state,
			story: {...state.story, [e.target.name]: e.target.value},
		});

	const handleSubmit = (e) => {
		e.preventDefault();
		const {_id, title, subtitle, description} = state.story;
		service
			.editStory(_id, title, subtitle, description)
			.then(() => history.push("/dashboard"));
	};

	return (
		<div id="editForm" className="composer">
			<NavigationBar
				logo_url={
					"https://res.cloudinary.com/juligoodie/image/upload/c_scale,q_100,w_135/v1600008855/getaways-guru/static-files/logo-getaways-guru_vvbikk.svg"
				}
				user={props.user}
			/>
			<Container fluid className="mw-1600">
				<Row>
					<Col lg={4} className="sided-shadow">
						<Breadcrumb>
							<Breadcrumb.Item href="#">Home</Breadcrumb.Item>
							<Breadcrumb.Item href="#">Edit Story</Breadcrumb.Item>
						</Breadcrumb>
						<div className="form-composer">
							<h1>Edit Story</h1>
						</div>
						<Form onSubmit={handleSubmit}>
							<Form.Group>
								<Form.Label>Title</Form.Label>
								<Form.Control
									type="text"
									name="title"
									placeholder="Story title"
									defaultValue={title}
									onChange={handleChange}
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Subtitle</Form.Label>
								<Form.Control
									type="text"
									name="subtitle"
									placeholder="Story subtitle"
									defaultValue={subtitle}
									onChange={handleChange}
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Image</Form.Label>
								<Form.Control
									type="text"
									name="image"
									placeholder="Story image"
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
									placeholder="Story description"
									defaultValue={description}
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

export default StoryEditionForm;
