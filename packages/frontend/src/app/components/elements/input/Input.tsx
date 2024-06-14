import React from 'react'
import './Input.css'

export function Input() {
  return (
    <input
      className="input"
      type="text"
      placeholder="知りたい質問を書いてください(⌘ + Enterで送信)"
    />
  )
}
