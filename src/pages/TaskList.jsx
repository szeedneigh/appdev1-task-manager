import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import TaskCard from "./TaskCard";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ListTodo, Loader2 } from "lucide-react";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "tasks"),
      (snapshot) => {
        const tasksData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(
          tasksData.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        );
        setLoading(false);
      },
      (error) => {
        setError("Error fetching tasks: " + error.message);
        setLoading(false); 
      }
    );

    return () => unsubscribe();
  }, []);

  if (error) {
    return (
      <Alert variant="destructive" className="w-full">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <h2 className="text-2xl font-semibold flex items-center gap-2">
        <ListTodo className="h-6 w-6 text-blue-600" />
        Your Tasks
      </h2>
      <div className="grid gap-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
      {tasks.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <ListTodo className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">
            No tasks yet. Start by adding your first task!
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskList;
