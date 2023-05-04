import Image from 'next/image'
import { Inter } from 'next/font/google'
import NpmsAPI from '@/Components/NpmsAPI'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className="bg-gray-900 justify-center w-screen h-screen ">
    <NpmsAPI/>
  </div>
  )
}
