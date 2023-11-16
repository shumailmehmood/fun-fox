import React, { useState } from "react";
import TaskList from "./components/TaskList/TaskList";
import Task from "./models/Task";
import Layout from "./layout/layout";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { theme } from "./theme/theme";
import { ThemeProvider } from "@mui/material/styles";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (newTask: Task) => {
    setTasks([...tasks, { ...newTask, lastUpdated: new Date() }]);
  };

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const toggleComplete = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed, lastUpdated: new Date() }
          : task
      )
    );
  };

  const reorderTasks = (newTasks: Task[]) => {
    setTasks(newTasks);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedTasks = Array.from(tasks);
    const [removed] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, removed);
    console.log("Reorder", reorderedTasks);
    reorderTasks(reorderedTasks);
  };

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <TaskList
                  tasks={tasks}
                  deleteTask={deleteTask}
                  toggleComplete={toggleComplete}
                  addTask={addTask}
                  reorderTasks={reorderTasks}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
