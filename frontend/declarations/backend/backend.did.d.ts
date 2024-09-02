import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Category {
  'tasks' : Array<Task>,
  'icon' : string,
  'name' : string,
}
export interface Task {
  'title' : string,
  'dueDate' : string,
  'isOverdue' : boolean,
}
export interface _SERVICE { 'getCategories' : ActorMethod<[], Array<Category>> }
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
