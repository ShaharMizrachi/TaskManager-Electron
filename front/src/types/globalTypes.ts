export interface Task {
  id: string;
  task: string;
  status: string;
}

export interface ResponseTask {
  name: string;
  id: string;
  result: string;
  resultStatus: boolean;
  status: string;
  task: string;
}
