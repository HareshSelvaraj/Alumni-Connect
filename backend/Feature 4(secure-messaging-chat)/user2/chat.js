// Connect to the backend Socket.io server
const socket = io("http://localhost:3000");

// Define the two users (replace with actual logic later)
const userId = "user456";            // The logged-in user
const otherUserId = "user123";       // The person you're chatting with

// Generate consistent room ID using sorted user IDs
function getRoomId(userA, userB) {
  const sorted = [userA, userB].sort(); // Ensures same roomId regardless of order
  return `referral_${sorted[0]}_${sorted[1]}`;
}

const roomId = getRoomId(userId, otherUserId);

// Log connection
console.log(`🔌 Connecting to room: ${roomId} as ${userId}`);

// Join the private chat room
socket.emit("joinRoom", { roomId, userId });

// Send message when button is clicked
document.getElementById("sendBtn").onclick = () => {
  const message = document.getElementById("msgInput").value.trim();

  if (message === "") return;

  socket.emit("sendMessage", { roomId, message, sender: userId });
  document.getElementById("msgInput").value = "";
};

// Receive new message
socket.on("receiveMessage", ({ message, sender }) => {
  const chatDiv = document.getElementById("chat");
  const msgElem = document.createElement("div");
  msgElem.innerText = `${sender}: ${message}`;
  chatDiv.appendChild(msgElem);
  chatDiv.scrollTop = chatDiv.scrollHeight;
});

// Handle blocked messages
socket.on("blockedMessage", (msg) => {
  alert(`🚫 ${msg}`);
});

// Handle connection errors (optional)
socket.on("connect_error", (err) => {
  console.error("❌ Socket connection failed:", err.message);
  alert("Unable to connect to chat server. Make sure backend is running.");
});
