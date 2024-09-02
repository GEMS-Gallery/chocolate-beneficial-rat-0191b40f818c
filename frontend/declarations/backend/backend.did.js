export const idlFactory = ({ IDL }) => {
  const Task = IDL.Record({
    'id' : IDL.Nat,
    'title' : IDL.Text,
    'dueDate' : IDL.Int,
    'isOverdue' : IDL.Bool,
  });
  const Category = IDL.Record({
    'id' : IDL.Nat,
    'tasks' : IDL.Vec(Task),
    'icon' : IDL.Text,
    'name' : IDL.Text,
  });
  return IDL.Service({
    'addCategory' : IDL.Func([IDL.Text, IDL.Text], [IDL.Nat], []),
    'addTask' : IDL.Func([IDL.Nat, IDL.Text, IDL.Int], [IDL.Opt(IDL.Nat)], []),
    'editTaskDate' : IDL.Func([IDL.Nat, IDL.Nat, IDL.Int], [IDL.Bool], []),
    'getCategories' : IDL.Func([], [IDL.Vec(Category)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
