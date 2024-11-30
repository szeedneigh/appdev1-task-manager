import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Trash2, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const TaskCard = ({ task }) => {
  const toggleStatus = async () => {
    
    try {
      const taskRef = doc(db, 'tasks', task.id);
      await updateDoc(taskRef, { completed: !task.completed });
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async () => {
    if (!window.confirm('Delete task?')) return;
    try {
      await deleteDoc(doc(db, 'tasks', task.id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const cardStyles = task.completed
    ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-green-100'
    : 'bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200 shadow-amber-100';

  const statusIcon = task.completed ? (
    <Check className="h-5 w-5 text-green-600" />
  ) : (
    <Clock className="h-5 w-5 text-amber-600" />
  );

  return (
    <Card className={`border-2 shadow-lg hover:shadow-xl transition-all ${cardStyles}`}>
      <motion.div 
        className="p-6"
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              {statusIcon}
              <h3 className={`font-semibold text-lg ${
                task.completed ? 'text-green-800' : 'text-amber-800'
              }`}>
                {task.title}
              </h3>
            </div>
            <p className="text-gray-600 ml-7">{task.description}</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleStatus}
              className={`
                transition-colors duration-200 
                ${task.completed 
                  ? 'text-green-600 border-green-200 hover:bg-green-100' 
                  : 'text-amber-600 border-amber-200 hover:bg-amber-100'}
              `}
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={deleteTask}
              className="text-red-600 border-red-200 hover:bg-red-100 transition-colors duration-200"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    </Card>
  );
};

export default TaskCard;