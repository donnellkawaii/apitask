const req = require('express/lib/request');
const pool = require('../../db');
const queries = require('./queries');
const { query } = require('express');

// const queries = require('../../icons/update.png');

const getStores = (req, res) =>{
  pool.query(queries.getStores, (error, results) => {
    if(error) throw error;
    res.status(200).json(results.rows);
  })
};

const getStoreById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getStoreById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  })
};

const addStore = (req, res) => {
  const { name, location, email, date, password, type } = req.body;
  
  // Check if email exists
  pool.query(queries.checkEmailExists, [email], (error, results) => {
    if (error) {
      throw error;
    }

    if (results.rows.length) {
      res.status(400).json({ error: "Email already exists" });
    } else {
      // Add store
      pool.query(queries.addStore, [name, location, email, date, password, type], (error, results) => {
        if (error) {
          throw error;
        }
        res.status(201).json({ success: "Store Succesfully added" });
      });
    }
  });
};

const removeStore = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getStoreById, [id], (error, results) => {
    const noStoreFound = !results.rows.length;

    if (noStoreFound){
      res.send("No Store Found!");
    }

     pool.query(queries.removeStore, [id], (error, results) => {
      if (error) throw error;
      // res.status(200).send("Store remove Successfully");
      res.status(200).json({ success: "Store remove Successfully" });
     });

  });
};

const updateStore = (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  

  pool.query(queries.getStoreById, [id], (error, results) =>{
    const noStoreFound = !results.rows.length;
    if(noStoreFound){
      res.send("Store not found!");
    }

     pool.query(queries.updateStore, [name, id], (error, results) => {
      if (error) throw error;
      // res.status(200).send("Store update Successfully");
      res.status(200).json({ success: "Store update Successfully" });
     })

  })
};

const getEmail = (req, res) => {
  const email = (req.params.email);
  pool.query(queries.getEmail, [email], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  })
};



module.exports = {
  getStores,
  getStoreById,
  addStore,
  removeStore,
  updateStore,
  getEmail,
};