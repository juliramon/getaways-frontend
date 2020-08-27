import React from "react";
import {Link} from "react-router-dom";

const PublicContentBox = ({title, subtitle, location}) => {
	return (
		<div
			id="listing"
			className="d-flex align-items-center justify-content-between"
		>
			<a
				href="/"
				title={title}
				className="listing-wrapper d-flex align-items-center"
			>
				<div className="listing-cover">
					<img src="" alt={title} />
				</div>
				<div className="listing-content">
					<h3 className="listing-title">{title}</h3>
					<p className="listing-subtitle">{subtitle}</p>
					<p className="listing-location">{location}</p>
				</div>
			</a>
			<div className="listing-action">
				<Link to="/" title="Book" className="btn btn-primary">
					Book
				</Link>
			</div>
		</div>
	);
};

export default PublicContentBox;