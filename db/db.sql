 //This file is used for cmd sql


  CREATE TABLE users (
     id BIGSERIAL NOT NULL PRIMARY KEY,
     name VARCHAR(50) NOT NULL,
     email VARCHAR(50) NOT NULL,
     password TEXT NOT NULL,
     role VARCHAR(50) NOT NULL,
     );

 CREATE TABLE restaurants (
     id BIGSERIAL NOT NULL PRIMARY KEY,
     name VARCHAR(50) NOT NULL,
     location VARCHAR(50) NOT NULL,
     price_range INT NOT NULL check(price_range >= 1 and price_range <=5)

     );

INSERT INTO restaurants (name,location,price_range) values ('mcdonald','Pathumtanee',3);


 CREATE TABLE reviews (
     id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
     name VARCHAR(50) NOT NULL,
     review TEXT NOT NULL,
     rating INT NOT NULL check(rating >= 1 and rating <=5)

     );
INSERT INTO reviews (restaurant_id,name,review,rating) values (1,'Dan','good price',5);

join
select * from restaurants inner join reviews on restaurants.id = restaurant_id;



ON DELETE CASCADE // will remove child table when parent record remove

ALTER TABLE reviews ADD CONSTRAINT reviews_restaurant_id_fkey FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE;