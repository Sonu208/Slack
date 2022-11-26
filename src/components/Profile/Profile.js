import React from "react";
import img from "./1.png";
// import 'bootstrap/dist/css/bootstrap.min.css';
import "./Profile.css"

const PersonalProfile = () => {
  return (
    <>
      <div class="portfoliocard">
		<div class="coverphoto"></div>
		<div class="profile_picture"></div>
		<div class="left_col">
			{/* <button class="btn">Edit</button> */}
		</div>
		<div class="right_col">
			<h2 class="name">Avanindra Patil</h2>
			<h3 class="location">San Francisco, CA</h3>
			<ul class="contact_information">
				<li class="work">CEO</li>
				<li class="username">AvanindraPatil</li>
				<li class="mail">avanindra@gmail.com</li>
				<li class="phone">8282727292</li>
				<li class="resume"><a href="#" class="nostyle">invite</a></li>
			</ul>
		</div>
		</div>
    </>
  );
};

export default PersonalProfile;