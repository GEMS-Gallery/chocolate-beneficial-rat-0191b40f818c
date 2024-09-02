import Bool "mo:base/Bool";
import Hash "mo:base/Hash";
import Option "mo:base/Option";

import Time "mo:base/Time";
import Array "mo:base/Array";
import Text "mo:base/Text";
import Result "mo:base/Result";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";

actor {
  type Task = {
    id: Nat;
    title: Text;
    category: Text;
    dueDate: Time.Time;
    completed: Bool;
  };

  stable var nextId: Nat = 0;
  let taskMap = HashMap.HashMap<Nat, Task>(0, Nat.equal, Nat.hash);

  public func addTask(title: Text, category: Text, dueDate: Time.Time) : async Result.Result<Nat, Text> {
    let id = nextId;
    nextId += 1;
    let task: Task = {
      id = id;
      title = title;
      category = category;
      dueDate = dueDate;
      completed = false;
    };
    taskMap.put(id, task);
    #ok(id)
  };

  public query func getTasks() : async [Task] {
    Array.tabulate(taskMap.size(), func (i: Nat) : Task {
      switch (taskMap.get(i)) {
        case (?task) task;
        case null {
          {
            id = 0;
            title = "";
            category = "";
            dueDate = 0;
            completed = false;
          }
        };
      }
    })
  };

  public func updateTask(id: Nat, title: ?Text, category: ?Text, dueDate: ?Time.Time, completed: ?Bool) : async Result.Result<(), Text> {
    switch (taskMap.get(id)) {
      case (?task) {
        let updatedTask: Task = {
          id = id;
          title = Option.get(title, task.title);
          category = Option.get(category, task.category);
          dueDate = Option.get(dueDate, task.dueDate);
          completed = Option.get(completed, task.completed);
        };
        taskMap.put(id, updatedTask);
        #ok()
      };
      case null #err("Task not found")
    }
  };

  public func deleteTask(id: Nat) : async Result.Result<(), Text> {
    switch (taskMap.remove(id)) {
      case (?_) #ok();
      case null #err("Task not found")
    }
  };
}
