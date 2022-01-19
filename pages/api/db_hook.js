/*
  Currently the hub for all database queries/requests

  Rough code for testing functionality
*/

//Database link/container
const pgp = require('pg-promise')({
  noWarnings:true
})

//Database handler/object
const db = pgp(`postgres://postgres:Wade150318!@142.11.248.111:15432/website`)

//Current default function that selects the first item in the database and returns with a successful response
export default async(req, res) => {
  try{
    const result = await db.one('SELECT pid FROM anime_post WHERE pid = 1');
    res.status(200).json(result);
  }catch(e){
    console.log(e);
  }
}
