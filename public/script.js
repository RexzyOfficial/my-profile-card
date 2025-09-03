// === Background Stars & Meteors ===
const night = document.getElementById("night");

// Generate random stars
function createStars(count = 50) {
  for (let i = 0; i < count; i++) {
    const star = document.createElement("div");
    star.classList.add("star");
    star.style.top = Math.random() * 100 + "vh";
    star.style.left = Math.random() * 100 + "vw";
    star.style.animationDuration = (Math.random() * 2 + 1) + "s";
    night.appendChild(star);
  }
}

// Generate random meteors
function createMeteors(count = 5) {
  for (let i = 0; i < count; i++) {
    const meteor = document.createElement("div");
    meteor.classList.add("shooting_star");
    meteor.style.top = Math.random() * 80 + "vh";
    meteor.style.left = Math.random() * 100 + "vw";
    meteor.style.animationDelay = (Math.random() * 8) + "s";
    night.appendChild(meteor);
  }
}

createStars(60);
createMeteors(6);

// === Like Feature (Redis) ===
const likeBtn = document.getElementById("likeBtn");
const likeCountSpan = document.getElementById("likeCount");

// Fetch current likes
async function getLikes() {
  try {
    const res = await fetch("/api/likes");
    const data = await res.json();
    likeCountSpan.textContent = data.likes;
  } catch (err) {
    console.error("Failed to fetch likes:", err);
  }
}

// Add like
async function addLike() {
  try {
    const res = await fetch("/api/likes", { method: "POST" });
    const data = await res.json();
    likeBtn.classList.add("liked");
    likeCountSpan.textContent = data.likes;
  } catch (err) {
    console.error("Failed to add like:", err);
  }
}

likeBtn.addEventListener("click", addLike);
likeBtn.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    addLike();
  }
});

// Initial load
getLikes();

// === Contact Button ===
document.getElementById("contactBtn").addEventListener("click", () => {
  window.open("https://t.me/AlwaysRexx", "_blank");
});

// === Share Button ===
document.getElementById("shareBtn").addEventListener("click", async () => {
  const shareData = {
    title: "Profile Rexxin Official",
    text: "Check out this awesome profile!",
    url: window.location.href,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      alert("Profile shared successfully!");
    } catch (err) {
      console.error("Share failed:", err);
    }
  } else {
    try {
      await navigator.clipboard.writeText(shareData.url);
      alert("Link copied to clipboard!");
    } catch (err) {
      alert("Failed to copy link: " + err.message);
    }
  }
});
