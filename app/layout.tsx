import './globals.css'
import { Neuton } from 'next/font/google'
import Navbar from './components/navbar/Navbar'
import ClientOnly from './components/navbar/ClientOnly'
import Modal from './components/modals/Modal'

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb Clone',
}

const font = Neuton({
  subsets: ["latin"],
  weight: '200'     
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
          <Modal  isOpen/>
         <Navbar />
        </ClientOnly>
     
        {children}
        </body>
    </html>
  )
}
