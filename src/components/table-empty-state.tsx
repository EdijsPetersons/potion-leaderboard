import { TableCell, TableRow } from "@/components/ui/table";

interface TableEmptyStateProps {
  colSpan: number;
}

export function TableEmptyState({ colSpan }: TableEmptyStateProps) {
  return (
    <TableRow>
      <TableCell
        colSpan={colSpan}
        className="h-full text-center"
      >
        No results.
      </TableCell>
    </TableRow>
  );
}