// Function to fetch and display all blogs with like buttons
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("http://localhost:3002/api/blogs");
        if (!response.ok) throw new Error("Failed to fetch blogs");

        const blogs = await response.json();
        const blogList = document.getElementById("blog-list");

        blogs.forEach(blog => {
            const blogCard = document.createElement("div");
            blogCard.className = "blog-card";

            blogCard.innerHTML = `
                <div class="blog-image">
                    <img src="${blog.image}" alt="${blog.title}">
                </div>
                <div class="blog-content">
                    <h2>${blog.title}</h2>
                    <p class="blog-meta">${blog.category} | ${blog.date}</p>
                    <p class="blog-description">${blog.content.substring(0, 200)}...</p>
                    <a href="#" data-id="${blog.id}" class="read-more">Read More</a>
                    <div class="blog-actions">
                        <button class="like-button" data-id="${blog.id}">
                            <span>&#x2764;</span> Like (<span class="like-count">0</span>)
                        </button>
                        <button class="delete-button" data-id="${blog._id}">Delete</button>
                    </div>
                </div>
            `;

            // Attach "Read More" functionality
            blogCard.querySelector(".read-more").addEventListener("click", setBlogId);

            // Attach "Like" button functionality
            const likeButton = blogCard.querySelector(".like-button");
            likeButton.addEventListener("click", () => {
                const likeCount = likeButton.querySelector(".like-count");
                let currentLikes = parseInt(likeCount.textContent);
                likeCount.textContent = currentLikes + 1; // Increment like count
            });

            // Attach "Delete" button functionality
            const deleteButton = blogCard.querySelector(".delete-button");
            deleteButton.addEventListener("click", deleteBlog);

            blogList.appendChild(blogCard);
        });
    } catch (error) {
        console.error("Error loading blogs:", error);
        const blogList = document.getElementById("blog-list");
        blogList.innerHTML = "<p>Failed to load blogs.</p>";
    }
});

// Refactored deleteBlog function
async function deleteBlog(event) {
    event.preventDefault();
    const deleteButton = event.currentTarget;
    const blogId = deleteButton.getAttribute("data-id");

    try {
        // Disable the button during deletion
        deleteButton.disabled = true;

        const response = await fetch(`http://localhost:3002/delete/blogs/${blogId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || "Failed to delete blog");
        }

        // Find the parent blog card
        const blogCard = deleteButton.closest(".blog-card");
        if (blogCard) {
            // Smoothly remove the blog card
            blogCard.style.transition = "opacity 0.3s ease-out, transform 0.3s ease-out";
            blogCard.style.opacity = "0";
            blogCard.style.transform = "scale(0.9)";

            setTimeout(() => {
                blogCard.remove();
                alert("Blog deleted successfully!");
            }, 300);
        }
    } catch (error) {
        console.error("Error deleting blog:", error);
        alert(`Failed to delete blog: ${error.message}`);
    } finally {
        // Re-enable the button in case of success or failure
        deleteButton.disabled = false;
    }
}

// Existing setBlogId function
function setBlogId(event) {
    event.preventDefault();
    const blogId = event.currentTarget.getAttribute("data-id");
    localStorage.setItem("selectedBlogId", blogId);
    window.location.href = "/fullblog";
}