import { Hono } from 'hono'
import { prisma } from '../db'

export const app = new Hono()

app.get('/', async (c) => {
  const tags = await prisma.tag.findMany({
    include: {
      Notes: true,
    },
  })
  return c.json(tags)
})

app.get('/:id', async (c) => {
  const { id } = c.req.param()

  const tag = await prisma.tag.findUnique({
    where: { id },
    include: {
      Notes: true,
    },
  })
  if (!tag) return c.json({ error: 'Tag not found' }, 404)

  return c.json(tag)
})

app.post('/', async (c) => {
  const { title } = await c.req.json()

  if (!title) return c.json({ error: 'Please provide a title.' }, 400)

  const newTag = await prisma.tag.create({
    data: {
      title,
    },
  })

  return c.json(newTag)
})

app.put('/:id', async (c) => {
  const { id } = c.req.param()
  const { title } = await c.req.json()

  const tag = await prisma.tag.findUnique({ where: { id } })
  if (!tag) return c.json({ error: 'Tag not found' }, 404)

  const updateTag = await prisma.tag.update({
    where: {
      id,
    },
    data: {
      title,
    },
    include: {
      Notes: true,
    },
  })

  return c.json(updateTag)
})

app.delete('/:id', async (c) => {
  const { id } = c.req.param()

  const note = await prisma.tag.findUnique({ where: { id } })
  if (!note) return c.json({ error: 'Tag not found' }, 404)

  await prisma.tag.delete({
    where: {
      id,
    },
  })

  return c.json({}, 204)
})
