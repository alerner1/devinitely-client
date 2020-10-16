TODOS

FRIDAY:

* Signup and Login
  * DONE set up navbar component to render no matter what page you're on
  * DONE set up routes and components for login page if not authed (w/ redirect)
  * DONE set up routes and components for sign up page to work if not authed
  * DONE set up state to store user and token when logged in

* User Homepage
  * DONE navbar with appropriate routes/components (can be empty for now)
  * DONE components/design for activity dashboard
  * SOME DONE start working on job leads dashboard components and design if time -- routes to create form, show page, edit page, etc

MONDAY: 

* Job Leads Dashboard
  * flesh out job leads dashboard: all leads should display in a grid
  * implement create new button to redirect to form for creating new job lead
  * components and design for new job lead form

TUESDAY:

* Job Leads Dashboard
  * components and design for job lead show page
  * components and design for job lead edit page

AT THIS POINT WE SHOULD HAVE REACHED MVP.

WEDNESDAY: 

* Stretch goals:
  * Side Projects/Git Commits Dashboard
    * backend: update domain model and controllers/json
    * routes and components
    * design, implement
  * Blog Posts
    * backend: update domain model and controllers/json
    * routes and components 
    * design, implement
  * Calendar
    * integrate with Google Calendar API?
    * can add 1on1s with coach, interviews, other deadlines
  * Upload and store customized cover letter/resume
    * learn about active storage: https://edgeguides.rubyonrails.org/active_storage_overview.html
    * update backend accordingly
    * design and implement components so it automatically updates the checklist when you upload the corresponding file and you can redownload said files later

    ///////

    BUGS: 

    * when logged in, trying to go to any link (by directly entering it in url bar) sends you to /dashboards. WHY? (maybe a redirect to /login that then redirects to /dashboards. but how to stop that initial redirect to /login????)