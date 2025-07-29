# 🚀 24-Hour Hackathon Project: Alumni Referral Platform  

An MVP built in **24 hours** to connect students with alumni for referrals, mentorship, and networking — all while ensuring security, trust, and smooth usability.  

---

## 🛠️ Tech Stack  
- **Frontend:** React, Material-UI, Socket.io  
- **Backend:** Node.js, Express.js, JWT  
- **Database:** MongoDB (Atlas)  
- **Deployment:** Heroku  
- **Collaboration:** GitHub, Trello, Slack  

---

## 👥 Team Roles  
| Role | Responsibilities |
|------|------------------|
| **Lead** | Coordinates, monitors progress, prepares pitch |
| **Backend Specialist** | Authentication, APIs, database integration |
| **Frontend Specialist** | UI/UX, React components, integration |
| **Tester / Designer** | Testing, deployment, design, docs |

---

## 📅 Hackathon Timeline (24 Hours)  

### ⏰ Phase 1: Setup & Planning (Hours 1–2)  
- ✅ Assign roles & set up GitHub repo (branches: `main`, `backend`, `frontend`)  
- ✅ Install dependencies: Node.js, Express, MongoDB Atlas, React, JWT  
- ✅ Define DB schema: **Users, Profiles, Referral Requests**  
- ✅ Generate 20–30 dummy alumni profiles  
- ✅ Ensure local dev environments are working  

---

### ⏰ Phase 2: Backend Basics (Hours 3–6)  
- 🔑 JWT Auth with college email validation  
- 📦 CRUD APIs for users & profiles  
- 📝 Referral request system (limit: 3/day)  
- 🌐 Database seeding with dummy data  
- 🎨 Frontend wireframes drafted in parallel  
- 🔒 Research HTTPS & security best practices  

---

### ⏰ Phase 3: Core Features Development (Hours 7–10)  
- 🔍 Alumni directory with filters (company, year, package)  
- 👤 Student profile creation & showcase  
- 📬 Referral request form & notifications (email/in-app)  
- ⭐ Reputation system (post-interaction ratings)  
- ✅ Writing test cases for major flows  

---

### ⏰ Phase 4: Frontend & Integration (Hours 11–14)  
- 🖥️ React components: Search, Profiles, Requests  
- 💬 Real-time chat with Socket.io  
- 🔗 Full frontend ↔ backend integration  
- 🛡️ Admin dashboard basics  
- 🚀 Initial deployment on Heroku  
- 🎤 Mid-hackathon demo dry run  

---

### ⏰ Phase 5: Testing & Debugging (Hours 15–18)  
- 🔄 End-to-end testing of student–alumni interactions  
- ✅ Verify trust features: email checks, request limits  
- 🐞 Fix search/UI/security bugs  
- ⚡ Load test with dummy users  
- 📜 Pitch script preparation  

---

### ⏰ Phase 6: Polish & Optimization (Hours 19–22)  
- 🎨 UI/UX Enhancements: Material-UI, tooltips, error messages  
- 🔒 Safeguards: Disclaimers & keyword filters  
- ⚡ Performance optimization  
- 🏠 Demo landing page & onboarding flow  
- 📊 Analytics logs for demo insights  
- 📦 Final deployment & data backup  

---

### ⏰ Phase 7: Demo Prep & Wrap-Up (Hours 23–24)  
- 🎥 Full demo rehearsal with dummy scenarios  
- 📊 Presentation: MVP strengths & future ideas  
- 📘 Documentation: Comments & README  
- 🗄️ Final commits & database backup  
- 🎉 Team debrief & celebration!  

---

## 🌟 Core MVP Features: Built in 24 Hours  

To maximize impact within 24 hours, we focused on **4–5 essential features** that form the foundation of our platform. These prioritize **reliability, trust, and usability** over advanced but time-intensive technologies.  

---

### 📘 1. Alumni Directory with Advanced Search  
- **What it does:** Students can browse alumni profiles filtered by **company, pass-out year, or placement package**.  
- **Why foundational:** Solves fragmented information, making the platform immediately useful.  
- **Trust Layer:** Requires email verification to avoid fake entries.  
- **Implementation Tip:**  
  - Simple MongoDB query system  
  - Fuzzy search to handle typos/incomplete data  
  - Pre-populated with **20–30 sample alumni profiles**  

---

### 👤 2. Student Profile & Referral Request System  
- **What it does:** Students create profiles showcasing skills/projects, then send **targeted referral requests** to alumni.  
- **Why foundational:** Bridges students and alumni while addressing referral challenges.  
- **Trust Layer:**  
  - **Reputation flag** (👍 / 👎 after interactions)  
  - **Request limits:** Max **3 per student per day** to prevent spam  
- **Implementation Tip:**  
  - Basic request form with email notifications  
  - JWT for secure login & session handling  

---

### 🔒 3. Basic Trust & Verification Layer  
- **What it does:** Ensures users are verified through **college email domains** and LinkedIn URLs for alumni.  
- **Why foundational:** Tackles identity fraud and protects alumni from spam.  
- **Trust Layer:**  
  - Manual admin approval for new profiles during demo  
  - Block suspicious activity (e.g., multiple requests from one IP)  
- **Implementation Tip:**  
  - Simple regex/API validation for email domains  
  - Store verification status in MongoDB  

---

### 💬 4. Secure Messaging for Connections  
- **What it does:** Enables **private chat** once a referral request is accepted.  
- **Why foundational:** Referrals succeed only if proper communication happens.  
- **Trust Layer:**  
  - Uses **Socket.io** for real-time messaging  
  - Keyword filters to block inappropriate content  
- **Implementation Tip:**  
  - Keep it **text-only** to save time  
  - Use basic Socket.io rooms for accepted requests  

---

### 🛡️ 5. Admin Dashboard for Oversight  
- **What it does:** Provides a simple panel for monitoring users, approving profiles, and tracking requests.  
- **Why foundational:** Prevents issues that could break the hackathon demo.  
- **Trust Layer:**  
  - Error logs (e.g., failed logins, invalid requests)  
  - Basic analytics (e.g., number of requests per day)  
- **Implementation Tip:**  
  - Minimal React + Express dashboard  
  - Real-time monitoring using MongoDB queries  

---

✅ With these **5 Core Features**, the project balances **functionality, trust, and demo-readiness** — ensuring a solid MVP within the hackathon timeframe.


## ⚙️ Installation & Setup  

```bash
# 1. Clone the repository
git clone [repo-url]

# 2. Install dependencies
cd backend && npm install
cd ../frontend && npm install

# 3. Setup environment variables
# Create a .env file in backend with:
MONGO_URI=<your-mongo-atlas-uri>
JWT_SECRET=<your-secret-key>

# 4. Run the project
# Backend
npm start
# Frontend
npm run start
