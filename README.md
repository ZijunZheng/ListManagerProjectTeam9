# List Manager Web App

Members:
- Gerry Summers
- Jim Zheng
- Thomas Robertson

<hr>

This app allows users to manage a list of items, including adding, deleting, displaying, and editing items. The tasks are stored in a `data.json` file through interaction with a backend server.

## Features

- **Add Task:** Users can input a new task and add it to the list.
- **Delete Task:** Users can remove a task from the list.
- **Display Tasks:** Displays the list of tasks in the user interface.
- **Edit Task:** Users can update the description of an existing task.
  
## How It Works

1. **Add Task:**
   - The user enters a task description in the input field and clicks the **Add** button.
   - The task data is sent to the backend using a **POST** request to be stored in a `data.json` file.
   - Once the task is added, the list is updated with the new task.

2. **Delete Task:**
   - The user can delete the most recently added task by clicking the **Delete Last** button.
   - The task is removed from the UI and also updated on the backend (by sending a **DELETE** request to the backend).

3. **Edit Task:**
   - The user can edit an existing task from the list.
   - Once a task is edited, the changes are sent to the backend via a **PUT** request, and the task is updated in the `data.json` file.

4. **Display Tasks:**
   - The list of tasks is automatically displayed on the page as users add new tasks.
   - The UI is updated in real-time, reflecting the current state of the tasks stored in the backend.

### Backend Interaction:

- **POST Request (Add Task):** When the user adds a task, the data is sent to the backend through a POST request. The backend processes this request and stores the task in a `data.json` file.
  
- **DELETE Request (Delete Task):** When the user deletes a task, the backend receives a DELETE request, and the task is removed from the data file.

- **PUT Request (Edit Task):** When the user edits a task, the changes are sent via a PUT request to the backend, where the task is updated in the `data.json` file.

- **GET Request (Retrieve Tasks):** When the page loads, a GEt request is made to fetch the tasks from the backend, and then the list is displayed on the frontend.