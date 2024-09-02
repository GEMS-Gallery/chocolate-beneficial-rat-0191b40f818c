export const idlFactory = ({ IDL }) => {
  const Task = IDL.Record({
    'title' : IDL.Text,
    'dueDate' : IDL.Text,
    'isOverdue' : IDL.Bool,
    'category' : IDL.Text,
  });
  const CategoryTasks = IDL.Record({
    'tasks' : IDL.Vec(Task),
    'category' : IDL.Text,
  });
  return IDL.Service({
    'getTasksByCategory' : IDL.Func([], [IDL.Vec(CategoryTasks)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
