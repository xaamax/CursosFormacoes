import ContentHeader from "@/components/content-header";
import CourseTrainingForm from "./components/course-training-form";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useCourseTrainingService from "@/services/courseTrainingService";
import { CourseTraining } from "@/models/course-training";

export default function CourseTrainingDetails() {
  const { id } = useParams();
  const { getCourseTrainingDetails } = useCourseTrainingService();
  const [courseTraining, setCourseTraining] = useState<CourseTraining | null>(
    null
  );

  useEffect(() => {
    if (id)
      getCourseTrainingDetails(Number(id)).then((response) =>
        setCourseTraining(response)
      );
  }, [id]);

  return (
    <>
      <ContentHeader title={`${id ? 'Editar' : 'Incluir'} Curso/Formação`} />
      <CourseTrainingForm defaultValues={courseTraining} />
    </>
  );
}
