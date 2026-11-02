import type { CollectionConfig } from 'payload'

export const Teams: CollectionConfig = {
  slug: 'teams',
  admin: { useAsTitle: 'name' },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'members',
      type: 'join',
      collection: 'users',
      on: 'team',
      admin: { defaultColumns: ['email', 'slow'] },
    },
  ],
}
