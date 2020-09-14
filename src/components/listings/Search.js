import React, {useEffect, useState} from "react";
import {Container, Row, Spinner} from "react-bootstrap";
import NavigationBar from "../NavigationBar";
import ContentService from "../../services/contentService";
import PublicContentBox from "./PublicContentBox";
import {Link} from "react-router-dom";

const Search = (props) => {
	const initialState = {
		loggedUser: props.user,
		searchQuery: props.location.search,
		isFetching: false,
		hasResults: false,
		searchResults: [],
	};
	const [state, setState] = useState(initialState);

	const service = new ContentService();

	useEffect(() => {
		const fetchData = async () => {
			setState({...state, isFetching: true});
			const searchQueryResults = await service.searchBarQuery(
				state.searchQuery
			);
			console.log(searchQueryResults);
			let hasResults;
			searchQueryResults.length > 0
				? (hasResults = true)
				: (hasResults = false);
			setState({
				...state,
				isFetching: false,
				hasResults: hasResults,
				searchResults: searchQueryResults,
			});
		};
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (state.isFetching === true) {
		return (
			<Container className="spinner d-flex justify-space-between">
				<Spinner animation="border" role="status" variant="primary">
					<span className="sr-only">Loading...</span>
				</Spinner>
			</Container>
		);
	}

	let searchResultsList;
	const searchResultsLength = state.searchResults.length;
	if (searchResultsLength === 0) {
		searchResultsList = (
			<div className="box empty d-flex">
				<div className="media">
					<img src="../../empty-search-results.svg" alt="Graphic no results" />
				</div>
				<div className="text">
					<p>
						Damn, this looks so empty.
						<br />
						Refine your search to get better results.
					</p>
					<Link to={"/"} className="btn btn-primary text-center">
						Search again
					</Link>
				</div>
			</div>
		);
	} else {
		searchResultsList = state.searchResults.map((el) => {
			let location;
			if (el.type === "activity") {
				location = `${
					el.activity_locality === undefined ? "" : el.activity_locality
				} ${el.activity_locality === undefined ? "" : ","} ${
					el.activity_province || el.activity_state
				}, ${el.activity_country}`;
			} else {
				location = `${
					el.place_locality === undefined ? "" : el.place_locality
				}${el.place_locality === undefined ? "" : ","} ${
					el.place_province || el.place_state
				}, ${el.place_country}`;
			}

			return (
				<PublicContentBox
					key={el._id}
					image={el.images[0]}
					id={el._id}
					title={el.title}
					subtitle={el.subtitle}
					type={el.type}
					location={location}
				/>
			);
		});
	}

	return (
		<div id="searchPage">
			<NavigationBar
				logo_url={
					"https://res.cloudinary.com/juligoodie/image/upload/c_scale,q_100,w_135/v1600008855/getaways-guru/static-files/logo-getaways-guru_vvbikk.svg"
				}
				user={props.user}
			/>
			<Container fluid className="mw-1600">
				<Row>
					<div className="box d-flex">
						<div className="col left"></div>
						<div className="col center">
							<div className="top-nav-wrapper">
								<h1 className="top-nav-title">Search results</h1>
								<p className="top-nav-subtitle">
									We have found <span>{searchResultsLength} results</span> based
									out of your search query
								</p>
							</div>
							{searchResultsList}
						</div>
						<div className="col left"></div>
					</div>
				</Row>
			</Container>
		</div>
	);
};

export default Search;
