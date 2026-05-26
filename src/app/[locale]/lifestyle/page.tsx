import LifestyleClient from '@/components/LifestyleClient';
import { getLifestyleItems } from '@/utils/lifestyle';

export default function LifestylePage() {
  const items = getLifestyleItems();
  return <LifestyleClient items={items} />;
}
