document.addEventListener('DOMContentLoaded', () => {
      const taskInput = document.getElementById('todo-input');
      const addBtn = document.getElementById('add-btn');
      const taskList = document.getElementById('task-list');

      // Fetch tasks from the server
      async function fetchTasks() {
        try {
          const response = await fetch('/tasks');
          const tasks = await response.json();
          renderTasks(tasks);
        } catch (error) {
          console.error('Error fetching tasks:', error);
        }
      }

      // Render tasks in the UI
      function renderTasks(tasks) {
        taskList.innerHTML = '';
        tasks.forEach(task => {
          const li = document.createElement('li');
          li.textContent = task.task;
          const deleteBtn = document.createElement('button');
          deleteBtn.className = 'delete-btn';
          deleteBtn.textContent = 'Delete';
          deleteBtn.addEventListener('click', () => deleteTask(task.id));
          li.appendChild(deleteBtn);
          taskList.appendChild(li);
        });
      }

      // Add a new task
      addBtn.addEventListener('click', async () => {
        const task = taskInput.value.trim();
        if (task) {
          try {
            await fetch('/tasks', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ task })
            });
            taskInput.value = '';
            fetchTasks();
          } catch (error) {
            console.error('Error adding task:', error);
          }
        }
      });

      // Delete a task
      async function deleteTask(id) {
        try {
          await fetch(`/tasks/${id}`, { method: 'DELETE' });
          fetchTasks();
        } catch (error) {
          console.error('Error deleting task:', error);
        }
      }

      // Fetch tasks on page load
      fetchTasks();
    });
