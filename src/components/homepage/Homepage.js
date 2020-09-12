import React, {useState, useEffect} from "react";
import Hero from "./Hero";
import NavigationBar from "../NavigationBar";
import Footer from "./Footer";
import HomePageResults from "./HomePageResults";

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

	const title = (
		<div>
			Your next <br /> {span} getaway <br /> near Barcelona <br /> starts here
		</div>
	);

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
					"Search, find and bookmark thousands of verified getaways from local travellers"
				}
			/>
			<HomePageResults />
			<Footer
				logo_url={
					"https://res.cloudinary.com/juligoodie/image/upload/v1598554049/Getaways.guru/logo_getaways_navbar_tpsd0w.svg"
				}
			/>
		</div>
	);
};

export default Homepage;
