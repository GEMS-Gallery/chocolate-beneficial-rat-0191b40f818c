export const idlFactory = ({ IDL }) => {
  const Task = IDL.Record({
    'title' : IDL.Text,
    'dueDate' : IDL.Text,
    'isOverdue' : IDL.Bool,
  });
  const Category = IDL.Record({
    'tasks' : IDL.Vec(Task),
    'icon' : IDL.Text,
    'name' : IDL.Text,
  });
  return IDL.Service({
    'getCategories' : IDL.Func([], [IDL.Vec(Category)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
