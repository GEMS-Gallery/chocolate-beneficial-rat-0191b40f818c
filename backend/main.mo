import Bool "mo:base/Bool";

import Array "mo:base/Array";
import Text "mo:base/Text";

actor {
  type Task = {
    title: Text;
    dueDate: Text;
    isOverdue: Bool;
  };

  type Category = {
    name: Text;
    icon: Text;
    tasks: [Task];
  };

  let categories: [Category] = [
    {
      name = "GEMS";
      icon = "package";
      tasks = [
        { title = "Implement generous freemium model"; dueDate = "Sep 15, 2024"; isOverdue = false },
        { title = "Complete Web IDE integration"; dueDate = "Oct 1, 2024"; isOverdue = false }
      ];
    },
    {
      name = "Web IDE";
      icon = "code";
      tasks = [
        { title = "Develop build & debug features"; dueDate = "Sep 20, 2024"; isOverdue = false },
        { title = "Create Sample App Carousel"; dueDate = "Sep 30, 2024"; isOverdue = false },
        { title = "Advertise on every technical documentation page"; dueDate = "Oct 10, 2024"; isOverdue = false }
      ];
    },
    {
      name = "OISY";
      icon = "globe";
      tasks = [
        { title = "Launch Airdrop campaign"; dueDate = "Aug 31, 2024"; isOverdue = true },
        { title = "Implement Signer Standard"; dueDate = "Sep 25, 2024"; isOverdue = false },
        { title = "Ensure destination compatibility"; dueDate = "Oct 5, 2024"; isOverdue = false },
        { title = "Optimize DEX Liquidity"; dueDate = "Oct 15, 2024"; isOverdue = false },
        { title = "Implement Subsidized DEX Yield"; dueDate = "Oct 30, 2024"; isOverdue = false }
      ];
    }
  ];

  public query func getCategories() : async [Category] {
    categories
  };
}
