import React, {useEffect, useState} from "react";
import NavigationBar from "../NavigationBar";
import {Container, Row, Spinner} from "react-bootstrap";
import ContentService from "../../services/contentService";
import PublicContentBox from "../listings/PublicContentBox";

const BookmarksList = (props) => {
	const initialState = {
		loggedUser: props.user,
		id: props.match.params.id,
		bookmarks: [],
		hasBookmarks: false,
	};
	const [state, setState] = useState(initialState);
	const service = new ContentService();
	useEffect(() => {
		const fetchData = async () => {
			const userBookmarks = await service.getUserActiveBookmarks();
			let allBookmarks = [];
			userBookmarks.map((el) => allBookmarks.push(el));
			let hasBookmarks;
			allBookmarks ? (hasBookmarks = true) : (hasBookmarks = false);
			setState({
				...state,
				bookmarks: allBookmarks,
				hasBookmarks: hasBookmarks,
			});
		};
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (state.hasBookmarks === false) {
		return (
			<Container className="spinner d-flex justify-space-between">
				<Spinner animation="border" role="status" variant="primary">
					<span className="sr-only">Loading...</span>
				</Spinner>
			</Container>
		);
	}

	const bookmarks = state.bookmarks;
	let bookmarksList;
	if (bookmarks.length > 0) {
		bookmarksList = bookmarks.map((el) => (
			<PublicContentBox
				key={el._id}
				type={el.bookmarkActivityRef.type}
				id={el.bookmarkActivityRef._id}
				title={el.bookmarkActivityRef.title}
				subtitle={el.bookmarkActivityRef.subtitle}
				image={el.bookmarkActivityRef.images[0]}
				location={el.bookmarkActivityRef.location}
			/>
		));
	} else {
		bookmarksList = (
			<div className="box empty d-flex">
				<div className="media">
					<img src="../../no-bookmarks.svg" alt="Graphic no bookmarks" />
				</div>
				<div className="text">
					<p>
						Oh no, this looks so empty.
						<br />
						Search and bookmark listings to read them
						<br /> when you are ready.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div id="bookmarksList">
			<NavigationBar
				logo_url={
					"https://res.cloudinary.com/juligoodie/image/upload/v1598554049/Getaways.guru/logo_getaways_navbar_tpsd0w.svg"
				}
				user={props.user}
			/>
			<Container fluid className="mw-1600">
				<Row>
					<div className="box d-flex">
						<div className="col left">
							<div className="box bordered">
								<div className="page-meta">
									<div className="page-header d-flex">
										<h1 className="page-title">Bookmarks</h1>
									</div>
									<ul>
										<li className="page-bookmarks">
											<span>{state.bookmarks.length}</span>{" "}
											{state.bookmarks.length > 1 ? "bookmarks" : "bookmark"}
										</li>
										<hr />
										<li className="page-description">
											Find here your bookmarked activities, places and stories.
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div className="col center">
							<div className="content-bar">{bookmarksList}</div>
						</div>
						<div className="col right"></div>
					</div>
				</Row>
			</Container>
		</div>
	);
};

export default BookmarksList;
