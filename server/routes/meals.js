const express = require("express");
const db = require("../db");
const router = express.Router();

router.get("/meals", async (req, res) => {
  const query = `
  select to_char(eat_at::date, 'DD-Mon')as date, sum(oz) as oz
  from meals
  GROUP BY  eat_at::date
  ORDER BY eat_at::date ASC;
  ;
      `;
  try {
    const { rows } = await db.query(query); // sends query
    res.status(200).json({
      max: Math.max.apply(
        Math,
        rows.map(function (o) {
          return o.oz;
        })
      ),
      min: Math.min.apply(
        Math,
        rows.map(function (o) {
          return o.oz;
        })
      ),
      count: rows.length,
      meals: rows,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});

// router.get("/daily", async (req, res) => {
//   const query = `
//   SELECT id, meal_name,oz,
//   to_char(eat_at, 'Dy, DD-Mon-YY HH12:MI am') as eat_at,
//   CASE
//       WHEN eat_at::time > '04:00'
//       AND eat_at::time <= '11:00'
//       THEN 'Breakfast'
//       WHEN eat_at::time > '11:00'
//        AND eat_at::time <= '15:00'
//        THEN 'Lunch'
//         WHEN eat_at::time > '15:00'
//          AND eat_at::time <='24:00'
//             THEN 'Dinner'
//             ELSE 'Breakfast'
//   END meal_time
// FROM  meals
// where eat_at::date = current_date
// ORDER BY eat_at::time DESC;
//       `;
//   try {
//     const { rows } = await db.query(query); // sends query
//     res.status(200).json({
//       count: rows.length,
//       meals: rows,
//     });
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// });

router.get("/filter", async (req, res) => {
  const { startDate, endDate } = req.query;
  const query = `
  SELECT id, meal_name,oz,
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
where eat_at::date BETWEEN $1 AND $2
ORDER BY  eat_at::date DESC, eat_at::time DESC;
      `;
  try {
    const { rows } = await db.query(query, [`${startDate}`, `${endDate}`]); // sends query
    res.status(200).json({
      count: rows.length,
      meals: rows,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get("/summeals", async (req, res) => {
  const query = `
  select meal_name, sum(oz) as value
  from meals
  GROUP BY meal_name
  ORDER BY sum(oz) DESC;
      `;
  try {
    const { rows } = await db.query(query); // sends query
    res.status(200).json({
      max: Math.max.apply(
        Math,
        rows.map(function (o) {
          return o.oz;
        })
      ),
      min: Math.min.apply(
        Math,
        rows.map(function (o) {
          return o.oz;
        })
      ),
      count: rows.length,
      meals: rows,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});

//post route
router.post("/meals", async (req, res) => {
  const query = `INSERT INTO meals (meal_name,oz,eat_at)
  VALUES($1, $2, $3) returning *;`;

  try {
    const results = await db.query(query, [
      req.body.name,
      req.body.oz,
      req.body.eat_at,
    ]);
    console.log(results);
    res.status(201).json({
      status: "succes",
      data: {
        meals: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

router.delete("/meals/:id", async (req, res) => {
  const query = `DELETE FROM meals where id = $1 returning *;`;

  try {
    const meal = await db.query(query, [req.params.id]);

    res.status(200).json({
      status: "succes",
      id: req.params.id,
      data: {
        meal: meal.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
