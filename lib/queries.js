export const hasPostedTodayQuery = `
  *[_type == "user" && name == $name][0] {
      following,
      'userPost': *[_type == "post" && user._ref == $name && dateTime(createdAt) > dateTime($todayStart)][0] {
        _id,
        caption,
        'username': user->name,
        'userImage': user->image,
        createdAt,
        albumImage,
        albumName,
        albumUrl,
        songID,
        artists,
        previewUrl,
        songName,
        songUrl,
        following,
        followers,
        'likes': likes[] {
          ...*[_type == "user" && _id == ^.user._ref][0] {
            'username': name,
            'userImage': image
          },
          createdAt
        } | order(dateTime(createdAt) desc),
        'comments': comments[] {
          text,
          ...*[_type == "user" && _id == ^.user._ref][0] {
            'username': name,
            'userImage': image
          },
          createdAt,
        } | order(dateTime(createdAt) desc)
      }
  }
`;

export const hasPostedYesterdayQuery = `
  *[_type == "user" && name == $name][0] {
    postStreak,
    "hasPostedYesterday": defined(*[_type == "post" && references(^._id) 
                            && dateTime(createdAt) > dateTime($yesterdayStart) 
                            && dateTime(createdAt) < dateTime($todayStart)][0]),
  }
`;

export const todayPostsQuery = `
  *[_type == "post" && user._ref != $name && dateTime(createdAt) > dateTime($todayStart)] {
    _id,
    caption,
    songName,
    songUrl,
    previewUrl,
    artists,
    albumName,
    albumUrl,
    albumImage,
    songID,
    createdAt,
    'username': user._ref,
    'userImage': *[_type == "user" && _id == ^.user._ref][0].image,
    'likes': likes[] {
      ...*[_type == "user" && _id == ^.user._ref][0] {
        'username': name,
        'userImage': image
      },
      createdAt
    } | order(dateTime(createdAt) desc),
    'comments': comments[] {
      text,
      ...*[_type == "user" && _id == ^.user._ref][0] {
        'username': name,
        'userImage': image
      },
      createdAt,
    } | order(dateTime(createdAt) desc)
  } | order(createdAt desc)
`;

export const userIDsQuery = `
  *[_type == "user"] {
    _id
  }._id
`;
