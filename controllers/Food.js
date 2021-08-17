// CREATE A NEW EXPRESS ROUTE
const router = require("express").Router();

const { Router } = require("express");

const Food = require("../models/Food");

const foodSeed = [
 {
     name: "West Lake Fish in Sweet Sour Source",
     img:"https://findyourtaste.files.wordpress.com/2011/05/westlakefish.jpg",
     taste:"sweet and sour",
 },   
 {
    name: "Stir Fried Prawns with Longjing Tea",
    img:"https://d27pcll2dx97vv.cloudfront.net/info/wp-content/uploads/2015/12/Stir-Fried-Prawns-with-Longjing-1pc.jpg",
    taste:"salty and savory",
}, 
{
    name: "Dongpo Pork",
    img:"https://delishar.com/wp-content/uploads/2016/02/Dong-Po-Rou.jpg",
    taste:"salty and sweet",
}, 
{
    name: "Pian Er Chuan Noodles",
    img:"https://www.tripchinaguide.com/public/upload/photo/top-10-chinese-noodles/img_21_d20130812152337.jpg",
    taste:"salty",
}, 
{
    name: "Cat Ear Noodles",
    img:"https://pbs.twimg.com/media/DPw1dNiU8AAF8_k.jpg",
    taste:"salty",
}, 
{
    name: "Shallot Stuffed Pancake",
    img:"http://4.bp.blogspot.com/-vcXKP98ERT0/U-cVmyNCfOI/AAAAAAAAABU/3D6FUdpqvSs/s1600/6tjzj.jpg",
    taste:"sweet and salty",
}, 
{
    name: "Steamed Lotus Root Stuffed with Sweet Sticky Rice",
    img:"http://discover.china.org.cn/wp-content/uploads/2016/08/%E8%91%B1%E5%8C%85%E6%A1%A7.jpg",
    taste:"sweet and salty",
}, 
{
    name: "Beggar's chicken",
    img:"https://www.topchinatravel.com/pic/city/hangzhou/eating/hangzhou-jiaohuaji.jpg",
    taste:"salty",
},
{
    name: "Stewed Fish Head with Tofu",
    img:"https://www.topchinatravel.com/pic/city/hangzhou/eating/top-10-best-traditional-hangzhou-food-08.jpg",
    taste:"salty",
},
];
// ROUTES (async, since database actions are asynchronous)
// Index Route
router.get("/", async (Req, res) => {
    try {
      // query database for all the places
      const foods = await Food.find({});
      // send places as JSON
      res.json(foods);
    } catch (error) {
      // return error as JSON with an error status
      res.status(400).json(error);
    }
  });
// CREATE Route
router.post("/", async (req, res) => {
    try {
      // pass the request body to create a new place in the database
      const newFood = await Food.create(req.body);
      // send newly created place back as JSON
      res.json(newFood);
    } catch (error) {
      // return error as JSON with an error status
      res.status(400).json(error);
    }
  });
// update Route
router.put("/:id", async (req, res) => {
    try {
      // pass the request body to update and existing place in the database
      const updatedFood = await Food.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      // send newly updated place back as JSON
      res.json(updatedFood);
    } catch (error) {
      // return error as JSON with an error status
      res.status(400).json(error);
    }
  });
  // destroy Route
router.delete("/:id", async (req, res) => {
    try {
      // delete existing place in the database
      const deletedFood = await Food.findByIdAndRemove(req.params.id);
      // send delete place back as JSON
      res.json(deletedFood);
    } catch (error) {
      // return error as JSON with an error status
      res.status(400).json(error);
    }
  });


// Seed Route for Seeding Database
router.get("/seed", async (req, res) => {
    // try block for catching errors
    try {
      // remove all places from database
      await Food.remove({});
      // add the seed data to the database
      await Food.create(foodSeed);
      // get full list of places to confirm seeding worked
      const foods = await Food.find({});
      // return full list of places as JSON
      res.json(foods);
    } catch (error) {
      // return error as JSON with an error status
      res.status(400).json(error);
    }
  });
  
module.exports = router;