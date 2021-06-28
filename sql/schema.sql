CREATE TABLE users (
    id serial PRIMARY KEY,
    user_name text NOT NULL,
    user_password text NOT NULL,
    user_email text NOT NULL
);

CREATE TABLE shows (
    id serial PRIMARY KEY,
    show_name text NOT NULL,
    average_rating float NOT NULL,
    show_description text NOT NULL,
    image_url text,
    slug text NOT NULL

);

CREATE TABLE reviews (
    id serial PRIMARY KEY,
    show_name integer REFERENCES shows(id),
    user_name integer REFERENCES users(id),
    review text NOT NULL,
    rating integer NOT NULL
);