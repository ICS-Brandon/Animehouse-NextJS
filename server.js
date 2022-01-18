const https = require('https');
const http = require('http');
var cookieParser = require('cookie-parser');
const forceSsl = require('express-force-ssl');
const express = require('express');
const path = require('path');
const fs = require('path');
const fileRead = require('fs');
const {Client} = require("pg");
const app = express();
const postsPerPage = 4;

const database = new Client({
  "user" : "postgres",
  "password" : "Wade150318!",
  "host" : "142.11.248.111",
  "port" : 5432,
  "database" : "website"
});

start();

app.use(require("body-parser").json());
app.use(forceSsl);
app.use(cookieParser());

app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Query to select all items for the homepage
app.post("/reqQueryAll", async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://animehouse.ca');
  let request = req.body;
  if(request.type == "SELECTALL"){
    var toSend = await getHomePage(request.max);
    res.setHeader("Content-Type","application/json")
    res.send(JSON.stringify(toSend));
  }
})

//Query to select items for each consecutive page
app.post("/reqQueryRange", async(req,res) =>{
  res.setHeader('Access-Control-Allow-Origin', 'http://animehouse.ca');
  let request = req.body;
  if(request.type = "GETRANGE"){
    var toSend = await getPageRange(request.page,request.max);
    res.setHeader("Content-Type","application/json")
    res.send(JSON.stringify(toSend));
  }
})

//Query to select all items to display on mobile
app.post("/reqQueryAllMobile",async(req,res) =>{
  res.setHeader('Access-Control-Allow-Origin', 'http://animehouse.ca');
  let request = req.body;
  if(request.type = "SELECTALL"){
    let count = await getPostCount();
    var toSend = await getInitialPosts(count[0].count);
    res.setHeader("Content-Type","application/json");
    res.send(JSON.stringify(toSend));
  }
})

//Query to select all featured posts for a given page
app.post("/reqQueryFeatured",async(req,res) =>{
  res.setHeader('Access-Control-Allow-Origin', 'http://animehouse.ca');
  let request = req.body;
  if(request.type = "SELECTFEAT"){
    var toSend = await getFeaturedPosts(request.location);
    res.setHeader("Content-Type","application/json");
    res.send(JSON.stringify(toSend));
  }
})

//Query to select all favorites series
app.post("/reqQueryFavourite",async(req,res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://animehouse.ca');
  let request = req.body;
  if(request.type = "SELECTFAV"){
    var toSend = await getFavoriteSeries();
    res.setHeader("Content-Type","application/json");
    res.send(JSON.stringify(toSend));
  }
})

//Query to get all results for search
app.post("/reqQuerySearch", async(req,res) => {
  res.setHeader('Access-Control-Allow-Origin','http://animehouse.ca');
  let request = req.body;
  if(request.type = "GETSEARCH"){
    var toSend = await getSearchResults(request.delim);
    res.setHeader("Content-Type","application/json");
    res.send(JSON.stringify(toSend));
  }
})

//Query to get all weekly posts
app.post("/reqQueryShow",async(req,res) =>{
  res.setHeader('Access-Control-Allow-Origin','http://animehouse.ca');
  let request = req.body;
  if(request.type = "SELECTALL"){
    var toSend = await getPosts(request.filter);
    res.setHeader("Content-Type","application/json");
    res.send(JSON.stringify(toSend));
  }
})

app.post("/reqQueryPCount",async(req,res) => {
  res.setHeader('Access-Control-Allow-Origin','http://animehouse.ca');
  let request = req.body;
  if(request.type = "POSTCOUNT"){
    let toSend = await getPostCount();
    res.setHeader("Content-Type","application/json");
    res.send(JSON.stringify(toSend));
  }
})

app.post("/reqQueryUpdates",async(req,res) =>{
  res.setHeader('Access-Control-Allow-Origin','http://animehouse.ca');
  let request = req.body;
  if(request.type = "SELECTUPDATES"){
    let toSend = await getUpdatePosts();
    res.setHeader("Content-Type","application/json");
    res.send(JSON.stringify(toSend));
  }
})

app.post("/reqQueryNextRange",async(req,res)=>{
  res.setHeader('Access-Control-Allow-Origin','http://animehouse.ca');
  let request = req.body;
  if(request.type = "SELECTNEXT"){
    let toSend = await getUpdatePostsRange(request.offset);
    res.setHeader("Content-Type","application/json");
    res.send(JSON.stringify(toSend));
  }
})

