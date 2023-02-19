INSERT INTO app_user (username, f_name, l_name, email, created_date) VALUES 
    ('sakinkirti', 'Sakin', 'Kirti', 'sak207@case.edu', current_timestamp),
    ('briansong', 'Brian', 'Song', 'bms166@case.edu', current_timestamp),
    ('jacksonkallen', 'Jackson', 'Kallen', 'jxk1119@case.edu', current_timestamp),
    ('hyunjoonkweon', 'Hyunjoon', 'Kweon', 'hxk598@case.edu', current_timestamp),
    ('joshualevy', 'Joshua', 'Levy', 'jml312@case.edu', current_timestamp),
    ('sankalpdoshi', 'Sankalp', 'Doshi', 'sxd633@case.edu', current_timestamp);

INSERT INTO follower (user_id, follower_id) VALUES
    (1, 2),
    (2, 1),
    (2, 3),
    (3, 4),
    (4, 5),
    (5, 6),
    (6, 3),
    (6, 1),
    (4, 2),
    (3, 6);

INSERT INTO post (user_id, song_name, artist_name, album_name, created_date, track_id) VALUES
    (1, 'Superhero', 'Metro Boomin', 'HEROES & VILLAINS', current_timestamp, 2),
    (3, 'Good Luck', 'Abhi The Nomad', 'Abhi vs The Universe', current_timestamp, 2),
    (6, 'Same As', 'Marc E. Bassy', 'PMD (Deluxe)', current_timestamp, 2);

INSERT INTO post_like (post_id, follower_id, liked_date) VALUES
    (1, 2, current_timestamp),
    (2, 4, current_timestamp),
    (3, 1, current_timestamp),
    (3, 3, current_timestamp);

INSERT INTO  post_comment (post_id, follower_id, comment_date, comment_text) VALUES
    (1, 2, current_timestamp, 'I hate this song!'),
    (2, 4, current_timestamp, 'This is best song Ive ever heard!'),
    (3, 3, current_timestamp, 'Who is this artist??');