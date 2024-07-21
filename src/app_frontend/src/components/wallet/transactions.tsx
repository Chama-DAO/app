import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../@/components/ui/table";

export default function Transactions() {
  return (
    <div className="mt-4">
      <h1 className="font-heading text-3xl text-center">Transactions</h1>
      <Table>
        <TableCaption>A list of your recent transactions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">SN.</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">1.</TableCell>
            <TableCell>Wakulima Chama</TableCell>
            <TableCell>20/07/2022</TableCell>
            <TableCell className="text-right">KES 200</TableCell>
            <TableCell className="text-right">Success</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}