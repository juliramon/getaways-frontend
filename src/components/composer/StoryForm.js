import React, {useState} from "react";
import NavigationBar from "../NavigationBar";
import {Container, Row, Col, Breadcrumb, Form, Button} from "react-bootstrap";
import ContentService from "../../services/contentService";
import {useHistory} from "react-router-dom";

const StoryForm = ({user}) => {
	const initialState = {
		loggedUser: user,
		formData: {
			emptyForm: true,
			type: "story",
			title: "",
			subtitle: "",
			images: [],
			description: "",
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

	const submitStory = () => {
		const {type, title, subtitle, images, description} = state.formData;
		service
			.story(type, title, subtitle, images, description)
			.then(() => {
				setState({
					...state,
					formData: {
						emptyForm: true,
						type: "story",
						title: "",
						subtitle: "",
						images: [],
						description: "",
						isSubmitted: false,
					},
				});
				history.push("/dashboard");
			})
			.catch((err) => console.log(err));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		submitStory();
	};

	return (
		<div id="place">
			<NavigationBar
				logo_url={
					"https://res.cloudinary.com/juligoodie/image/upload/c_scale,q_100,w_135/v1600008855/getaways-guru/static-files/logo-getaways-guru_vvbikk.svg"
				}
				user={user}
			/>
			<Container fluid className="mw-1600">
				<Row>
					<Col lg={4} className="sided-shadow">
						<Breadcrumb>
							<Breadcrumb.Item href="#">Home</Breadcrumb.Item>
							<Breadcrumb.Item href="#">Create story</Breadcrumb.Item>
						</Breadcrumb>
						<div className="form-composer">
							<h1>Create Story</h1>
						</div>
						<Form onSubmit={handleSubmit}>
							<Form.Group>
								<Form.Label>Title</Form.Label>
								<Form.Control
									type="text"
									name="title"
									placeholder="Story title"
									onChange={handleChange}
									value={state.formData.title}
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Subtitle</Form.Label>
								<Form.Control
									type="text"
									name="subtitle"
									placeholder="Story subtitle"
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
								<Form.Label>Body</Form.Label>
								<Form.Control
									as="textarea"
									rows="5"
									type="text"
									name="description"
									placeholder="Story body"
									onChange={handleChange}
									value={state.formData.description}
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

export default StoryForm;
