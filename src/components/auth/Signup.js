import React, {useState, useEffect} from "react";
import {Form, Button, Alert} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";
import AuthService from "../../services/authService";
import GoogleLogin from "react-google-login";

const Signup = (props) => {
	const history = useHistory();
	if (props.user !== null) {
		history.push("/feed");
	}
	const initialState = {
		formData: {
			fullName: "",
			email: "",
			password: "",
		},
		errorMessage: {},
		googleResponse: {
			received: false,
			data: {},
		},
	};
	const [state, setState] = useState(initialState);
	const service = new AuthService();
	const handleChange = (e) => {
		setState({
			...state,
			formData: {...state.formData, [e.target.name]: e.target.value},
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		const {fullName, email, password} = state.formData;
		service
			.signup(fullName, email, password)
			.then((res) => {
				if (res.status) {
					console.log("error =>", res);
					setState({
						...state,
						errorMessage: res,
					});
				} else {
					console.log("signed up =>", res);
					setState(initialState);
					props.getUserDetails(res);
					history.push("/feed");
				}
			})
			.catch((err) => console.log(err));
	};

	const responseGoogle = (response) => {
		console.log(response);
		setState({
			...state,
			googleResponse: {
				received: true,
				data: response.profileObj,
			},
		});
	};

	const signupGoogle = () => {
		if (state.googleResponse.data) {
			const {name, email, imageUrl} = state.googleResponse.data;
			console.log({
				name,
				email,
				imageUrl,
			});
			service
				.googleAuth(name, email, imageUrl)
				.then((res) => {
					if (res.status) {
						console.log("error =>", res);
						setState({
							...state,
							errorMessage: res,
							googleResponse: {
								...state.googleResponse,
								received: false,
							},
						});
					} else {
						console.log("respuesta del servidor =>", res);
						setState(initialState);
						props.getUserDetails(res);
						history.push("/feed");
					}
				})
				.catch((err) => console.log(err));
		}
	};

	useEffect(() => {
		if (state.googleResponse.received) {
			signupGoogle();
		}
	});

	let errorMessage;
	if (state.errorMessage.message) {
		if (
			state.errorMessage.message ===
			"Please provide fullname, email and password"
		) {
			errorMessage = (
				<Alert variant="danger">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="icon icon-tabler icon-tabler-shield-x"
						width="18"
						height="18"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="#fff"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path stroke="none" d="M0 0h24v24H0z" />
						<path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" />
						<path d="M10 10l4 4m0 -4l-4 4" />
					</svg>
					{state.errorMessage.message}
				</Alert>
			);
		} else if (
			state.errorMessage.message ===
			"Please provide a stronger password of at least 8 alphanumeric characters"
		) {
			errorMessage = (
				<Alert variant="danger">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="icon icon-tabler icon-tabler-key"
						width="18"
						height="18"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="#ffffff"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path stroke="none" d="M0 0h24v24H0z" />
						<circle cx="8" cy="15" r="4" />
						<line x1="10.85" y1="12.15" x2="19" y2="4" />
						<line x1="18" y1="5" x2="20" y2="7" />
						<line x1="15" y1="8" x2="17" y2="10" />
					</svg>
					{state.errorMessage.message}
				</Alert>
			);
		} else if (
			state.errorMessage.message === "Email already exists. Choose another one"
		) {
			errorMessage = (
				<Alert variant="danger">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="icon icon-tabler icon-tabler-at"
						width="18"
						height="18"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="#ffffff"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path stroke="none" d="M0 0h24v24H0z" />
						<circle cx="12" cy="12" r="4" />
						<path d="M16 12v1.5a2.5 2.5 0 0 0 5 0v-1.5a9 9 0 1 0 -5.5 8.28" />
					</svg>
					{state.errorMessage.message}
				</Alert>
			);
		}
	} else {
		errorMessage = null;
	}

	return (
		<section id="signup">
			<div className="d-flex">
				<div className="signup-col left">
					<div className="title-area">
						<Link to="/">
							<img
								src="https://res.cloudinary.com/juligoodie/image/upload/v1598554049/Getaways.guru/logo_getaways_navbar_tpsd0w.svg"
								alt=""
							/>
						</Link>
						<h2>Discover the world's top getaways and places to escape to.</h2>
					</div>
					<div className="graphic">
						<img src="../../signup-graphic.svg" alt="" />
					</div>
				</div>
				<div className="signup-col right">
					<div className="signup-col-wrapper right">
						<div className="navlink">
							Already have an account? <Link to="/login">Log in</Link>
						</div>
						<div className="title-area">
							<h1>Sign up to Getaways.guru</h1>
							<p className="sub-h1">
								Create an account to easily search, find and book your next
								perfect getaways.
							</p>
						</div>
						<div className="social-signup d-flex align-items-center">
							<GoogleLogin
								clientId={
									"1001464092709-hi8kknnaqhokalsior0s2kukhtupa7a8.apps.googleusercontent.com"
								}
								render={(renderProps) => (
									<button
										type="submit"
										className="btn google"
										onClick={renderProps.onClick}
										disabled={renderProps.disabled}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="icon icon-tabler icon-tabler-brand-google"
											width="18"
											height="18"
											viewBox="0 0 24 24"
											strokeWidth="3"
											stroke="#ffffff"
											fill="none"
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<path stroke="none" d="M0 0h24v24H0z" />
											<path d="M17.788 5.108A9 9 0 1021 12h-8" />
										</svg>
										Sign up with Google
									</button>
								)}
								buttonText="Sign up with Google"
								onSuccess={responseGoogle}
								onFailure={responseGoogle}
								cookiePolicy={"single_host_origin"}
							/>

							<button type="submit" className="btn facebook">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="icon icon-tabler icon-tabler-brand-facebook"
									width="25"
									height="25"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="none"
									fill="none"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path stroke="none" d="M0 0h24v24H0z" />
									<path
										d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3"
										style={{fill: "#173572"}}
									/>
								</svg>
							</button>
						</div>
						<Form onSubmit={handleSubmit}>
							{errorMessage}
							<div className="d-flex">
								<Form.Group>
									<Form.Label>Name</Form.Label>
									<Form.Control
										type="text"
										name="fullName"
										onChange={handleChange}
										placeholder="Enter your full name"
									/>
								</Form.Group>
							</div>
							<Form.Group>
								<Form.Label>Email</Form.Label>
								<Form.Control
									type="email"
									name="email"
									onChange={handleChange}
									placeholder="Enter your email address"
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Password</Form.Label>
								<Form.Control
									type="password"
									name="password"
									onChange={handleChange}
									placeholder="6+ characters"
								/>
							</Form.Group>
							<Button type="submit">Create account</Button>
						</Form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Signup;
