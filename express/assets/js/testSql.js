async function deleteItem(){
    var queryReq = {}
    queryReq.type = "SELECTALL";
    let result = await fetch('/reqQuery',{
      method:"POST",
      body: JSON.stringify(queryReq),
      headers:{"Content-Type":"application/json"},
    });
    var test = await result.json();
    console.log(test[0]);
}
