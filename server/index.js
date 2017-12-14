import express from 'express'
import next from 'next'

import fetch from 'isomorphic-unfetch'

import { getCharactersAPI, getAuthString } from '../api'

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()
  const router = express.Router()

  router.get('/characters', getCharacters)

  server.use('/api', router)

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log('port', port)
  })
}).catch(ex => {
  console.error(ex.stack)
  process.exit(1)
})

async function getCharacters(req, res) {
  const api = await fetch(getCharactersAPI())
  const { data } = await api.json()
  const { results } = data
  res.json(results)
}
