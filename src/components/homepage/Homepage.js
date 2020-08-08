import React, {useState, useEffect} from "react";
import Hero from "./Hero";
import NavigationBar from "../NavigationBar";

const Homepage = () => {
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
			<NavigationBar logo_url={"../logo-getaways-guru.svg"} />
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
