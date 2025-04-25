export interface ITask {
  id: string;
  title: string;
  description?: string;
  due_date?: string;
  status: "pending" | "completed" | "in_progress";
  user_id: string;
  created_at?: string;
}

export interface ITaskResult {
  success: boolean;
  task: ITask;
}

export interface IPaginationResultTask {
  success: boolean;
  tasks: ITask[];
  pagination: {
    page: number;
    limit: number;
    total: number | null;
  };
}

export interface IMessageResultTask {
  success: boolean;
  message: string;
  task?: ITask;
}
