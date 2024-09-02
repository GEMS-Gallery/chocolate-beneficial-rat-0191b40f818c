import Bool "mo:base/Bool";
import Nat "mo:base/Nat";

import Array "mo:base/Array";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Int "mo:base/Int";
import Buffer "mo:base/Buffer";
import Iter "mo:base/Iter";

actor {
  type Task = {
    id: Nat;
    title: Text;
    dueDate: Int;
    isOverdue: Bool;
  };

  type Category = {
    id: Nat;
    name: Text;
    icon: Text;
    tasks: [Task];
  };

  stable var categories : [Category] = [];
  stable var nextCategoryId: Nat = 0;
  stable var nextTaskId: Nat = 0;

  public func addCategory(name: Text, icon: Text) : async Nat {
    let id = nextCategoryId;
    nextCategoryId += 1;
    let newCategory: Category = {
      id = id;
      name = name;
      icon = icon;
      tasks = [];
    };
    categories := Array.append(categories, [newCategory]);
    id
  };

  public func addTask(categoryId: Nat, title: Text, dueDate: Int) : async ?Nat {
    let taskId = nextTaskId;
    nextTaskId += 1;
    let newTask: Task = {
      id = taskId;
      title = title;
      dueDate = dueDate;
      isOverdue = dueDate < Time.now();
    };
    categories := Array.map<Category, Category>(categories, func (category) {
      if (category.id == categoryId) {
        {
          id = category.id;
          name = category.name;
          icon = category.icon;
          tasks = Array.append(category.tasks, [newTask]);
        }
      } else {
        category
      }
    });
    ?taskId
  };

  public func editTaskDate(categoryId: Nat, taskId: Nat, newDueDate: Int) : async Bool {
    var found = false;
    categories := Array.map<Category, Category>(categories, func (category) {
      if (category.id == categoryId) {
        {
          id = category.id;
          name = category.name;
          icon = category.icon;
          tasks = Array.map<Task, Task>(category.tasks, func (task) {
            if (task.id == taskId) {
              found := true;
              {
                id = task.id;
                title = task.title;
                dueDate = newDueDate;
                isOverdue = newDueDate < Time.now();
              }
            } else {
              task
            }
          });
        }
      } else {
        category
      }
    });
    found
  };

  public query func getCategories() : async [Category] {
    categories
  };
}
