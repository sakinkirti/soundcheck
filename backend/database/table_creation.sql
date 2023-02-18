CREATE TABLE app_user (
	user_id serial PRIMARY KEY,
	username varchar(30) UNIQUE,
	f_name varchar(30),
	l_name varchar(30),
	email varchar(30),
	created_date timestamptz,
	pf_pic varchar(150)
);

create table follower (
	user_id serial REFERENCES app_user (user_id),
	follower_id serial REFERENCES app_user (user_id)
);

create table post (
	post_id serial PRIMARY KEY,
	user_id serial REFERENCES app_user (user_id),
	song_name varchar(50),
	artist_name varchar(50),
	album_name varchar(50),
	music_link varchar(500),
	created_date timestamptz,
	album_img_url varchar(150),
	track_id varchar(30)
);

create table post_like (
	post_id serial REFERENCES post (post_id),
	follower_id serial REFERENCES app_user (user_id),
	liked_date timestamptz
);

create table post_comment (
	post_id serial REFERENCES post (post_id),
	comment_id serial PRIMARY KEY,
	follower_id serial REFERENCES app_user (user_id),
	comment_date timestamptz,
	comment_text varchar(150)
);