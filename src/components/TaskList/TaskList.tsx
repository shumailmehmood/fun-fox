import React from "react";
import { Grid } from "@mui/material";
import Task from "../../models/Task";
import CustomCard from "../Card/Card";
import { Draggable, Droppable, DroppableProvided } from "react-beautiful-dnd";
import ListHeader from "../ListHeader/ListHeader";

interface TaskListProps {
  tasks: Task[];
  deleteTask: (taskId: number) => void;
  toggleComplete: (taskId: number) => void;
  addTask: (newTask: Task) => void;
  reorderTasks: (tasks: Task[]) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  deleteTask,
  toggleComplete,
  addTask,
}) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs />
      <Grid
        direction="column"
        alignItems="center"
        justifyContent="center"
        item
        xs={12}
        sm={6}
        md={6}
      >
        <ListHeader addTask={addTask} />
        <Droppable droppableId="tasks">
          {(provided: DroppableProvided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {tasks.map((task, index) => (
                <Draggable
                  key={task.id.toString()}
                  draggableId={task.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <CustomCard
                        name={task.title}
                        description={task.description}
                        status={task.completed}
                        onDelete={() => deleteTask(task.id)}
                        onToggleStatus={() => toggleComplete(task.id)}
                        date={task.lastUpdated}
                        taskId={task.id}
                        addedBy={task?.addedBy}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Grid>
      <Grid item xs />
    </Grid>
  );
};

export default TaskList;
