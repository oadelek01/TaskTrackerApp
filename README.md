# TaskTrackerApp

A simple web-based Task Tracker that lets you add, complete, delete, and filter tasks. Tasks are stored in the browser using `localStorage` so they persist across page reloads.

---

## Setup Instructions

1. Download or clone the repository
 
```bash
git clone https://github.com/oadelek01/TaskTrackerApp.git

2. Open the project folder and locate the index.html file.

3. Open index.html in a web browser (Chrome, Firefox, Edge, etc.) to start using the app.
No server or backend is required; it runs entirely in the browser.

What I Implemented

- Add Tasks: Enter a task title, select prority (Low, Medium, High), and optionally set a due date.
- Mark Complete / Undo: Click “Complete” to mark a task done, or “Undo” to unmark it.
- Delete Tasks: Remove tasks permanently from the list.
- ilter Tasks: View All, Active, or Completed tasks.
- Counters: Display total tasks and completed tasks dynamically.
- LocalStorage: Tasks persist across page reloads.
- Responsive Design: Works on both desktop and mobile devices.

Future Improvements

If I had more time, I would have like to add the following:

1. Priority Stack

- Automatically sort tasks so that High priority tasks appear first, followed by Medium, then Low.
- Ensures important tasks are always visible at the top of the list.

2. Deleted Tasks Section 

- Create a trash bin or deleted section to allow undoing deleted tasks.
- Provides a safety net for accidental deletions.