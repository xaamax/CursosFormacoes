import Container from "@/components/container";
import ContentHeader from "@/components/content-header";
import FilterAdd from "@/components/filter-add/filter-add";
import Loading from "@/components/loading/loading";
import useCourseTrainingService from "@/services/courseTrainingService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSwal } from "@/hooks/sweet-alert";
import { CourseTraining } from "@/models/course-training";
import { useTable } from "@/components/table/table";

const fieldsTable = [
  { col: "Descrição", field: "description" },
  { col: "Data Início", field: "start_date", type: "date" },
  { col: "Data Final", field: "end_date", type: "date" },
  { col: "Total Horas", field: "total_hours" },
];

function CourseTrainings() {
  const navigate = useNavigate();
  const swal = useSwal();
  const [tableProps, setTableProps] = useState({
    fields: fieldsTable,
    actionButtons: {
      btnEdit: (id: number) => navigate(`/editar-curso-formacao/${id}`),
      btnDelete: (courseTraining: CourseTraining) => handleCourseTrainingDelete(courseTraining),
    },
    actionDetails: true
  })

  const { Table, handleFilterTable, setFilterRows } = useTable(tableProps);

  const { getAllCourseTrainings, isLoading, deleteCourseTraining, response } =
    useCourseTrainingService();

  useEffect(() => {
    getAllCourseTrainings()
  }, []);

  useEffect(() => {
    setTableProps((prevs) => ({...prevs, rows: response}))
    setFilterRows(response || []);
  },[response])

  const handleCourseTrainingDelete = (courseTraining: CourseTraining) => {
    swal
      .fire({
        title: "Tem certeza que deseja excluir?",
        html: `
        <div style="display: flex; flex-direction: column; align-items: center;">
          <strong>Curso/Formação:</strong> ${courseTraining.description} <br />
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
          deleteCourseTraining(Number(courseTraining.id));
        }
      });
  };

  return (
    <div>
      {isLoading && <Loading />}
      <Container>
        <ContentHeader title="Cursos / Formações" />
        <FilterAdd
          onChange={(e) => handleFilterTable(e.target.value)}
          btnLink={{ title: "Incluir Curso / Formação", path: "/incluir-curso-formacao" }}
        />
        <Table />
      </Container>
    </div>
  );
}

export default CourseTrainings;
