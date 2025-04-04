export interface CourseTraining {
  id?: number;
  title: string;
  description?: string;
  start_date: Date | string;
  end_date: Date |  string;
  total_hours: number;
}
