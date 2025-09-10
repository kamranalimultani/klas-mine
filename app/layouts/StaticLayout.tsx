import { ReactNode } from 'react';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';

export default function StaticLayout({ children }: { children: ReactNode }) {

    return (
      <>
        <Header />
        <main>{children}</main>
        <Footer />
        </>
    );
  }