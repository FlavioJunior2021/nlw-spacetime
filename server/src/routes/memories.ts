import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function memoriesRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (req) => {
    await req.jwtVerify()
  })

  app.get('/memories', async (req) => {
    const memories = await prisma.memory.findMany({
      where: {
        userId: req.user.sub,
      },
      orderBy: { createdAt: 'asc' },
    })

    return memories.map((memory) => {
      return {
        id: memory.id,
        coverUrl: memory.coverUrl,
        content: memory.content.substring(0, 115).concat('...'),
      }
    })
  })

  app.get('/memories/:id', async (req, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(req.params)
    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    })

    if (!memory.isPublic && memory.userId !== req.user.sub) {
      return reply.status(401).send()
    }

    return memory
  })

  app.post('/memories', async (req) => {
    const bodyShema = z.object({
      content: z.string(),
      isPublic: z.coerce.boolean().default(false),
      coverUrl: z.string(),
    })

    const { content, isPublic, coverUrl } = bodyShema.parse(req.body)

    const memory = await prisma.memory.create({
      data: {
        content,
        isPublic,
        coverUrl,
        userId: req.user.sub,
      },
    })
    return memory
  })

  app.delete('/memories/:id', async (req, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(req.params)

    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    })

    if (memory.userId !== req.user.sub) {
      return reply.status(401).send()
    }

    await prisma.memory.delete({
      where: {
        id,
      },
    })
  })

  app.put('/memories/:id', async (req, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const bodyShema = z.object({
      content: z.string(),
      isPublic: z.coerce.boolean().default(false),
      coverUrl: z.string(),
    })

    const { id } = paramsSchema.parse(req.params)

    let memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    })

    if (memory.userId !== req.user.sub) {
      return reply.status(401).send()
    }

    memory = await prisma.memory.update({
      where: {
        id,
      },
      data: {
        content: bodyShema.parse(req.body).content,
        isPublic: bodyShema.parse(req.body).isPublic,
        coverUrl: bodyShema.parse(req.body).coverUrl,
      },
    })
    return memory
  })
}
