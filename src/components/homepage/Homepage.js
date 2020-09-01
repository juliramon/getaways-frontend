import React, {useState, useEffect} from "react";
import Hero from "./Hero";
import NavigationBar from "../NavigationBar";

const Homepage = (props) => {
	const [span, setSpan] = useState("perfect");

	const headerSpans = [
		"weekend",
		"romantic",
		"gastronomic",
		"adventure",
		"relax",
		"cultural",
		"winter",
		"summer",
	];

	useEffect(() => {
		const interval = setInterval(() => {
			let selectedSpan =
				headerSpans[Math.floor(headerSpans.length * Math.random())];
			setSpan(selectedSpan);
		}, 3500);
		return () => clearInterval(interval);
	});

	const title = `Your next ${span} getaway starts here`;

	return (
		<div id="homepage">
			<NavigationBar
				logo_url={
					"https://res.cloudinary.com/juligoodie/image/upload/v1598554049/Getaways.guru/logo_getaways_navbar_tpsd0w.svg"
				}
			/>
			<Hero
				background_url={"../jumbotron-bg.jpg"}
				title={title}
				subtitle={
					"Search, find and book among thousands of verified getaways from local  travellers"
				}
			/>
		</div>
	);
};

export default Homepage;
