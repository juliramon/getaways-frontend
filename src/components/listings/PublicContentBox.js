import React from "react";
import {Link} from "react-router-dom";

const PublicContentBox = ({id, image, title, subtitle, location, type}) => {
	let shortenedSubtitle = subtitle.slice(0, 105);
	let path;
	if (type === "activity") {
		path = "activities";
	} else if (type === "place") {
		path = "places";
	} else if (type === "story") {
		path = "stories";
	}
	return (
		<div
			id="listing"
			className="d-flex align-items-center justify-content-between"
		>
			<Link
				to={`/${path}/${id}`}
				title={title}
				className="listing-wrapper d-flex align-items-center"
			>
				<div className="listing-cover">
					<img src={image} alt={title} />
				</div>
				<div className="listing-content">
					<h3 className="listing-title">{title}</h3>
					<p className="listing-subtitle">{shortenedSubtitle}...</p>
					<p className="listing-location">{location}</p>
				</div>
			</Link>
		</div>
	);
};

export default PublicContentBox;
