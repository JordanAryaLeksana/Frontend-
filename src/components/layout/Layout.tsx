import * as React from 'react';
import NavbarItem from './Navbar';
import { usePathname } from 'next/navigation';
import Splash from '@/pages/splash';
import { useRouter } from 'next/router';
import Image from 'next/image';
import NavbarMobile from './NavbarMobile';
type LayoutPros = {
  children: React.ReactNode;
  withFooter?: boolean;
  withNavbar?: boolean;
} & React.ComponentPropsWithRef<'div'>;

export default function Layout({
  children,
  withFooter = true,
  withNavbar = true,
}: LayoutPros) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();

  React.useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => setLoading(false), 10000); // Splash screen tampil selama 10 detik
      router.push("/oprec/registration");
      return () => clearTimeout(timer);
    }
  }, [loading, router]);

  return (
    <div className='overflow-x-hidden min-h-screen relative z-0'>
    
      {
        loading ?
          <Splash />
          :
          <>
            {withNavbar && <NavbarItem />}
            {children}
            {withFooter && <NavbarMobile />}
          </>
      }
    </div>
  );
}