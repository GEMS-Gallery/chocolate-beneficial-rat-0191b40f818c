import Bool "mo:base/Bool";

import Array "mo:base/Array";
import Text "mo:base/Text";

actor {
  type Task = {
    title: Text;
    category: Text;
    dueDate: Text;
    isOverdue: Bool;
  };

  let tasks: [Task] = [
    { title = "Implement generous freemium model"; category = "GEMS"; dueDate = "Sep 15, 2024"; isOverdue = false },
    { title = "Complete Web IDE integration"; category = "GEMS"; dueDate = "Oct 1, 2024"; isOverdue = false },
    { title = "Develop build & debug features"; category = "Web IDE"; dueDate = "Sep 20, 2024"; isOverdue = false },
    { title = "Create Sample App Carousel"; category = "Web IDE"; dueDate = "Sep 30, 2024"; isOverdue = false },
    { title = "Advertise on every technical documentation page"; category = "Web IDE"; dueDate = "Oct 10, 2024"; isOverdue = false },
    { title = "Launch Airdrop campaign"; category = "OISY"; dueDate = "Aug 31, 2024"; isOverdue = true },
    { title = "Implement Signer Standard"; category = "OISY"; dueDate = "Sep 25, 2024"; isOverdue = false },
    { title = "Ensure destination compatibility"; category = "OISY"; dueDate = "Oct 5, 2024"; isOverdue = false },
    { title = "Optimize DEX Liquidity"; category = "OISY"; dueDate = "Oct 15, 2024"; isOverdue = false },
    { title = "Implement Subsidized DEX Yield"; category = "OISY"; dueDate = "Oct 30, 2024"; isOverdue = false }
  ];

  public query func getTasks() : async [Task] {
    tasks
  };
}
