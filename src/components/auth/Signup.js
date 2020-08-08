import React, {useState} from "react";
import {Form, Button} from "react-bootstrap";
import {Link} from "react-router-dom";

const Signup = () => {
	const initialState = {
		formData: {
			name: "",
			email: "",
			password: "",
		},
	};
	const [state, setState] = useState(initialState);

	const handleChange = (e) => {
		setState({
			...state,
			formData: {...state.formData, [e.target.name]: e.target.value},
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
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
								Sign up with Google
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
							<div className="d-flex">
								<Form.Group>
									<Form.Label>Name</Form.Label>
									<Form.Control
										type="text"
										name="name"
										onChange={handleChange}
										placeholder="Enter your full name"
									/>
								</Form.Group>
								<Form.Group>
									<Form.Label>Username</Form.Label>
									<Form.Control
										type="text"
										name="username"
										onChange={handleChange}
										placeholder="Set a username"
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
