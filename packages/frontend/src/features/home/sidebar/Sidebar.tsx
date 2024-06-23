'use client'

import './Sidebar.css'
import Image from 'next/image'

import { Button } from '@/app/components/elements/button/Button'

export function Sidebar() {
  return (
    <aside className="sidebar">
      <header className="sidebar-header">
        <Image src="/images/logo.png" alt="ロゴ" width={271} height={83} />
        <Button />
      </header>
      <main className="sidebar-content"></main>
      <footer className="sidebar-footer">
        <button className="sidebar-footer-button">
          <Image src="/images/user.png" alt="ユーザー" width={40} height={40} />
          <p>USER</p>
        </button>
      </footer>
    </aside>
  )
}
