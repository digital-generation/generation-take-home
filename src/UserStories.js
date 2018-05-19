import React, { Component } from 'react'

export default class UserStories extends Component {
  render() {
    return (
      <div>
		  <h1>Hi! Welcome to the Generation take-home interview!</h1>
		  <h3>Intro:</h3>
		  <p>At Generation, we have many users: students, teachers, employers, and the core Generation team.</p>
		  <p>Everything we do at Generation is centered around better serving the needs of these users. </p>
		  <p>In your role, you'll be using your ninja JavaScript skills to empower Generation to better serve these users.</p>
		  <p>That's why we've included this piece in the interview process. It gives you an opportunity to demonstrate your creative problem-solving, user-centric design, and coding style. </p>
		  <h3> Here's how it works:</h3>
		  <p></p>

		  <p>Below are some real-life <a href="https://en.wikipedia.org/wiki/User_story">user stories</a> that we face at Generation.</p>
		  <p>We'd love to see how you use JS and React to address these user stories.</p>
		  <p>Feel free to add libraries, create new components, or otherwise change the codebase. This app is yours!</p>
		  <p>Implementing the user stories listed should take between 2-5 hours. If you're having trouble, don't be afraid to ask for help!</p>

		  <strong>Student user stories:</strong>
		  <ul>
		    <li>As a student, I want to see a map of Mexico City</li>
		    <li>As a student, I want to see a map that has all the stores represented as markers/pins on the map.</li>
		    <li>As a student, I want to be able to click on a store and add it to a list of 'My Favorite Stores'</li>
		  </ul>
		  <p>Helpful tips:</p>
		  <ul>
		  	<li><i>Feel free to use our Google Maps API key: AIzaSyCVH8e45o3d-5qmykzdhGKd1-3xYua5D2A</i></li>
		  	<li><i>The list of stores is located in the file store_directory.json </i></li>
		  	<li><i>Focus on the user, not the technology. A simple implementation that impresses the user is better than a super technical solution that impresses other developers.</i></li>
		  	<li><i>That said, code that is easy to follow is always appreciated :)</i></li>
		  </ul>
      </div>
    )
  }
}
