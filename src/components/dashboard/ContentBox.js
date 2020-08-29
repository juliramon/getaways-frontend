import React from "react";
import {Dropdown, Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import ContentService from "../../services/contentService";

const ContentBox = ({id, title, subtitle, publicationDate, getActivities}) => {
	const service = new ContentService();
	const removeActivity = () => {
		service.removeActivity(id).then(() => {
			getActivities();
		});
	};
	return (
		<div className="content box d-flex align-items-center">
			<Link to={`/activities/${id}`} className="d-flex align-items-center">
				<div className="image">
					<img src="" alt={title} />
				</div>
				<h1 className="title">{title}</h1>
				<p className="subtitle">{subtitle}</p>
				<p className="date">{publicationDate}</p>
			</Link>
			<div className="crud-buttons">
				<Dropdown>
					<Dropdown.Toggle variant="none">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="icon icon-tabler icon-tabler-dots"
							width="28"
							height="28"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="#2c3e50"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" />
							<circle cx="5" cy="12" r="1" />
							<circle cx="12" cy="12" r="1" />
							<circle cx="19" cy="12" r="1" />
						</svg>
					</Dropdown.Toggle>
					<Dropdown.Menu>
						<ul>
							<li>
								<Link to={`/activities/${id}`}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="icon icon-tabler icon-tabler-eye"
										width="20"
										height="20"
										viewBox="0 0 24 24"
										strokeWidth="1.5"
										stroke="#2c3e50"
										fill="none"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path stroke="none" d="M0 0h24v24H0z" />
										<circle cx="12" cy="12" r="2" />
										<path d="M2 12l1.5 2a11 11 0 0 0 17 0l1.5 -2" />
										<path d="M2 12l1.5 -2a11 11 0 0 1 17 0l1.5 2" />
									</svg>
									View
								</Link>
							</li>
							<li>
								<Link to={`/activities/${id}/edit`}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="icon icon-tabler icon-tabler-pencil"
										width="20"
										height="20"
										viewBox="0 0 24 24"
										strokeWidth="1.5"
										stroke="#2c3e50"
										fill="none"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path stroke="none" d="M0 0h24v24H0z" />
										<path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
										<line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
									</svg>
									Edit
								</Link>
							</li>
							<li>
								<Link to="/">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="icon icon-tabler icon-tabler-share"
										width="20"
										height="20"
										viewBox="0 0 24 24"
										strokeWidth="1.5"
										stroke="#2c3e50"
										fill="none"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path stroke="none" d="M0 0h24v24H0z" />
										<circle cx="6" cy="12" r="3" />
										<circle cx="18" cy="6" r="3" />
										<circle cx="18" cy="18" r="3" />
										<line x1="8.7" y1="10.7" x2="15.3" y2="7.3" />
										<line x1="8.7" y1="13.3" x2="15.3" y2="16.7" />
									</svg>
									Share
								</Link>
							</li>
							<li>
								<Link to="/">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="icon icon-tabler icon-tabler-archive"
										width="20"
										height="20"
										viewBox="0 0 24 24"
										strokeWidth="1.5"
										stroke="#2c3e50"
										fill="none"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path stroke="none" d="M0 0h24v24H0z" />
										<rect x="3" y="4" width="18" height="4" rx="2" />
										<path d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-10" />
										<line x1="10" y1="12" x2="14" y2="12" />
									</svg>
									Archive
								</Link>
							</li>
							<li>
								<Button variant="none" onClick={removeActivity}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="icon icon-tabler icon-tabler-trash"
										width="20"
										height="20"
										viewBox="0 0 24 24"
										strokeWidth="1.5"
										stroke="#2c3e50"
										fill="none"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path stroke="none" d="M0 0h24v24H0z" />
										<line x1="4" y1="7" x2="20" y2="7" />
										<line x1="10" y1="11" x2="10" y2="17" />
										<line x1="14" y1="11" x2="14" y2="17" />
										<path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
										<path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
									</svg>
									Remove
								</Button>
							</li>
						</ul>
					</Dropdown.Menu>
				</Dropdown>
			</div>
		</div>
	);
};

export default ContentBox;
