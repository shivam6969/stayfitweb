var hamburgerBtn = document.querySelector('.main-navbar .hamburger-btn');
var navList = document.querySelector('.main-navbar .nav-list');
var navListItems = document.querySelectorAll('.nav-list li a');

hamburgerBtn.addEventListener('click', activeClass);

function changePrimaryColor() {
	const root = document.documentElement;
	const currentColor = getComputedStyle(root).getPropertyValue('--primary-clr').trim();
	const green = '#56fa20';
	const orange = '#ffa500';
	
	
	root.style.setProperty('--primary-clr', currentColor === green ? orange : green);
}

function activeClass(){
	hamburgerBtn.classList.toggle('active');
	navList.classList.toggle('active');
}

for(var i = 0; i < navListItems.length; i++){
	navListItems[i].addEventListener('click', listItemClicked);
}

function listItemClicked(){
	hamburgerBtn.classList.remove('active');
	navList.classList.remove('active');
}

// Code For Navbar
var homeSection = document.querySelector('#home');
window.addEventListener('scroll', pageScrollFunction);
window.addEventListener('load', pageScrollFunction);

function pageScrollFunction(){
	if(window.scrollY > 150){
		homeSection.classList.add('active');
	}
	else{
		homeSection.classList.remove('active');
	}
}



// Function to set the clicked blog ID
function setBlogId(event) {
	event.preventDefault();
	const blogId = event.currentTarget.getAttribute("data-id");
	localStorage.setItem("selectedBlogId", blogId);
	window.location.href = "/fullblog";
  }
  
  // Fetch and display only the latest 3 blogs
  document.addEventListener("DOMContentLoaded", async () => {
	const blogContainers = document.getElementsByClassName("blog-contents");
  
	if (blogContainers.length === 0) {
	  console.error("No element with class 'blog-contents' found.");
	  return;
	}
  
	const blogContainer = blogContainers[0]; // Access the first container
  
	try {
	  // Fetch all blogs from the API
	  const response = await fetch("http://localhost:3002/api/blogs");
	  if (!response.ok) {
		throw new Error("Failed to fetch blogs data");
	  }
  
	  const blogs = await response.json();
  
	  // Display the latest 3 blogs
	  const latestBlogs = blogs.slice(0, 3); // Get only the first 3 blogs
	  latestBlogs.forEach((blog) => {
		const blogCard = `
		  <a href="fullblog.ejs" class="article-card" data-id="${blog.id}" onclick="setBlogId(event)">
			<img src="${blog.image}" alt="Blog Image">
			<div class="category">
			  <div class="subject"><h3>${blog.category}</h3></div>
			  <span>${blog.date}</span>
			</div>
			<h2 class="article-title">${blog.title}</h2>
			<p class="article-desc">${blog.content.substring(0, 100)}...</p>
			<div class="article-views">
			  <span>2.5k <i class="fa-solid fa-eye"></i></span>
			  <span>352 <i class="fa-solid fa-comment"></i></span>
			</div>
		  </a>
		`;
		blogContainer.insertAdjacentHTML("beforeend", blogCard);
	  });
	} catch (error) {
	  console.error("Error loading blogs data:", error);
	  blogContainer.innerHTML = "<p>Failed to load blogs.</p>";
	}
  });
  




  // Fetch and display a specific trainer from the backend
document.addEventListener("DOMContentLoaded", async () => {
	const trainerContainer = document.querySelector(".team-contents");
  
	if (!trainerContainer) {
	  console.error("No element with class 'team-contents' found.");
	  return;
	}
  
	// Replace this with the trainer ID(s) you need to fetch dynamically
	const trainerIds = ["1", "2", "3"]; // Example trainer IDs
  
	try {
	  // Clear existing trainer contents
	  trainerContainer.innerHTML = "";
  
	  for (const id of trainerIds) {
		// Fetch trainer data by ID
		const response = await fetch(`/api/trainers/${id}`);
		if (!response.ok) {
		  throw new Error(`Failed to fetch trainer data for ID ${id}`);
		}
  
		const trainer = await response.json();
  
		// Dynamically generate trainer card
		const trainerCard = `
  <div class="trainer-card" onclick="window.location.href='/fulltrainer?id=${trainer.id}'">
    <div class="trainer-image">
      <img src="${trainer.image}" alt="${trainer.name}">
    </div>
    <div class="trainer-desc">
      <h2>${trainer.name}</h2>
      <p>${trainer.speciality}</p>
    </div>
    <div class="trainer-contact">
      ${trainer.social.facebook ? `<a href="${trainer.social.facebook}" target="_blank"><i class="fa-brands fa-facebook-f"></i></a>` : ""}
      ${trainer.social.twitter ? `<a href="${trainer.social.twitter}" target="_blank"><i class="fa-brands fa-twitter"></i></a>` : ""}
      ${trainer.social.instagram ? `<a href="${trainer.social.instagram}" target="_blank"><i class="fa-brands fa-instagram"></i></a>` : ""}
      ${trainer.social.youtube ? `<a href="${trainer.social.youtube}" target="_blank"><i class="fa-brands fa-youtube"></i></a>` : ""}
    </div>
  </div>
`;

		trainerContainer.insertAdjacentHTML("beforeend", trainerCard);
	  }
	} catch (error) {
	  console.error("Error loading trainer data:", error);
	  trainerContainer.innerHTML = "<p>Failed to load trainers.</p>";
	}
  });
  