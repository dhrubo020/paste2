
exports.home = function (req, res) {
       
        var sql = "SELECT * FROM document ORDER BY id DESC";
        
        db.query(sql, function (err, results) {
               console.log('line 7 q fun', results.rows);
            if (err) {
                throw err;
            } else {
                res.render('home2.ejs', { data: results });
                //res.json({data: results});
            }
        });
};


exports.call_send = function(req,res){
    var data = req.body; subject = data.Subject; text = req.body.Text, id = (Math.random() * (900000 - 10000) + 10000).toFixed(0);
    

    if(req.method == "POST"){

        var bdTime = new Date().toLocaleString("en-US", {timeZone: "Asia/Dhaka"});
        var date = new Date(bdTime);
        //console.log('BD time: '+date.toLocaleString())
  
        var sql = "INSERT INTO document (id, subject, text, datetime) VALUES ('" + id + "', '" + subject + "','" + text + "', '" + date.toLocaleString()+ "')";
        
       
               //console.log("Met 30:" + sql);
           
        var query = db.query(sql, function(err, result) {
                //console.log("Met 33:", err, result);
            if(err){
                message = "Something went wrong!!";
                res.render('home2.ejs',{message: message});
            }else{
                //alert("You successfully added new data");
                console.log("send success");
                message = "Succesfully! Your account has been created. Now you can login.";
               //res.redirect('/');
               var data ={
                   "Subject" : subject,
                   "Message" : text,
                   "Date" : date.toLocaleString()
               }
               //console.log("Met 42:" + JSON.stringify({data:data}));
               res.json({data:data});
            }
        });
    }
}
