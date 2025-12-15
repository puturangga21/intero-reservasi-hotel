import axios from 'axios';
import { Button } from '../ui/button';
import { getBaseUrl } from '@/lib/utils';
import { toast } from 'sonner';

export default function FormLogout() {
  const handleLogout = async () => {
    const baseUrl = getBaseUrl();
    try {
      const response = await axios.post(`${baseUrl}/api/logout`);

      if (response.data.success) {
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Gagal melakukan logout');
    }
  };

  return (
    <Button variant="outline" size="sm" className="w-full" onClick={handleLogout}>
      Logout
    </Button>
  );
}
