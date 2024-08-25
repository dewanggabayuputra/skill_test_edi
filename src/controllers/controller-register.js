const config = require('../configs/database');
let mysql      = require('mysql');
let pool       = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    formRegister(req,res){
        res.render("register",{
            url : 'http://localhost:5050/',
        });
    },
    saveRegister(req,res){
        let email = req.body.email;
        let password = req.body.password;
        let role = 2;
        if (email && password) {
            pool.getConnection(function(err, connection) {
                if (err) throw err;
                connection.query(
                    `INSERT INTO user (user_email,user_password, role) VALUES (?,SHA2(?,512), ?);`
                , [email, password, role],function (error, results) {
                    if (error) throw error; 

                    res.send({
                        status: 'success',
                        message: 'Registrasi berhasil',
                    })
                });
                connection.release();
            })
        } else {
            res.send({
                status: 'failed',
                message: 'Isi email dan password',
            })
        }
    }
}