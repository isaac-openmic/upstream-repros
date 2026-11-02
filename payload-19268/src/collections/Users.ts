import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: { useAsTitle: 'email' },
  auth: true,
  fields: [
    { name: 'team', type: 'relationship', relationTo: 'teams' },
    {
      // A column whose server Cell is async, like any Cell that loads data
      name: 'slow',
      type: 'ui',
      admin: { components: { Cell: '/components/SlowCell#SlowCell' } },
    },
  ],
}
