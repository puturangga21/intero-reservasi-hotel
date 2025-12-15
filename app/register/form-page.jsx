import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function FormPage() {
  return (
    <form className="grid gap-6">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="fullname">Fullname</Label>
          <Input
            id="fullname"
            type="text"
            placeholder="Rangga Sutha"
            required
            className="h-11"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="puturangga21@gmail.com"
            required
            className="h-11"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="" required className="h-11" />
        </div>

        <Button type="submit" className="w-full h-11 text-base mt-2">
          Login
        </Button>
      </div>
    </form>
  );
}
