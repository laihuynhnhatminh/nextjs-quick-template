import Link from 'next/link';

import { APP_NAME } from '@/app-config';

import Container from '../Container';

export default async function Header() {
  return (
    <header className="mb-12 mt-8">
      <Container>
        <div
          id="header-div"
          className="flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-2">
            <p className="text-xl font-bold">
              <Link href={'/'}>{APP_NAME}</Link>
            </p>
          </div>
        </div>
      </Container>
    </header>
  );
}
