const config = require('../configs/database');
let mysql      = require('mysql');
let pool       = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    home(req,res){
        let id = req.headers.userid
        console.log(id)
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT a.*, b.* FROM user a LEFT JOIN biodata b ON a.id = b.id_user WHERE b.id_user = ${id};
                `
            , function (error, results) {
                if(error) throw error;
                let isExist = results.length > 0 ? true : false;
                res.render("home",{
                    url: 'http://localhost:5050/',
                    data: results[0],
                    isExist: isExist,
                    colorFlash: req.flash('color'),
                    pesanFlash: req.flash('message'),
                });
            });
            connection.release();
        })
    }
}