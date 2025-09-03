// ==== Background (stars & meteors) ====
const night = document.getElementById("night");

// Generate stars
for (let i = 0; i < 50; i++) {
  const star = document.createElement("div");
  star.className = "star";
  star.style.top = Math.random() * 100 + "%";
  star.style.left = Math.random() * 100 + "%";
  star.style.animationDuration = (2 + Math.random() * 3) + "s";
  night.appendChild(star);
}

// Generate meteors
for (let i = 0; i < 5; i++) {
  const meteor = document.createElement("div");
  meteor.className = "shooting_star";
  meteor.style.top = Math.random() * 50 + "%";
  meteor.style.left = Math.random() * 100 + "%";
  meteor.style.animationDelay = (Math.random() * 10) + "s";
  night.appendChild(meteor);
}

// ==== Like System ====
async function getLikes() {
  const res = await fetch("/api/likes");
  const data = await res.json();
  document.getElementById("likeCount").innerText = data.likes;
}

async function addLike() {
  const res = await fetch("/api/likes", { method: "POST" });
  const data = await res.json();
  document.getElementById("likeCount").innerText = data.likes;
}

// load likes on page load
getLikes();

// ==== Contact button ====
document.getElementById("contactBtn").onclick = () => {
  window.open("https://t.me/AlwaysRexx", "_blank");
};

// ==== Share button ====
document.getElementById("shareBtn").onclick = async () => {
  const shareData = {
    title: "Profile of Rexxin Official",
    text: "Check out this awesome profile!",
    url: window.location.href,
  };
  if (navigator.share) {
    await navigator.share(shareData);
  } else {
    await navigator.clipboard.writeText(shareData.url);
    alert("Link copied to clipboard!");
  }
};
