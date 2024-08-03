const pool = require("../models/db");


const getavgReviewsForRestaurant = async (req, res) => {
  const restaurant_id = req.params.id;
  
  try {
    // Get reviews along with average rating
    const reviewsQuery = `SELECT *, (SELECT AVG(rating) FROM reviews WHERE restaurant_id = $1) as average_rating FROM reviews WHERE restaurant_id = $1`;
    const result = await pool.query(reviewsQuery, [restaurant_id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "No reviews found for this restaurant" });
    }

    return res.status(200).json({ success: true, data: result.rows, average_rating: result.rows[0].average_rating });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error", err });
  }
};


const getReviewsForRestaurant = async (req, res) => {

  //AVG group by restaurant_id
    const restaurant_id = req.params.id;
    const query = `SELECT * FROM reviews WHERE restaurant_id=$1`;
    pool
      .query(query,[restaurant_id])
      .then((result)=>{
         res.status(200).json({
           success:true,data:result.rows
         })
       })
       .catch((err)=>{
         res.status(500).json({
           success:false,message:"Server error",err,err
         })
       })
  }
  
  const getReviewById=async(req,res)=>{
     const id=req.params.id;
     const query=`SELECT * FROM reviews WHERE id =$1`
     pool.query(query,[id]).then((result)=>{
       if(result.rows.length===0){
         return res.status(404).json({success:false,message:"Review not found"})
       }
       return res.status(200).json({success:true,data:result.rows[0]})
     }).catch((err)=>{
       return res.status(500).json({success:false,message:"Server error",err})
     })
  }
  
  const createReview = async (req, res) => {

    // from 1 star to 5 stars
    // we can use two params
    const { rating, comment, user_id } = req.body;
    const restaurant_id = req.params.id;
  
    try {
      const query = `
        INSERT INTO reviews (rating, comment, user_id, restaurant_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `;
      const values = [rating, comment, user_id, restaurant_id];
      const result = await pool.query(query, values);
      await updateRestaurantAverageRating();

      return res.status(201).json({ success: true, message: "Review created successfully" });
    } catch (err) {
      return res.status(500).json({ success: false, message: "Server error", err });
    }
  };
  
  const updateRestaurantAverageRating = async () => {
    try {
      const query = `
        UPDATE restaurants
        SET average_rating = (
       SELECT AVG(reviews.rating) FROM reviews WHERE reviews.restaurant_id = restaurants.id

        )
        WHERE id IN (
          SELECT restaurant_id FROM reviews
        )
      `;
      await pool.query(query);
    } catch (err) {
      console.error(err);
    }
  };

  module.exports={getReviewsForRestaurant,getavgReviewsForRestaurant,getReviewById,createReview,updateRestaurantAverageRating}