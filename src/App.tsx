import React, { useState, useContext, useEffect } from "react";
import TaskList from "./components/TaskList/TaskList";
import Task from "./models/Task";
import Layout from "./layout/layout";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { theme } from "./theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { AuthContext } from "./Auth/AuthContext";
import Login from "./components/Login/Login";
import Group from "./models/Group";
import Groups from "./components/Groups/Groups";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<number>(0);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get<Group[]>(
          `http://localhost:5000/groups`
        );
        let groupx = response.data.filter((res: any) =>
          res.users.includes(user?.id)
        );
        if (groupx.length === 1) fetchTasks(groupx[0].id);
        setGroups(groupx);
      } catch (error) {
        console.error("Error fetching Groups:", error);
      }
    };
    if (user) {
      fetchGroups();
    }
  }, [user]);

  const fetchTasks = async (groupId: number) => {
    try {
      const response = await axios.get<Task[]>(
        `http://localhost:5000/tasks?groupId=${groupId}`
      );
      setSelectedGroup(groupId);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = (newTask: Task) => {
    try {
      newTask = { ...newTask, groupId: selectedGroup };
      handleAddTask(newTask);
      fetchTasks(selectedGroup);
    } catch (e) {
      console.error("Error adding task", e);
    }
  };

  const deleteTask = async (taskId: number) => {
    try {
      await axios.delete<Group[]>(`http://localhost:5000/tasks/${taskId}`);
      fetchTasks(selectedGroup);
    } catch (e) {
      console.error("Error while deleting task", e);
    }
  };

  const toggleComplete = async (taskId: number) => {
    try {
      await axios.put<Task>(`http://localhost:5000/tasks/${taskId}`, {
        ...tasks.find((res) => res.id === taskId),
        completed: true,
      });
      fetchTasks(selectedGroup);
    } catch (e) {
      console.error("Error while mark complete task", e);
    }
  };

  const handleAddTask = async (task: Task) => {
    try {
      if (user) {
        await axios.post<Task>("http://localhost:5000/tasks", {
          ...task,
        });
        fetchTasks(selectedGroup);
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const reorderTasks = (newTasks: Task[]) => {
    setTasks(newTasks);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedTasks = Array.from(tasks);
    const [removed] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, removed);
    reorderTasks(reorderedTasks);
  };
  if (!user) {
    return <Login />;
  }
  if (groups.length > 1 && !selectedGroup) {
    return <Groups groups={groups} getTasks={fetchTasks} />;
  }

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
