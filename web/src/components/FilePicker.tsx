'use client'

import { ChangeEvent, useState } from 'react'

export default function FilePicker() {
  const [preview, setPreview] = useState<null | string>(null)

  function onFileSelectionChange(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (!files) {
      return
    }

    const previewURL = URL.createObjectURL(files[0])

    setPreview(previewURL)
  }

  return (
    <>
      <input
        type="file"
        name="coverUrl"
        id="media"
        accept="image/*"
        className="invisible h-0 w-0"
        onChange={onFileSelectionChange}
      />

      {preview && (
        // eslint-disable-next-line
       <img
          src={preview}
          alt=""
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}
    </>
  )
}
