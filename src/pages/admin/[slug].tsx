import { useRouter } from 'next/router';
import UserProfile from '~/components/admin/UserProfile';
import AdminLayout from '~/components/admin/layout';

export default function UserProfilePage() {
  const router = useRouter();
  return (
    <AdminLayout>
      <UserProfile docId={router.query.slug as string} />
    </AdminLayout>
  );
}
