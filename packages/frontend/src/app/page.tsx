import { Main } from '@/features/home/main/Main'
import { Sidebar } from '@/features/home/sidebar/Sidebar'
import './main.css'

export default function Page() {
  return (
    <div className="container">
      <Sidebar />
      <Main />
    </div>
  )
}
