import ContentHeader from "@/components/content-header";
import TeacherForm from "./components/teacher-form";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useTeacherService from "@/services/teacherService";
import { Teacher } from "@/models/teacher";

export default function TeacherDetails() {
  const { id } = useParams();
  const { getTeacherDetails } = useTeacherService()
  const [teacher, setTeacher] = useState<Teacher | null>(null);

  useEffect(() => {
    if(id) getTeacherDetails(Number(id)).then((response) => setTeacher(response))
  },[id])

  return (
    <>
      <ContentHeader title={`${id ? 'Editar' : 'Cadastrar'} Professor`} />
      <TeacherForm defaultValues={teacher} />
    </>
  );
}
