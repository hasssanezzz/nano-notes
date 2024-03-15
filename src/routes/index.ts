import { Hono } from 'hono'

import { app as notesRouter } from './notes'
import { app as tagsRouter } from './tags'
import { app as noteTagRouter } from './note_tag'

export const app = new Hono()

app.route('/notes', notesRouter)
app.route('/tags', tagsRouter)
app.route('/note_tags', noteTagRouter)