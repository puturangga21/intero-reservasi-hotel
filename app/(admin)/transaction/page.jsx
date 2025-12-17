import { Separator } from '@/components/ui/separator';
import DataTable from './data-table';

export default function Page() {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Management Transaction</h1>
          <p className="text-sm text-muted-foreground">Management transaction history</p>
        </div>
      </div>

      <Separator />

      <DataTable />
    </div>
  );
}
