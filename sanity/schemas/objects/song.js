export default {
  name: 'song',
  title: 'Song',
  type: 'object',
  fields: [
    {
      name: 'songName',
      title: 'Song Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'songUrl',
      title: 'Song URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'previewUrl',
      title: 'Preview URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'artists',
      title: 'Artists',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'albumName',
      title: 'Album Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'albumUrl',
      title: 'Album URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'albumImage',
      title: 'Album Image URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'playedAt',
      title: 'Played At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
  ],
}
