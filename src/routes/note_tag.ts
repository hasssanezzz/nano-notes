import { Hono } from 'hono'
import { prisma } from '../db'

export const app = new Hono()

app.post('/:noteId/:tagId', async (c) => {
  const { noteId, tagId } = c.req.param()

  const note = await prisma.note.findUnique({ where: { id: noteId } })
  const tag = await prisma.tag.findUnique({ where: { id: tagId } })

  if (!note) return c.json({ error: 'Note not found' }, 404)
  if (!tag) return c.json({ error: 'Tag not found' }, 404)

  const connectedTag = await prisma.note.findFirst({
    where: {
      Tags: {
        some: {
          id: tagId,
        },
      },
    },
  })

  if (connectedTag)
    return c.json({ error: 'Note already tagged: ' + tag.title }, 400)

  const updatedNote = await prisma.note.update({
    where: {
      id: noteId,
    },
    data: {
      Tags: {
        connect: {
          id: tagId,
        },
      },
    },
    include: {
      Tags: true
    }
  })

  return c.json(updatedNote, 201)
})

app.delete('/:noteId/:tagId', async (c) => {
  const { noteId, tagId } = c.req.param()

  const note = await prisma.note.findUnique({ where: { id: noteId } })
  const tag = await prisma.tag.findUnique({ where: { id: tagId } })

  if (!note) return c.json({ error: 'Note not found' }, 404)
  if (!tag) return c.json({ error: 'Tag not found' }, 404)

  const connectedTag = await prisma.note.findFirst({
    where: {
      Tags: {
        some: {
          id: tagId,
        },
      },
    },
  })

  if (!connectedTag)
    return c.json({ error: 'Note has no tag: ' + tag.title }, 400)

  await prisma.note.update({
    where: {
      id: noteId,
    },
    data: {
      Tags: {
        disconnect: {
          id: tagId,
        },
      },
    },
  })

  return c.json({}, 204)
})
