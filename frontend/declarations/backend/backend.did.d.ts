import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface CategoryTasks { 'tasks' : Array<Task>, 'category' : string }
export interface Task {
  'title' : string,
  'dueDate' : string,
  'isOverdue' : boolean,
  'category' : string,
}
export interface _SERVICE {
  'getTasksByCategory' : ActorMethod<[], Array<CategoryTasks>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
