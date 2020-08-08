import React, {useState} from "react";
import {Form, Button} from "react-bootstrap";

const SearchBar = () => {
	const initialState = {
		location: "",
		type: "",
		copyButton: "",
		isClicked: false,
	};
	const [searchButton, setSearchButton] = useState(initialState);

	const handleClick = () =>
		!searchButton.isClicked ? setSearchButton({copyButton: "Search"}) : null;

	return (
		<Form className="header-form d-flex align-items-center">
			<Form.Group>
				<Form.Label>Location</Form.Label>
				<Form.Control
					onClick={handleClick}
					type="text"
					placeholder="Search where you'd like to escape..."
				/>
			</Form.Group>
			<span className="header-form---sep"></span>
			<Form.Group>
				<Form.Label>Type</Form.Label>
				<Form.Control
					onClick={handleClick}
					type="text"
					placeholder="Search where you'd like to escape..."
				/>
			</Form.Group>
			<Form.Group className="header-form---submit">
				<Button>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="icon icon-tabler icon-tabler-search"
						width="25"
						height="25"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="#fff"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path stroke="none" d="M0 0h24v24H0z" />
						<circle cx="10" cy="10" r="7" />
						<line x1="21" y1="21" x2="15" y2="15" />
					</svg>
					{searchButton.copyButton}
				</Button>
			</Form.Group>
		</Form>
	);
};

export default SearchBar;
