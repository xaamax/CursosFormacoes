import Container from "@/components/container";
import ContentHeader from "@/components/content-header";
import FilterAdd from "@/components/filter-add/filter-add";
import Loading from "@/components/loading/loading";
import useCourseRegistrationService from "@/services/courseRegistrationService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSwal } from "@/hooks/sweet-alert";
import { CourseRegistration } from "@/models/course-registration";
import { useTable } from "@/components/table/table";

const fieldsTable = [
  { col: "Nº Inscrição", field: "id" },
  { col: "Professor", field: "teacher.name" },
  { col: "Curso", field: "course_training.title" },
  { col: "Progresso", field: "progress" },
];

function CourseRegistrations() {
  const navigate = useNavigate();
  const swal = useSwal();
  const [tableProps, setTableProps] = useState({
    fields: fieldsTable,
    actionButtons: {
      btnEdit: (id: number) => navigate(`/editar-inscricao/${id}`),
      btnDelete: (courseRegistration: CourseRegistration) => handleCourseRegistrationDelete(courseRegistration),
    },
  })

  const { Table, handleFilterTable, setFilterRows } = useTable(tableProps);

  const { getAllCourseRegistrations, isLoading, deleteCourseRegistration, response } =
    useCourseRegistrationService();

  useEffect(() => {
    getAllCourseRegistrations()
  }, []);

  useEffect(() => {
    setTableProps((prevs) => ({...prevs, rows: response}))
    setFilterRows(response || []);
  },[response])

  const handleCourseRegistrationDelete = (courseRegistration: CourseRegistration) => {
    swal
      .fire({
        title: "Tem certeza que deseja excluir?",
        html: `
        <div style="display: flex; flex-direction: column; align-items: center;">
          <strong>Nº Inscrição:</strong> ${courseRegistration.id} <br />
          <strong>Professor:</strong> ${courseRegistration.teacher?.name} <br />
          <strong>Curso:</strong> ${courseRegistration.course_training?.title} <br />
        </div>
      `,
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmar",
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteCourseRegistration(Number(courseRegistration.id));
        }
      });
  };

  return (
    <div>
      {isLoading && <Loading />}
      <Container>
        <ContentHeader title="Inscrições" />
        <FilterAdd
          onChange={(e) => handleFilterTable(e.target.value)}
          btnLink={{ title: "Incluir Inscrição", path: "/incluir-inscricao" }}
        />
        <Table />
      </Container>
    </div>
  );
}

export default CourseRegistrations;
