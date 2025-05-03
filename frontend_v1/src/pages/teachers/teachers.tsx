import Container from "@/components/container";
import ContentHeader from "@/components/content-header";
import FilterAdd from "@/components/filter-add/filter-add";
import Loading from "@/components/loading/loading";
import { useTable } from "@/components/table/table";
import useTeacherService from "@/services/teacherService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSwal } from "@/hooks/sweet-alert";
import { Teacher } from "@/models/teacher";

const fieldsTable = [
  { col: "Nome", field: "name" },
  { col: "E-mail", field: "email" },
  { col: "Escola", field: "school" },
  { col: "Turma", field: "school_class" },
];

function Teachers() {
  const navigate = useNavigate();
  const swal = useSwal();
  const [tableProps, setTableProps] = useState({
    fields: fieldsTable,
    actionButtons: {
      btnEdit: (id: number) => navigate(`/editar-professor/${id}`),
      btnDelete: (teacher: Teacher) => handleTeacherDelete(teacher),
    },
  })

  const { Table, handleFilterTable, setFilterRows } = useTable(tableProps);

  const { getAllTeachers, isLoading, deleteTeacher, response } =
    useTeacherService();

  useEffect(() => {
    getAllTeachers()
  }, []);

  useEffect(() => {
    setTableProps((prevs) => ({...prevs, rows: response}))
    setFilterRows(response || []);
  },[response])

  const handleTeacherDelete = (teacher: Teacher) => {
    swal
      .fire({
        title: "Tem certeza que deseja excluir?",
        html: `
        <div style="display: flex; flex-direction: column; align-items: center;">
          <strong>Professor:</strong> ${teacher.name} <br />
          <strong>Email:</strong> ${teacher.email}
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
          deleteTeacher(Number(teacher.id));
        }
      });
  };

  return (
    <div>
      {isLoading && <Loading />}
      <Container>
        <ContentHeader title="Professores" />
        <FilterAdd
          onChange={(e) => handleFilterTable(e.target.value)}
          btnLink={{ title: "Incluir Professor", path: "/incluir-professor" }}
        />
        <Table />
      </Container>
    </div>
  );
}

export default Teachers;
