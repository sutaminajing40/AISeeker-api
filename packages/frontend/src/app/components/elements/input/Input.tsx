import React from 'react'
import './Input.css'
import Icon from '@mdi/react'
import { mdiArrowRightBoldBox } from '@mdi/js'

export function Input() {
  return (
    <div className="input-container">
      <input
        className="input"
        type="text"
        placeholder="知りたい質問を書いてください(⌘ + Enterで送信)"
      />
      <Icon path={mdiArrowRightBoldBox} size={1} className="input-icon" />
    </div>
  )
}
