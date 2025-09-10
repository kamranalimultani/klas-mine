import { ReactNode } from 'react';
import InnerHeader from '../components/Header/InnerHeader'; 
import { Footer } from '../components/Footer/Footer';

export default function DynamicLayout({ children }: { children: ReactNode }) {
  return (
    <>
    <InnerHeader />
    <main className="">{children}</main>
    <Footer />
    </>
  );
}
