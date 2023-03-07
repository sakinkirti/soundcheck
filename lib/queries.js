export const hasPostedTodayQuery = `
  *[_type == "user" && name == $name][0] {
      postStreak,
      'userPost': *[_type == "post" && references(^._id) && dateTime(createdAt) > dateTime($todayStart)][0] {
        _id,
        'username': user->name,
        'userImage': user->image,
        createdAt,
        albumImage,
        albumName,
        albumUrl,
        artists,
        playedAt,
        previewUrl,
        songName,
        songUrl,
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

export const todayPosts = `
  *[_type == "post" && user._ref != $name && dateTime(createdAt) > dateTime($todayStart)][0] {
    ...
  }
`;

export const userIDsQuery = `
  *[_type == "user"] {
    _id
  }._id
`;
