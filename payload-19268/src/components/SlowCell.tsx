import type { DefaultServerCellComponentProps } from 'payload'

export async function SlowCell({ rowData }: DefaultServerCellComponentProps) {
  await new Promise((resolve) => setTimeout(resolve, 1500))
  return <span>loaded for {String(rowData?.email)}</span>
}
