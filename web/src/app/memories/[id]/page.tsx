/* eslint-disable @next/next/no-img-element */
import ClipBoard from '@/components/ClipBoard'
import EditMemoryForm from '@/components/EditMemoryForm'
import { EmptyMemories } from '@/components/EmptyMemories'
import { api } from '@/lib/api'
import dayjs from 'dayjs'
import { ArrowLeft } from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'

interface Memory {
  id: string
  coverUrl: string
  content: string
  createdAt: string
}
interface MemorySlug {
  params: {
    id: string
  }
}

export default async function MemoryForId({ params }: MemorySlug) {
  const isAuthenticated = cookies().has('token')

  if (!isAuthenticated) {
    return <EmptyMemories />
  }

  const token = cookies().get('token')?.value

  const res = await api.get(`/memories/${params.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const memory: Memory = res.data

  if (!isAuthenticated) {
    return <EmptyMemories />
  }

  return (
    <div className="flex flex-col gap-10 p-8">
      <div key={memory.id} className="space-y-4">
        <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
          {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
        </time>
        <img
          src={memory.coverUrl}
          width={280}
          height={280}
          alt=""
          className="aspect-video w-full rounded-lg object-cover"
        />
        <p className="text-lg leading-relaxed text-gray-50">{memory.content}</p>
        <Link
          href={'/'}
          className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para memorias
        </Link>
        <ClipBoard id={memory.id} />
        <p className="text-lg leading-relaxed text-gray-100">Editar memoria</p>

        <EditMemoryForm id={memory.id} />
      </div>
    </div>
  )
}
