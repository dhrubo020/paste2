
exports.home = function (req, res) {

        //var sql = "SELECT * FROM document ORDER BY ID DESC";
        var sql = "CREATE TABLE IF NOT EXISTS document (
           ID INT PRIMARY KEY      NOT NULL,
           Subject           CHAR(50) NOT NULL,
           Text           CHAR(5000) NOT NULL,
           DateTime           CHAR(50) NOT NULL
        );"
        db.query(sql, function (err, results) {
            if (err) {
                throw err;
            } else {
                res.render('home2.ejs', { data: results });
                //res.json({data: results});
            }
        });
};


exports.call_send = function(req,res){
    var data = req.body; subject = data.Subject; text = req.body.Text;
    console.log(subject+" "+text);

    if(req.method == "POST"){

        var bdTime = new Date().toLocaleString("en-US", {timeZone: "Asia/Dhaka"});
        var date = new Date(bdTime);
        console.log('BD time: '+date.toLocaleString())
  
        var sql = "INSERT INTO `document` (`Subject`,`Text`,`DateTime`) VALUES ('" + subject + "','" + text + "', '" + date.toLocaleString()+ "')";
        var query = db.query(sql, function(err, result) {
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
               res.json({data:data});
            }
        });
    }
}
