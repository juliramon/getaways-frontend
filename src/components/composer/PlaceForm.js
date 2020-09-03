import React, {useState} from "react";
import NavigationBar from "../NavigationBar";
import {Container, Row, Col, Breadcrumb, Form, Button} from "react-bootstrap";
import ContentService from "../../services/contentService";
import {useHistory} from "react-router-dom";

const PlaceForm = ({user}) => {
	const initialState = {
		loggedUser: user,
		formData: {
			emptyForm: true,
			type: "place",
			title: "",
			subtitle: "",
			images: [],
			description: "",
			location: "",
			price: "",
			category: "",
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

	const submitPlace = () => {
		const {
			type,
			title,
			subtitle,
			images,
			description,
			location,
			status,
			price,
			category,
		} = state.formData;
		service
			.place(
				type,
				title,
				subtitle,
				images,
				description,
				location,
				status,
				price,
				category
			)
			.then(() => {
				setState({
					...state,
					formData: {
						emptyForm: true,
						type: "place",
						title: "",
						subtitle: "",
						images: [],
						description: "",
						location: "",
						price: "",
						category: "",
						isSubmitted: false,
					},
				});
				history.push("/dashboard");
			})
			.catch((err) => console.log(err));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		submitPlace();
	};

	return (
		<div id="place">
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
							<Breadcrumb.Item href="#">Create Place</Breadcrumb.Item>
						</Breadcrumb>
						<div className="form-composer">
							<h1>Create Place</h1>
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

export default PlaceForm;
