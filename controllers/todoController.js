const Todo = require('../models/Todo');

// 創建 todo 項目
exports.createTodo = async (req, res) => {
  const { mainMessage, subMessage, order } = req.body;

  try {
    const todo = new Todo({
      owner: req.userId,
      mainMessage,
      subMessage,
      order,
      lastToggled: new Date(),
    });

    await todo.save();
    res.status(201).json({ todo });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
};

// 獲取 todo 項目列表
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ owner: req.userId });
    res.status(200).json({ todos });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
};

// 更新 todo 項目
exports.updateTodo = async (req, res) => {
  const { todoId } = req.params;
  const { mainMessage, subMessage, order, isCompleted } = req.body;

  try {
    const todo = await Todo.findOne({ _id: todoId, owner: req.userId });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found.' });
    }

    todo.mainMessage = mainMessage !== undefined ? mainMessage : todo.mainMessage;
    todo.subMessage = subMessage !== undefined ? subMessage : todo.subMessage;
    todo.order = order !== undefined ? order : todo.order;
    todo.isCompleted = isCompleted !== undefined ? isCompleted : todo.isCompleted;
    todo.lastToggled = new Date();

    await todo.save();
    res.status(200).json({ todo });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
};

// 刪除 todo 項目
exports.deleteTodo = async (req, res) => {
  const { todoId } = req.params;

  try {
    const todo = await Todo.findOneAndDelete({ _id: todoId, owner: req.userId });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found.' });
    }

    res.status(200).json({ message: 'Todo deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
};
