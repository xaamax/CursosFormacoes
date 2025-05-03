/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import "./style.css";
import moment from "moment";

interface TableProps {
  fields: { col: string; field: string; type?: string }[];
  rows?: any[];
  subfields?: { col: string; field: string }[];
  actionDetails?: boolean;
  actionButtons: {
    btnEdit: (param: any) => void;
    btnDelete: (param: any) => void;
  };
}

export const useTable = (props: TableProps) => {
  const { fields, rows = [], subfields, actionDetails, actionButtons } = props;

  const [filterSearch, setFilterSearch] = useState<string | null>(null);
  const [filterRows, setFilterRows] = useState<any[]>(rows);

  const handleFilterTable = (value: string) => {
    if (value) {
      setFilterSearch(value);
      const searchTerm = value.toLowerCase();
      const filtered = rows.filter((row) => {
        return fields.some((field) => {
          const fieldValue = getNestedValue(row, field.field);
          return String(fieldValue).toLowerCase().includes(searchTerm);
        });
      });

      setFilterRows(filtered);
    } else {
      setFilterSearch(null);
      setFilterRows(rows);
    }
  };

  const getNestedValue = (obj: any, path: string) => {
    if (obj === null || obj === undefined) return "***";

    // Verifica primeiro se é um objeto de data
    if (typeof obj === "object" && obj.type === "date") {
      return moment(obj).isValid()
        ? moment(obj).format("DD/MM/YYYY HH:mm")
        : "***";
    }

    // Busca em caminhos aninhados
    return path.split(".").reduce((acc, key) => {
      if (acc === "***") return acc; // Se já era inválido, mantém
      if (acc && typeof acc === "object" && key in acc) {
        return acc[key];
      }
      return "***";
    }, obj);
  };

  const Table: React.FC = () => {
    const [expandedRow, setExpandedRow] = useState<number | null>(null);

    const toggleDetails = (index: number) => {
      setExpandedRow(expandedRow === index ? null : index);
    };

    const formatValue = (type: string, value: any) => {
      if (type === "date") {
        return moment(value).isValid()
          ? moment(value).format("DD/MM/YYYY HH:mm")
          : "***";
      }
      return value;
    };

    return (
      <div className="table-content">
        <div className="table">
          <div className="row header">
            {fields.map((field, index) => (
              <div key={index} className="cell">
                {field.col}
              </div>
            ))}
            <div className="cell">Ações</div>
          </div>

          {!filterRows.length && (
            <div style={{ padding: "18px" }}>
              <span>Nenhum registro encontrado.</span>
            </div>
          )}

          {filterRows.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              <div className="row">
                {fields.map((col, colIndex) => (
                  <div key={colIndex} className="cell" data-title={col.col}>
                    {col.type
                      ? formatValue(col.type, getNestedValue(row, col.field))
                      : getNestedValue(row, col.field)}
                  </div>
                ))}
                <div className="cell">
                  {actionDetails && (
                    <button
                      className="btn-details"
                      onClick={() => toggleDetails(rowIndex)}
                    >
                      {expandedRow === rowIndex ? "- Detalhes" : "+ Detalhes"}
                    </button>
                  )}
                  <button
                    className="btn-details"
                    onClick={() => actionButtons.btnEdit(row.id)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => actionButtons.btnDelete(row)}
                  >
                    Excluir
                  </button>
                </div>
              </div>

              {expandedRow === rowIndex && (
                <div className="row details-row">
                  <div
                    className="cell details-cell"
                    aria-colspan={fields.length + 1}
                  >
                    <div className="details-content">
                      {subfields?.map((subfield, key) => (
                        <div key={key} className="detail-item">
                          <strong>{subfield.col}:</strong>
                          {getNestedValue(row, subfield.field)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  return {
    filterSearch,
    setFilterRows,
    handleFilterTable,
    Table,
  };
};
