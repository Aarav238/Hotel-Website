import './globals.css'
import { Neuton } from 'next/font/google'
import Navbar from './components/navbar/Navbar'
import ClientOnly from './components/navbar/ClientOnly'
import RegisterModal from './components/modals/RegisterModal'

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
          <RegisterModal/>
         <Navbar />
        </ClientOnly>
     
        {children}
        </body>
    </html>
  )
}
