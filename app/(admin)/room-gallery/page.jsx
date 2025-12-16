import { Separator } from '@/components/ui/separator';
import { AddData } from './add-data';
import DataTable from './data-table';

export default function Page() {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Management Room Gallery</h1>
          <p className="text-sm text-muted-foreground">Management room gallery</p>
        </div>

        <AddData />
      </div>

      <Separator />

      <DataTable />
    </div>
  );
}
