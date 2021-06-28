INSERT INTO users
    (user_name, user_password, user_email)
VALUES 
    ('sarah', 'pa$$word', 'sarah@fakeEmail.com');

INSERT INTO shows
    (show_name, average_rating, show_description, image_url, slug)
VALUES
    ('Courage the Cowardly Dog', 4.9, 'The offbeat adventures of Courage, a cowardly dog who must overcome his own fears to heroically defend his unknowing farmer owners from all kinds of dangers, paranormal events and menaces that appear around their land.', '../imgs/courage.jpeg', 'courage_the_cowardly_dog');

INSERT INTO reviews 
    (show_name, user_name, review, rating)
VALUES 
    ('Perfect combo of spooky and funny. A classic.', 5),
    (4, 2, 'A show that is a bit too relatable. Team Marget and Mordecai for life.', 5),
    (3, 2, 'One of the best animated shows out there! Great for any ages. 10/10.', 5);


INSERT INTO shows
    (show_name, average_rating, show_description, image_url, slug)
VALUES 
    ('Adventure Time', 5.0, 'Adventure Time is about a boy named Finn and his magical shape-shifting dog named Jake, who encounter many strange adventures in the Land of Ooo.', '../imgs/adventure_time.jpeg', 'adventure_time'),
    ('Regular Show', 4.5 'Regular Show  revolves around the lives of two working-class friends, a blue jay named Mordecai and a raccoon named Rigby—both employed as groundskeepers at a local park. They usually try to solve a simple problem that leads to a surreal, extreme, and often supernatural misadventure.', '../imgs/regular_show.jpeg', 'regular_show');