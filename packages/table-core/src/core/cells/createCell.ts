import type { CellData, RowData } from '../../types/type-utils'
import type { TableFeatures } from '../../types/TableFeatures'
import type { Table } from '../../types/Table'
import type { Row } from '../../types/Row'
import type { Cell } from '../../types/Cell'
import type { Column } from '../../types/Column'
import type { Cell_CoreProperties } from './Cells.types'

export function _createCell<
  TFeatures extends TableFeatures,
  TData extends RowData,
  TValue extends CellData = CellData,
>(
  column: Column<TFeatures, TData, TValue>,
  row: Row<TFeatures, TData>,
  table: Table<TFeatures, TData>,
): Cell<TFeatures, TData, TValue> {
  const cell: Cell_CoreProperties<TFeatures, TData, TValue> = {
    column,
    id: `${row.id}_${column.id}`,
    row,
  }

  for (const feature of Object.values(table._features)) {
    feature?._createCell?.(cell as Cell<TFeatures, TData, TValue>, table)
  }

  return cell as Cell<TFeatures, TData, TValue>
}