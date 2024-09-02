export const idlFactory = ({ IDL }) => {
  const Task = IDL.Record({
    'title' : IDL.Text,
    'dueDate' : IDL.Text,
    'isOverdue' : IDL.Bool,
    'category' : IDL.Text,
  });
  return IDL.Service({ 'getTasks' : IDL.Func([], [IDL.Vec(Task)], ['query']) });
};
export const init = ({ IDL }) => { return []; };
