import ContentHeader from "@/components/content-header";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useCourseRegistrationService from "@/services/courseRegistrationService";
import CourseRegistrationForm from "./components/course-registration-form";
import { CourseTraining } from "@/models/course-training";
import { Teacher } from "@/models/teacher";
import { CourseRegistration } from "@/models/course-registration";

export default function CourseRegistrationDetails() {
  const { id } = useParams();
  const {
    getAllTeachersCourseTrainings,
    getCourseRegistrationDetails,
  } = useCourseRegistrationService();
  const [formData, setFormData] = useState<{
    course_registration: CourseRegistration | undefined;
    teachers: Teacher[];
    courses_trainings: CourseTraining[];
  }>({
    course_registration: undefined,
    teachers: [],
    courses_trainings: [],
  });

  useEffect(() => {
    getAllTeachersCourseTrainings().then((response) => {
      setFormData({
        ...formData,
        teachers: response?.teachers ?? [],
        courses_trainings: response?.courses_trainings ?? [],
      });
    });
  }, []);

  useEffect(() => {
    if (id) getCourseRegistrationDetails(Number(id)).then((response) => setFormData((prevs) => ({ ...prevs, course_registration: response })));
  }, [id]);

  return (
    <>
      <ContentHeader title={`${id ? "Editar" : "Incluir"} Inscrição`} />
      <CourseRegistrationForm defaultValues={formData} />
    </>
  );
}
