import decode from 'jwt-decode'
import { cookies } from 'next/headers'

interface User {
  sub: string
  name: string
  avatarUrl: string
}

export function GetUser(): User {
  const token = cookies().get('token')?.value

  if (!token) {
    throw new Error('token not')
  }

  const user: User = decode(token)

  return user
}
