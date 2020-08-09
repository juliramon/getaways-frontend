import React, {useState} from "react";
import {useHistory, Link} from "react-router-dom";
import {Form, Button} from "react-bootstrap";
import AuthService from "../../services/auth-service";

const Login = (props) => {
	const initialState = {
		formData: {
			email: "",
			password: "",
		},
	};
	const [state, setState] = useState(initialState);
	const service = new AuthService();
	const history = useHistory();
	const handleChange = (e) => {
		setState({
			...state,
			formData: {...state.formData, [e.target.name]: e.target.value},
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		const {email, password} = state.formData;
		service
			.login(email, password)
			.then((res) => {
				setState(initialState);
				props.getUserDetails(res);
				history.push("/feed");
			})
			.catch((err) => console.log(err));
	};
	return (
		<section id="signup">
			<div className="d-flex">
				<div className="signup-col left">
					<div className="title-area">
						<Link to="/">
							<img src="../../logo-getaways-guru.svg" alt="" />
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
							Not have an account yet? <Link to="/signup">Sign up</Link>
						</div>
						<div className="title-area">
							<h1>Log in to Getaways.guru</h1>
							<p className="sub-h1">
								Access your account to easily search, find and book your next
								perfect getaways.
							</p>
						</div>
						<div className="social-signup d-flex align-items-center">
							<button type="submit" className="btn google">
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
								Log in with Google
							</button>
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
										style={{fill: "#666666"}}
									/>
								</svg>
							</button>
						</div>
						<Form onSubmit={handleSubmit}>
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
							<Button type="submit">Log in</Button>
						</Form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Login;
