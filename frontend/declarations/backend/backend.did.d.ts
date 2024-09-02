import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type Result = { 'ok' : null } |
  { 'err' : string };
export type Result_1 = { 'ok' : bigint } |
  { 'err' : string };
export interface Task {
  'id' : bigint,
  'title' : string,
  'completed' : boolean,
  'dueDate' : Time,
  'category' : string,
}
export type Time = bigint;
export interface _SERVICE {
  'addTask' : ActorMethod<[string, string, Time], Result_1>,
  'deleteTask' : ActorMethod<[bigint], Result>,
  'getTasks' : ActorMethod<[], Array<Task>>,
  'updateTask' : ActorMethod<
    [bigint, [] | [string], [] | [string], [] | [Time], [] | [boolean]],
    Result
  >,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
