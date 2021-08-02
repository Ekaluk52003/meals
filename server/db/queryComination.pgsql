
DROP table meals;

CREATE TABLE meals (
	id serial PRIMARY KEY,
	meal_name VARCHAR NOT NULL,
	oz INT NOT NULL CHECK (oz >= 0),
    eat_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT NOW());

INSERT INTO meals (meal_name,oz,eat_at)
VALUES
('Strawbery',13,'2021-06-23 09:10'),
('Strawbery',13,'2021-06-23 09:10'),
('Strawbery',13,'2021-06-23 09:10');

DELETE FROM meals
WHERE id = 1;

select created_at at time zone 'PT7H' at time zone '+07'
from meals;

select * from pg_timezone_names;


select to_char(eat_at, 'Dy, DD-Mon-YY HH12:MI am')  as time FROM meals;


SELECT meal_name, (eat_at + interval '1 hour') AS an_hour_later FROM meals;


SELECT meal_name,to_char(eat_at,'HH12:MI am') as eat_At, to_char((eat_at + interval '3 hour'), 'HH12:MI am') as Next_Due  FROM meals;

-- sum of oz group meal_name where eat_at for the pass week  ----
select meal_name, sum(oz)
from meals
where eat_at > now() - interval '1 week'
GROUP BY meal_name
ORDER BY sum(oz) DESC;

-- sum of oz group meal_name where eat_at for the pass week  ----
select meal_name, sum(oz)
from meals
where eat_at > now() - interval '7 day'
GROUP BY meal_name
ORDER BY sum(oz) DESC;

-- sum of oz group meal_name where eat_at for the yesterday not include today ----
select meal_name, sum(oz)
from meals
where eat_at > now() - interval '2 day'AND eat_at::date < current_date
GROUP BY meal_name
ORDER BY sum(oz) DESC;


-- sum of oz group meal_name where eat_at for all time order by OZ DESC  ----
select meal_name, sum(oz)
from meals
GROUP BY meal_name
ORDER BY sum(oz) DESC;

select *
from meals
where eat_at < now();


select meal_name, oz, to_char(eat_at, 'Dy, DD-Mon-YY HH24:MI am')
from meals
where eat_at::date = current_date;


select current_time;


SELECT id, meal_name,
       to_char(eat_at, 'Dy, DD-Mon-YY HH12:MI am') as eat_at,
       CASE
           WHEN eat_at::time > '04:00'
           AND eat_at::time <= '11:00'
           THEN 'Breakfast'
           WHEN eat_at::time > '11:00'
            AND eat_at::time <= '15:00'
            THEN 'Lunch'
             WHEN eat_at::time > '15:00'
              AND eat_at::time <='24:00'
                 THEN 'Dinner'
                 ELSE 'Breakfast'
       END meal_time
FROM  meals
ORDER BY eat_at desc;

