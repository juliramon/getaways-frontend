import React, {useState, useEffect} from "react";
import NavigationBar from "../NavigationBar";
import {
	Container,
	Row,
	Col,
	Breadcrumb,
	Form,
	Button,
	Toast,
} from "react-bootstrap";
import ContentService from "../../services/contentService";
import {useHistory} from "react-router-dom";

const ActivityForm = ({user}) => {
	const initialState = {
		loggedUser: user,
		formData: {
			emptyForm: true,
			title: "",
			subtitle: "",
			image: "",
			description: "",
			location: "",
			isSubmitted: false,
		},
	};
	const [state, setState] = useState(initialState);
	const service = new ContentService();
	const [dropCap, setDropCap] = useState("");
	const history = useHistory();

	useEffect(() => {
		const userName = state.loggedUser.fullName;
		const dropCap = userName.charAt(0);
		setDropCap(dropCap);
	}, [state.loggedUser]);

	const handleChange = (e) => {
		setState({
			...state,
			formData: {
				...state.formData,
				[e.target.name]: e.target.value,
				emptyForm: false,
			},
		});
	};

	const submitActivity = () => {
		const {title, subtitle, description, location} = state.formData;
		service
			.activity(title, subtitle, description, location)
			.then(() => {
				setState({
					...state,
					formData: {
						emptyForm: true,
						title: "",
						subtitle: "",
						image: "",
						description: "",
						location: "",
						isSubmitted: true,
					},
				});
				history.push("/dashboard");
			})
			.catch((err) => console.log(err));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		submitActivity();
	};

	const toast = (
		<Toast
			onClose={() =>
				setState({...state, formData: {...state.formData, isSubmitted: false}})
			}
			show={state.formData.isSubmitted}
			delay={5000}
			autohide
		>
			<Toast.Header>
				<img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
				<strong className="mr-auto">Getaways.guru</strong>
				<small>1 secs ago</small>
			</Toast.Header>
			<Toast.Body>Woohoo, your new activity has been posted!</Toast.Body>
		</Toast>
	);

	let contentPreview;
	if (state.formData.emptyForm) {
		contentPreview = (
			<div className="preview">
				<h1>Create an Activity</h1>
				<p>Fill the form to preview your activity before posting it</p>
			</div>
		);
	} else {
		contentPreview = (
			<div className="preview">
				<h1>{state.formData.title}</h1>
				<p>{state.formData.subtitle}</p>
				<p>{state.formData.description}</p>
				<p>{state.formData.location}</p>
			</div>
		);
	}
	return (
		<div id="activity" className="composer">
			<NavigationBar
				logo_url={"../logo-getaways-guru.svg"}
				user={user}
				dropCap={dropCap}
			/>
			<Container fluid className="mw-1600">
				{state.formData.isSubmitted ? toast : null}
				<Row>
					<Col lg={4} className="sided-shadow">
						<Breadcrumb>
							<Breadcrumb.Item href="#">Home</Breadcrumb.Item>
							<Breadcrumb.Item href="#">Create Activity</Breadcrumb.Item>
						</Breadcrumb>
						<div className="form-composer">
							<h1>Create Activity</h1>
						</div>
						<Form>
							<Form.Group>
								<Form.Label>Title</Form.Label>
								<Form.Control
									type="text"
									name="title"
									placeholder="Activity title"
									onChange={handleChange}
									value={state.formData.title}
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Subtitle</Form.Label>
								<Form.Control
									type="text"
									name="subtitle"
									placeholder="Activity subtitle"
									onChange={handleChange}
									value={state.formData.subtitle}
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Image</Form.Label>
								<Form.Control
									type="text"
									name="image"
									placeholder="Activity image"
									onChange={handleChange}
									value={state.formData.image}
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
									onChange={handleChange}
									value={state.formData.description}
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Location</Form.Label>
								<Form.Control
									type="text"
									name="location"
									placeholder="Activity location"
									onChange={handleChange}
									value={state.formData.location}
								/>
							</Form.Group>
							<div className="buttons d-flex justify-space-between">
								<Button type="submit">Save draft</Button>
								<Button type="submit" variant="primary" onClick={handleSubmit}>
									Post
								</Button>
							</div>
						</Form>
					</Col>
					<Col lg={8}>{contentPreview}</Col>
				</Row>
			</Container>
		</div>
	);
};

export default ActivityForm;
