24-Hour Hackathon Checklist
This checklist structures the development process for a team of 4: Lead (coordinates), Backend Specialist, Frontend Specialist, and Tester/Designer. Divide into timed phases. Use Git for collaboration, Trello/Slack for tracking, and Heroku for deployment. Check-in every 2 hours.

Phase 1: Setup and Planning (Hours 1-2)
 Assemble team and assign roles: Lead, Backend Specialist, Frontend Specialist, Tester/Designer.

 Set up project repository on GitHub; create branches for features (e.g., main, backend, frontend).

 Install dependencies: Node.js, Express, MongoDB (or free Atlas), React, and basics like JWT for auth.

 Define database schema: Users (students/alumni), Profiles, Referral Requests (Backend Specialist leads).

 Brainstorm dummy data: Create 20-30 sample alumni profiles for testing (All team members contribute).

 Set up local development environments and ensure everyone can run the project (Tester/Designer verifies).

Phase 2: Backend Basics (Hours 3-6)
 Implement user authentication: JWT login/signup with college email validation (Backend Specialist).

 Build API endpoints for profiles: CRUD operations for alumni/student data (Backend Specialist).

 Add verification logic: Check email domains and LinkedIn URLs (Backend Specialist).

 Set up referral request system: Endpoints for sending/accepting requests with limits (e.g., 3 per day) (Backend Specialist).

 Integrate basic database: Connect MongoDB and seed with dummy data (Backend Specialist).

 Parallel: Frontend Specialist sketches wireframes for directory, profiles, and messaging.

 Parallel: Tester/Designer researches security best practices (e.g., HTTPS setup).

Phase 3: Core Features Development (Hours 7-10)
 Develop alumni directory with search filters (company, year, package): Backend APIs first, then frontend integration (Backend and Frontend Specialists collaborate).

 Build student profile creation and showcase features (Frontend Specialist leads UI, Backend handles storage).

 Implement referral request form and notifications (e.g., via email or in-app) (Frontend Specialist).

 Add basic reputation flags (e.g., rating system post-interaction) (Backend Specialist).

 Parallel: Tester/Designer starts writing test cases for user flows (e.g., search, request submission).

 Lead: Monitor progress and resolve any integration issues between backend and frontend.

Phase 4: Frontend and Integration (Hours 11-14)
 Create React components: Search page, profile views, request forms (Frontend Specialist).

 Implement secure messaging: Use Socket.io for real-time chat on accepted requests (Frontend Specialist with Backend support).

 Connect all frontend to backend APIs: Ensure data flows correctly (e.g., search results display) (Frontend and Backend Specialists).

 Add admin dashboard basics: Simple view for monitoring requests/profiles (Frontend Specialist).

 Parallel: Tester/Designer sets up deployment on Heroku and tests initial APIs with Postman.

 Lead: Conduct a mid-hackathon demo dry-run to identify usability gaps.

Phase 5: Testing and Debugging (Hours 15-18)
 Run end-to-end tests: Simulate student-alumni interactions, check for errors like failed requests (Tester/Designer leads).

 Test trust features: Verify email checks, request limits, and spam prevention (All team members).

 Debug common issues: Fix bugs in search accuracy, UI responsiveness, and security (e.g., encryption) (Backend and Frontend Specialists).

 Load test with dummy users: Ensure no crashes under light load (Tester/Designer).

 Parallel: Lead prepares pitch script, focusing on referral risk solutions and college-specific tailoring.

 Gather team feedback: Quick roundtable to prioritize fixes.

Phase 6: Polish and Optimization (Hours 19-22)
 Enhance UI/UX: Add styling (e.g., Material-UI), tooltips, and error messages (Frontend Specialist and Tester/Designer).

 Implement final safeguards: Disclaimers for referrals, keyword filters for chats (Backend Specialist).

 Optimize performance: Ensure fast searches and loads (All team members test on different devices).

 Add demo features: Landing page explaining the app and onboarding flow (Frontend Specialist).

 Parallel: Tester/Designer creates analytics logs (e.g., track requests) for demo insights.

 Lead: Finalize deployment and backup data.

Phase 7: Demo Prep and Wrap-Up (Hours 23-24)
 Rehearse full demo: Walk through key flows (search, request, messaging) with dummy scenarios (All team members).

 Prepare presentation: Highlight MVP strengths, how it tackles referral risks, and future ideas (Lead).

 Document code: Add comments and a README for judges (Backend and Frontend Specialists).

 Backup everything: Push final commits and export database (Tester/Designer).

 Celebrate and rest: Quick team debrief on what worked well.

Installation
Clone the repo: git clone [repo-url]

Install dependencies: npm install (backend and frontend folders)

Set up MongoDB and env variables (e.g., JWT secret, database URI)

Run: npm start for backend; npm run start for frontend
