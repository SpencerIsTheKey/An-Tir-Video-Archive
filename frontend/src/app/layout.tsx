'use client'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextAppDirEmotionCacheProvider} from 'tss-react/next/appDir';
import './globals.css'
import Head from './head';
import { GlobalStyles } from 'tss-react';
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
        <NextAppDirEmotionCacheProvider options={{key: "css"}}>
          <GlobalStyles 
            styles={{
              "&*":{
              padding:0,
                margin: 0,
                color: 'inherit',
                textDecoration: 'inherit'
              },
            }}
          />
          <NavBar />
          {children}
          <Footer />
        </NextAppDirEmotionCacheProvider>
      </body>
    </html>
  )
}
