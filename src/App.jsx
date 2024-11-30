import AddTask from "./pages/AddTask";
import TaskList from "./pages/TaskList";

const App = () => {
  return (
    <>
    <div className="ml-72 min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 p-4">
      <div className="w-full max-w-5xl p-6 sm:p-8 bg-white/90 backdrop-blur-sm shadow-xl rounded-lg border border-gray-200">
        <header className="mb-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800">
            Task Manager
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Organize your tasks
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <div className="p-6 bg-blue-50 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Add Task
            </h2>
            <AddTask />
          </div>

          <div className="p-6 bg-indigo-50 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Your Tasks
            </h2>
            <TaskList />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default App;