app.post("/reqCheckUser",async(req,res)=>{
  res.setHeader('Access-Control-Allow-Origin','http://animehouse.ca');
  let request = req.body;
  if(request.type = "GETUSER"){
    let toSend = await getUserLikes(request.hash);
    res.setHeader("Content-Type","application/json");
    res.send(JSON.stringify(toSend));
  }
})

app.post("/reqAddUser",async(req,res)=>{
  res.setHeader('Access-Control-Allow-Origin','http://animehouse.ca');
  let request = req.body;
  if(request.type = "ADDUSER"){
    let toSend = await addUser(request.hash);
    res.setHeader("Content-Type","application/json");
    res.send(JSON.stringify(toSend));
  }
})

app.post("/reqUpdateUser", async(req,res)=>{
  res.setHeader('Access-Control-Allow-Origin','http://animehouse.ca');
  let request = req.body;
  if(request.type = "UPDATEUSER"){
    let toSend = await updateUser(request.hash, request.likes);
    res.setHeader("Content-Type","application/json");
    res.send(JSON.stringify(toSend));
  }
})

app.post("/reqUpdateCount", async(req,res)=>{
  res.setHeader('Access-Control-Allow-Origin','http://animehouse.ca');
  let request = req.body;
  if(request.type = "UPDATECOUNT"){
    let toSend = await updateLikeCount(request.pid,request.count);
    res.setHeader("Content-Type","application/json");
    res.send(JSON.stringify(toSend));
  }
})


app.use(express.json());
app.use(express.static("express"));
// default URL for website
app.use('/', function(req,res){
    res.sendFile(path.join(__dirname+'/express/index.html'));
    //__dirname : It will resolve to your project folder.
  });

//const httpsServer = https.createServer(options,app);

var options = {
  key: fileRead.readFileSync('private.key', 'utf8'),
  cert: fileRead.readFileSync('certificate.crt', 'utf8'),
  ca: fileRead.readFileSync('ca_bundle.crt','utf8')
};

https.createServer(options, app).listen(443);
const httpServer = http.createServer(app);
httpServer.listen(80);
console.debug("Currently listening on port 80 for http connections and port 443 for https connections");

async function getPageRange(pageNum){
  try{
    let num = pageNum*4;
    var query = "SELECT post_id, genre, link, mobilelink, post_title, post_date, img_path, pid, post_blurb, post_paragraph, post_type, like_count, post_auth FROM anime_post UNION ALL SELECT post_id, genre, link, mobilelink, post_title, post_date, img_path, pid, post_blurb, post_paragraph, post_type, like_count, post_auth FROM manga_post UNION ALL SELECT post_id, genre, link, mobilelink, post_title, post_date, img_path, pid, post_blurb, post_paragraph, post_type, like_count, post_auth FROM light_novel_post ORDER BY post_id DESC LIMIT 4 OFFSET ("+num+")";
    const results = await database.query(query);
    return results.rows;
  } catch(e){
    return false;
  }
}

async function getHomePage(max){
  try{
    const results = await database.query("SELECT post_id, genre, link, post_title, post_date, img_path, pid, post_blurb, post_paragraph, post_type, like_count, post_auth FROM anime_post UNION ALL SELECT post_id, genre, link, post_title, post_date, img_path, pid, post_blurb, post_paragraph, post_type, like_count, post_auth FROM manga_post UNION ALL SELECT post_id, genre, link, post_title, post_date, img_path, pid, post_blurb, post_paragraph, post_type, like_count, post_auth FROM light_novel_post ORDER BY post_id DESC LIMIT 4 OFFSET (0)");
    return results.rows;
  } catch(e){
    console.debug(e);
    return false;
  }
}

async function getInitialPosts(count){
  try{
    let top = count + 1;
    let bottom = count - 10;
    const results = await database.query("SELECT post_id, genre, link, mobilelink, post_title, post_date, img_path, pid, post_blurb, post_paragraph, post_type, like_count, post_auth FROM anime_post UNION ALL SELECT post_id, genre, link, mobilelink, post_title, post_date, img_path, pid, post_blurb, post_paragraph, post_type, like_count, post_auth FROM manga_post UNION ALL SELECT post_id, genre, link, mobilelink, post_title, post_date, img_path, pid, post_blurb, post_paragraph, post_type, like_count, post_auth FROM light_novel_post ORDER BY post_id DESC LIMIT 10 OFFSET (0)");
    return results.rows;
  } catch(e){
    console.debug(e);
  }
}

