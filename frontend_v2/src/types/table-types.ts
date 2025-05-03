import { ColumnDef,RowData } from '@tanstack/react-table'

export interface CustomColumnMeta {
  title?: string,
}

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    className: string
  }
}

export type CustomColumnDef<TData> = ColumnDef<TData> & {
  meta?: CustomColumnMeta
}