import React, {useEffect, useCallback, useState} from "react";
import NavigationBar from "../NavigationBar";
import {Container, Row} from "react-bootstrap";
import ContentService from "../../services/contentService";
import PublicUserBox from "./PublicUserBox";

const UsersList = ({user}) => {
	const initialState = {
		loggedUser: user,
		users: [],
	};
	const [state, setState] = useState(initialState);
	const service = new ContentService();
	const getAllUsers = useCallback(() => {
		service
			.getAllUsers("/users")
			.then((res) => setState({...state, users: res}));
	}, [state, service]);
	useEffect(getAllUsers, []);
	const usersList = state.users.map((el) => (
		<PublicUserBox
			key={el._id}
			id={el._id}
			avatar={el.avatar}
			fullname={el.fullName}
		/>
	));
	return (
		<div id="usersList">
			<NavigationBar
				logo_url={
					"https://res.cloudinary.com/juligoodie/image/upload/v1598554049/Getaways.guru/logo_getaways_navbar_tpsd0w.svg"
				}
				user={user}
			/>
			<Container fluid className="top-nav">
				<div className="top-nav-wrapper">
					<h1 className="top-nav-title">Community</h1>
					<p className="top-nav-subtitle">
						Wear your best boots, your swimsuit, your backpack or your skis.
						There's a whole world waiting to be discovered. Get away and enjoy
						with the activities below.
					</p>
					<ul className="top-nav-meta d-flex align-items-center">
						<li>3 activities</li>
						<li>2 contributors</li>
					</ul>
				</div>
			</Container>
			<Container fluid className="mw-1600">
				<Row>
					<div className="box d-flex">
						<div className="col left"></div>
						<div className="col right">
							<div className="box wrapper d-flex">{usersList}</div>
						</div>
					</div>
				</Row>
			</Container>
		</div>
	);
};

export default UsersList;
