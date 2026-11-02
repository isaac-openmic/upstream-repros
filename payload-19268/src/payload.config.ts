import { sqliteAdapter } from '@payloadcms/db-sqlite'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Teams } from './collections/Teams'
import { migrations } from './migrations'
import { Users } from './collections/Users'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
  },
  collections: [Users, Teams],
  secret: process.env.PAYLOAD_SECRET || 'repro-secret',
  db: sqliteAdapter({
    client: { url: process.env.DATABASE_URL || 'file:./repro.db' },
    prodMigrations: migrations,
  }),
  // Seeds one admin and a team of five members on first start
  onInit: async (payload) => {
    const { totalDocs } = await payload.count({ collection: 'teams', overrideAccess: true })
    if (totalDocs > 0) return
    const team = await payload.create({
      collection: 'teams',
      data: { name: 'Team' },
      overrideAccess: true,
    })
    await payload.create({
      collection: 'users',
      overrideAccess: true,
      data: { email: 'dev@example.com', password: 'test', team: team.id },
    })
    for (let i = 1; i <= 4; i++) {
      await payload.create({
        collection: 'users',
        overrideAccess: true,
        data: { email: `member${i}@example.com`, password: 'test', team: team.id },
      })
    }
  },
})
