import { createApp } from 'vue';

    const app = createApp({
      data() {
        return {
          tasks: []
        };
      },
      methods: {
        addTask() {
          const taskInput = document.getElementById('todo-input');
          const newTask = taskInput.value.trim();
          if (newTask) {
            this.tasks.push(newTask);
            taskInput.value = '';
            this.renderTasks();
          }
        },
        deleteTask(index) {
          this.tasks.splice(index, 1);
          this.renderTasks();
        },
        renderTasks() {
          const taskList = document.getElementById('task-list');
          taskList.innerHTML = '';
          this.tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.textContent = task;
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => this.deleteTask(index));
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
          });
        }
      },
      mounted() {
        this.renderTasks();
      }
    });

    app.mount('#app');

    document.getElementById('add-btn').addEventListener('click', () => {
      app.config.globalProperties.$data.addTask();
    });
