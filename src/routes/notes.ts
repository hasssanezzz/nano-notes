import { Hono } from 'hono'
import { prisma } from '../db'

export const app = new Hono()

app.get('/', async (c) => {
  const notes = await prisma.note.findMany({
    include: {
      Tags: true,
    },
  })
  return c.json(notes)
})

app.get('/:id', async (c) => {
  const { id } = c.req.param()

  const note = await prisma.note.findUnique({
    where: { id },
    include: {
      Tags: true,
    },
  })
  if (!note) return c.json({ error: 'Note not found' }, 404)

  return c.json(note)
})

app.post('/', async (c) => {
  const { title, content, color } = await c.req.json()

  if (!title || !content)
    return c.json({ error: 'Please provide title and content.' }, 400)

  const newNote = await prisma.note.create({
    data: {
      title,
      content,
      color: color || 'white',
    },
  })

  return c.json(newNote)
})

app.put('/:id', async (c) => {
  const { id } = c.req.param()
  const { title, content, color } = await c.req.json()

  const note = await prisma.note.findUnique({ where: { id } })
  if (!note) return c.json({ error: 'Note not found' }, 404)

  const updatedNote = await prisma.note.update({
    where: {
      id,
    },
    data: {
      title: title || note.title,
      content: content || note.content,
      color: color || note.color,
      lastModifiedAt: new Date()
    },
    include: {
      Tags: true,
    },
  })

  return c.json(updatedNote)
})

app.delete('/:id', async (c) => {
  const { id } = c.req.param()

  const note = await prisma.note.findUnique({ where: { id } })
  if (!note) return c.json({ error: 'Note not found' }, 404)

  await prisma.note.delete({
    where: {
      id,
    },
  })

  return c.json({}, 204)
})
