'use client'

import { useState } from 'react'

interface MemoryShareId {
  id: string
}

export default function ClipBoard({ id }: MemoryShareId) {
  const [shareUrl, setShareUrl] = useState('')

  function generateShareLink() {
    const url = `http://localhost:3000/memories/${id}`
    setShareUrl(url)
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(shareUrl)
    alert('Link copiado para a área de transferência!')
  }

  return (
    <div className="p-4">
      {!shareUrl && (
        <button
          className="inline-block rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
          onClick={generateShareLink}
        >
          Gerar Link de Compartilhamento
        </button>
      )}
      {shareUrl && (
        <button
          onClick={copyToClipboard}
          className="inline-block rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
        >
          Clique para compartilhar
        </button>
      )}
    </div>
  )
}
