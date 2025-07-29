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
