import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Category {
  'id' : bigint,
  'tasks' : Array<Task>,
  'icon' : string,
  'name' : string,
}
export interface Task {
  'id' : bigint,
  'title' : string,
  'dueDate' : bigint,
  'isOverdue' : boolean,
}
export interface _SERVICE {
  'addCategory' : ActorMethod<[string, string], bigint>,
  'addTask' : ActorMethod<[bigint, string, bigint], [] | [bigint]>,
  'editTaskDate' : ActorMethod<[bigint, bigint, bigint], boolean>,
  'getCategories' : ActorMethod<[], Array<Category>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
