export default {
  name: 'user',
  title: 'User',
  type: 'document',
  preview: {
    select: {
      title: 'name',
    },
  },
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    },
    {
      name: 'image',
      title: 'Image URL',
      type: 'url',
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: new Date().toISOString(),
    },
    {
      name: 'postStreak',
      title: 'Post Streak',
      type: 'number',
      initialValue: 0,
    },
    // {
    //   name: "recentlyPlayed",
    //   title: "Recently Played",
    //   type: "array",
    //   of: [{ type: "song" }],
    // },
    {
      name: 'posts',
      title: 'Posts',
      type: 'array',
      of: [{type: 'reference', to: {type: 'post'}}],
    },
    {
      name: 'likes',
      title: 'Likes',
      type: 'array',
      of: [{type: 'reference', to: {type: 'post'}}],
    },
    {
      name: 'comments',
      title: 'Comments',
      type: 'array',
      of: [{type: 'reference', to: {type: 'post'}}],
    },
    {
      name: 'following',
      title: 'Following',
      type: 'array',
      of: [{type: 'reference', to: {type: 'user'}}],
    },
    {
      name: 'followers',
      title: 'Followers',
      type: 'array',
      of: [{type: 'reference', to: {type: 'user'}}],
    },
  ],
}