async function getFeaturedPosts(location){
  try{
    const results = await database.query("SELECT post_title,post_date,post_path,post_link,post_auth FROM featuredpost WHERE post_location like LOWER('%"+location+"%') ORDER BY post_id DESC");
    return results.rows;
  } catch(e){
    console.debug(e);
  }
}

async function getFavoriteSeries(){
  try{
    const results = await database.query("SELECT * FROM currentfavourites");
    return results.rows;
  } catch(e){
    return false;
  }
}

async function getSearchResults(delim){
  try{
    const results = await database.query("SELECT post_id,genre,link,mobilelink,post_title,post_date,img_path,pid FROM anime_post WHERE LOWER(post_title) LIKE LOWER('%"+delim+"%') OR LOWER(anime_title) LIKE LOWER('%"+delim+"%') UNION ALL SELECT post_id,genre,link,mobilelink,post_title,post_date,img_path,pid FROM manga_post WHERE LOWER(post_title) LIKE LOWER('%"+delim+"%') OR LOWER(manga_title) LIKE LOWER('%"+delim+"%') UNION ALL SELECT post_id,genre,link,mobilelink,post_title,post_date,img_path,pid FROM light_novel_post WHERE LOWER(post_title) LIKE LOWER('%"+delim+"%') OR LOWER(novel_title) LIKE LOWER('%"+delim+"%') ORDER BY post_id DESC");
    return results.rows;
  } catch(e){
    return false;
  }
}

async function getPosts(type){

  let table = type.toLowerCase()+"_post";
  try{
    const results = await database.query("SELECT * FROM "+table+" ORDER BY post_id DESC");
    return results.rows;
  } catch(e){
    return false;
  }
}

async function getPostCount(){
  try{
    //
    const results = await database.query("SELECT COUNT(pid) FROM anime_post UNION ALL SELECT COUNT(pid) FROM manga_post UNION ALL SELECT COUNT(pid) FROM light_novel_post");
    return results.rows;
  } catch(e){
    return false;
  }
}

async function getUpdatePosts(){
  try{
    const results = await database.query("SELECT * FROM updates WHERE uid < 6");
    return results.rows;
  } catch(e){
    return false;
  }
}

async function getUpdatePostsRange(offset){
  try{
    const results = await database.query("SELECT post_id, genre, link, mobilelink, post_title, post_date, img_path, pid, post_blurb, post_paragraph, post_type, like_count, post_auth FROM anime_post UNION ALL SELECT post_id, genre, link, mobilelink, post_title, post_date, img_path, pid, post_blurb, post_paragraph, post_type, like_count, post_auth FROM manga_post UNION ALL SELECT post_id, genre, link, mobilelink, post_title, post_date, img_path, pid, post_blurb, post_paragraph, post_type, like_count, post_auth FROM light_novel_post ORDER BY post_id DESC LIMIT 10 OFFSET ("+offset+")");
    return results.rows;
  } catch(e){
    return false;
  }
}

async function getUserLikes(hash){
  try{
    const results = await database.query("SELECT likes FROM userlikes WHERE uid = '" + hash + "'");
    return results.rows;
  } catch(e){
    return false;
  }
}

async function addUser(hash){
  try{
    await database.query("INSERT INTO userlikes(likes,uid) VALUES('0000000000000000000000000000000','"+hash+"')");
    return true;
  }catch(e){
    return false;
  }
}

async function updateUser(hash,likes){
  try{
    await database.query("UPDATE userlikes SET likes = '"+likes+"' where uid = '"+hash+"'");
    return true;
  } catch(e){
    return false;
  }
}

async function updateLikeCount(pid, num){
  try{
    let result = await database.query("SELECT like_count FROM anime_post WHERE pid = "+pid);
    let count = parseInt(result.rows[0].like_count);
    if(num > 0){
      count++;
      result = await database.query("UPDATE anime_post SET like_count = "+count+" WHERE pid = "+pid);
    } else{
      count --;
      result = await database.query("UPDATE anime_post SET like_count = "+count+" WHERE pid = "+pid);
    }
    return result.rows;
  }catch(e){
    return false;
  }
}

async function start(){
  try{
    await database.connect();
  }catch(e){
    console.debug("Couldn't Connect");
    console.debug(e);
  }
}
