import { serve } from '@hono/node-server'
import { Hono } from 'hono'

import { app as router } from './routes'

const app = new Hono()

app.route('/v0/api/', router)

const port = +(process.env.PORT || 3000)
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port,
})
