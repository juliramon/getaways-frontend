import React, {useState, useEffect, useCallback} from "react";
import {useHistory} from "react-router-dom";
import NavigationBar from "../NavigationBar";
import {Container, Row, Col, Breadcrumb, Form, Button} from "react-bootstrap";
import ContentService from "../../services/contentService";

const EditionForm = (props) => {
	const initialState = {
		loggedUser: props.user,
		id: props.match.params.id,
		activity: {},
	};
	const [state, setState] = useState(initialState);
	const service = new ContentService();
	const history = useHistory();
	const [dropCap, setDropCap] = useState("");

	const getActivityDetails = useCallback(() => {
		service.activityDetails(state.id).then((res) => {
			setState({...state, activity: res});
		});
	}, [state, service]);

	useEffect(getActivityDetails, []);

	useEffect(() => {
		const userName = state.loggedUser.fullName;
		const dropCap = userName.charAt(0);
		setDropCap(dropCap);
	}, [state.loggedUser]);

	const {title, subtitle, image, description, location} = state.activity;

	const handleChange = (e) =>
		setState({
			...state,
			activity: {...state.activity, [e.target.name]: e.target.value},
		});

	const handleSubmit = (e) => {
		e.preventDefault();
		const {_id, title, subtitle, description, location} = state.activity;
		service
			.editActivity(_id, title, subtitle, description, location)
			.then(() => history.push("/dashboard"));
	};

	return (
		<div id="activity" className="composer">
			<NavigationBar
				logo_url={
					"https://res.cloudinary.com/juligoodie/image/upload/v1598554049/Getaways.guru/logo_getaways_navbar_tpsd0w.svg"
				}
				user={props.user}
				dropCap={dropCap}
			/>
			<Container fluid className="mw-1600">
				<Row>
					<Col lg={4} className="sided-shadow">
						<Breadcrumb>
							<Breadcrumb.Item href="#">Home</Breadcrumb.Item>
							<Breadcrumb.Item href="#">Create Activity</Breadcrumb.Item>
						</Breadcrumb>
						<div className="form-composer">
							<h1>Create Activity</h1>
						</div>
						<Form onSubmit={handleSubmit}>
							<Form.Group>
								<Form.Label>Title</Form.Label>
								<Form.Control
									type="text"
									name="title"
									placeholder="Activity title"
									defaultValue={title}
									onChange={handleChange}
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Subtitle</Form.Label>
								<Form.Control
									type="text"
									name="subtitle"
									placeholder="Activity subtitle"
									defaultValue={subtitle}
									onChange={handleChange}
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Image</Form.Label>
								<Form.Control
									type="text"
									name="image"
									placeholder="Activity image"
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
									placeholder="Activity description"
									defaultValue={description}
									onChange={handleChange}
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Location</Form.Label>
								<Form.Control
									type="text"
									name="location"
									placeholder="Activity location"
									defaultValue={location}
									onChange={handleChange}
								/>
							</Form.Group>
							<div className="buttons d-flex justify-space-between">
								<Button type="submit">Save draft</Button>
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

export default EditionForm;
