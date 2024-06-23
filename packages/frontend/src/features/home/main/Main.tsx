import './Main.css'
import { Input } from '@/app/components/elements/input/Input'
import { SelectDatasource } from '@/app/components/elements/select_dataset/SelectDatasource'

export function Main() {
  return (
    <main className="main">
      <div className="main__dataset">
        <SelectDatasource />
      </div>
      <div className="main__response">
        <a>
          <p>ここにレスポンスが表示されます</p>
        </a>
      </div>
      <div className="main__input">
        <Input />
      </div>
    </main>
  )
}
