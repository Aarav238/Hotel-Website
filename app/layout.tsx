import './globals.css'
import {  Nunito } from 'next/font/google'
import Navbar from './components/navbar/Navbar'
import ClientOnly from './components/navbar/ClientOnly'
import RegisterModal from './components/modals/RegisterModal'
import ToasterProvider from './provider/ToasterProvider'
import LoginModal from './components/modals/LoginModal'

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb Clone',
}

const font =  Nunito({
  subsets: ["latin"],   
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider/>
          <LoginModal />
          <RegisterModal/>
         <Navbar />
        </ClientOnly>
     
        {children}
        </body>
    </html>
  )
}
