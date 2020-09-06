import React, {useState} from "react";
import NavigationBar from "../NavigationBar";
import {Container, Row, Col, Breadcrumb, Form, Button} from "react-bootstrap";
import ContentService from "../../services/contentService";
import {useHistory} from "react-router-dom";

const ActivityForm = ({user}) => {
	const initialState = {
		loggedUser: user,
		formData: {
			emptyForm: true,
			type: "activity",
			title: "",
			subtitle: "",
			images: [],
			description: "",
			location: "",
			isSubmitted: false,
		},
	};
	const [state, setState] = useState(initialState);
	const service = new ContentService();
	const history = useHistory();

	const handleFileUpload = (e) => {
		const fileToUpload = e.target.files[0];
		const uploadData = new FormData();
		uploadData.append("imageUrl", fileToUpload);
		service.uploadFile(uploadData).then((res) => {
			setState({
				...state,
				formData: {
					...state.formData,
					images: [...state.formData.images, res.path],
				},
			});
		});
	};

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
		const {
			type,
			title,
			subtitle,
			images,
			description,
			location,
		} = state.formData;
		service
			.activity(type, title, subtitle, images, description, location)
			.then(() => {
				setState({
					...state,
					formData: {
						emptyForm: true,
						type: "activity",
						title: "",
						subtitle: "",
						images: [],
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
				logo_url={
					"https://res.cloudinary.com/juligoodie/image/upload/v1598554049/Getaways.guru/logo_getaways_navbar_tpsd0w.svg"
				}
				user={user}
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
								<Form.Control type="file" onChange={handleFileUpload} />
							</Form.Group>
							<Form.Group>
								<Form.Label>Image</Form.Label>
								<Form.Control type="file" onChange={handleFileUpload} />
							</Form.Group>
							<Form.Group>
								<Form.Label>Image</Form.Label>
								<Form.Control type="file" onChange={handleFileUpload} />
							</Form.Group>
							<Form.Group>
								<Form.Label>Image</Form.Label>
								<Form.Control type="file" onChange={handleFileUpload} />
							</Form.Group>
							<Form.Group>
								<Form.Label>Image</Form.Label>
								<Form.Control type="file" onChange={handleFileUpload} />
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
								<Button type="submit" variant="primary">
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
