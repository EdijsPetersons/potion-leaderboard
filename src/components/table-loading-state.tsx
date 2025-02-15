import { SyncLoader } from 'react-spinners';
import { TableCell, TableRow } from "@/components/ui/table";

interface TableLoadingStateProps {
  colSpan: number;
}

export function TableLoadingState({ colSpan }: TableLoadingStateProps) {
  return (
    <TableRow>
      <TableCell
        colSpan={colSpan}
        align="center"
        className="h-20"
      >
        <SyncLoader color="white" size={6} />
      </TableCell>
    </TableRow>
  );
}