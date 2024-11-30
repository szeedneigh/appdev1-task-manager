import { useState } from "react";
import { db } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PlusCircle } from "lucide-react";

const AddTask = () => {
  const [task, setTask] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.title.trim() || !task.description.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "tasks"), {
        title: task.title,
        description: task.description,
        completed: false,
        createdAt: new Date().toISOString(),
      });
      setTask({ title: "", description: "" });
      setError(null);
    } catch (err) {
      setError("Error adding task: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <PlusCircle className="h-6 w-6 text-blue-600" />
        New Task
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          <div>
            <Input
              placeholder="Enter task title"
              value={task.title}
              onChange={(e) =>
                setTask((prev) => ({ ...prev, title: e.target.value }))
              }
              className="h-12 px-4 border-2 focus:ring-2 focus:ring-blue-500 text-lg"
            />
          </div>
          <div>
            <Textarea
              placeholder="Enter task description"
              value={task.description}
              onChange={(e) =>
                setTask((prev) => ({ ...prev, description: e.target.value }))
              }
              className="min-h-[120px] px-4 py-3 border-2 focus:ring-2 focus:ring-blue-500 text-lg resize-none"
            />
          </div>
        </div>
        <div className="pt-2">
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-lg font-medium transition-colors"
          >
            {loading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <PlusCircle className="mr-2 h-5 w-5" />
            )}
            Add Task
          </Button>
        </div>
      </form>
      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default AddTask;
