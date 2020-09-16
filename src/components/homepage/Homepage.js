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
		<>
			Your next {span} getaway
			<br /> near Barcelona starts here
		</>
	);

	const subtitle = (
		<>
			Search, find and bookmark thousands
			<br /> of verified getaways from local travellers
		</>
	);

	return (
		<div id="homepage">
			<NavigationBar
				logo_url={
					"https://res.cloudinary.com/juligoodie/image/upload/c_scale,q_100,w_135/v1600008855/getaways-guru/static-files/logo-getaways-guru_vvbikk.svg"
				}
			/>
			<Hero
				background_url={
					"https://res.cloudinary.com/juligoodie/image/upload/q_69/v1600242861/getaways-guru/cover-getaways_zogryn.webp"
				}
				title={title}
				subtitle={subtitle}
			/>
			<HomePageResults />
			<Footer
				logo_url={
					"https://res.cloudinary.com/juligoodie/image/upload/c_scale,q_100,w_135/v1600008855/getaways-guru/static-files/logo-getaways-guru_vvbikk.svg"
				}
			/>
		</div>
	);
};

export default Homepage;
