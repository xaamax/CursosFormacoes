import { Teacher } from '@/models/teacher';
import { CourseTraining } from '@/models/course-training';

export interface CourseRegistration {
  id?: number;
  teacher_id: number;
  course_training_id: number;
  progress?: string
  teacher?: Teacher
  course_training?: CourseTraining
}
