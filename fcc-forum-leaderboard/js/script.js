// Define constant URLs for the latest forum JSON, topic, and category URLs
const forumLatest = "https://cdn.freecodecamp.org/curriculum/forum-latest/latest.json";
const forumTopicUrl = "https://forum.freecodecamp.org/t/";
const forumCategoryUrl = "https://forum.freecodecamp.org/c/";
const avatarUrl = "https://sea1.discourse-cdn.com/freecodecamp";

// Get the DOM element where the posts will be displayed
const postsContainer = document.getElementById("posts-container");

// Define all possible categories with their respective names and CSS class names
const allCategories = {
  299: { category: "Career Advice", className: "career" },
  409: { category: "Project Feedback", className: "feedback" },
  417: { category: "freeCodeCamp Support", className: "support" },
  421: { category: "JavaScript", className: "javascript" },
  423: { category: "HTML - CSS", className: "html-css" },
  424: { category: "Python", className: "python" },
  432: { category: "You Can Do This!", className: "motivation" },
  560: { category: "Backend Development", className: "backend" },
};

// Function to get the category link based on category ID
const forumCategory = (id) => {
  let selectedCategory = {};

  if (allCategories.hasOwnProperty(id)) {
    const { className, category } = allCategories[id];

    selectedCategory.className = className;
    selectedCategory.category = category;
  } else {
    // If the category is not found, return a general category
    selectedCategory.className = "general";
    selectedCategory.category = "General";
    selectedCategory.id = 1;
  }
  // Generate the URL and the link text for the category
  const url = `${forumCategoryUrl}${selectedCategory.className}/${id}`;
  const linkText = selectedCategory.category;
  const linkClass = `category ${selectedCategory.className}`;

  // Return the HTML anchor element for the category link
  return `<a href="${url}" class="${linkClass}" target="_blank">
    ${linkText}
  </a>`;
};

// Function to format the time difference (e.g., "10m ago", "2h ago", "5d ago")
const timeAgo = (time) => {
  const currentTime = new Date();
  const lastPost = new Date(time);

  const timeDifference = currentTime - lastPost;
  const msPerMinute = 1000 * 60;

  const minutesAgo = Math.floor(timeDifference / msPerMinute);
  const hoursAgo = Math.floor(minutesAgo / 60);
  const daysAgo = Math.floor(hoursAgo / 24);

  // Return the appropriate time format based on the difference between current time and last post time
  if (minutesAgo < 60) {
    return `${minutesAgo}m ago`;
  }

  if (hoursAgo < 24) {
    return `${hoursAgo}h ago`;
  }

  return `${daysAgo}d ago`;
};

// Function to format the number of views, showing 'k' for thousands
const viewCount = (views) => {
  const thousands = Math.floor(views / 1000);

  if (views >= 1000) {
    return `${thousands}k`; // Return the number of views in 'k' format
  }

  return views; // Return the original number if it's less than 1000
};

// Function to generate HTML for the avatars of posters
const avatars = (posters, users) => {
  return posters
    .map((poster) => {
      // Find the user associated with the poster
      const user = users.find((user) => user.id === poster.user_id);
      if (user) {
        // Format the avatar URL
        const avatar = user.avatar_template.replace(/{size}/, 24); // Replace the {size} placeholder with 30
        const userAvatarUrl = avatar.startsWith("/user_avatar/")
          ? avatarUrl.concat(avatar) // If the avatar URL starts with '/user_avatar/', concatenate the base URL
          : avatar;                  // Otherwise, return the avatar as is
        return `<img src="${userAvatarUrl}" alt="${user.name}" />`;
      }
    })
    .join("");
};

// Function to fetch the latest forum data
const fetchData = async () => {
  try {
    const res = await fetch(forumLatest);
    const data = await res.json();
    showLatestPosts(data);
  } catch (err) {
    console.log(err);
  }
};

// Fetch the data when the script runs
fetchData();

// Function to display the latest posts in the table
const showLatestPosts = (data) => {
  const { topic_list, users } = data;
  const { topics } = topic_list;

  // Insert the topics into the posts container by generating HTML for each topic
  postsContainer.innerHTML = topics.map((item) => {
    const {
      id,
      title,
      views,
      posts_count,
      slug,
      posters,
      category_id,
      bumped_at,
    } = item;

    // Return the HTML for each row in the posts table
    return `
    <tr>
      <td>
        <a class="post-title" target="_blank" href="${forumTopicUrl}${slug}/${id}">${title}</a>

        ${forumCategory(category_id)}
      </td>
      <td>
        <div class="avatar-container">
          ${avatars(posters, users)}
        </div>
      </td>
      <td>${posts_count - 1}</td>
      <td>${viewCount(views)}</td>
      <td>${timeAgo(bumped_at)}</td>
    </tr>`;
  }).join(""); // Join the rows together into a single string and insert into the posts container
};