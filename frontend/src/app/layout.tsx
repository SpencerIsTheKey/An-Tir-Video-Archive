'use client'
import { Inter } from 'next/font/google';
import './globals.css';
import Head from './head';
import NavBar from '@/components/common/NavBar/NavBar';
import Footer from '@/components/common/Footer';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head/>
      <body className={inter.className}>
          <NavBar />
          {children}
          <Footer />
      </body>
    </html>
  )
}
