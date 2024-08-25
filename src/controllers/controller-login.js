const config = require('../configs/database');
const bcrypt = require("bcrypt");

const configuration = require("../configs/config-jwt.js");
var jwt = require("jsonwebtoken");
let mysql      = require('mysql');
let pool       = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    login(req,res){
        res.render("login",{
            url : 'http://localhost:5050/',
            colorFlash: req.flash('color'),
            pesanFlash: req.flash('message'),
        });
    },
    loginAuth(req,res){
        let email = req.body.email;
        let password = req.body.password;
        if (email && password) {
            pool.getConnection(function(err, connection) {
                if (err) throw err;
                connection.query(
                    `SELECT * FROM user WHERE user_email = ? AND user_password = SHA2(?,512)`
                , [email, password],function (error, results) {
                    if (error) throw error;  
                    if (results.length > 0) {
                        var token = jwt.sign({ id: results[0].id }, configuration.secret, {
                            expiresIn: '1h'
                        });

                        let result = {
                            status: 'success',
                            message:'login sukses',
                            data: results,
                            token: token,
                        }

                        if(results[0].role === 1){
                            result.url = 'biodata'
                            res.
                            header('authorization', token).
                            header('userid', results[0].id).
                            header('role', results[0].role).
                            status(200).send({
                                result
                            })
                            // res.redirect('/biodata');
                        }else{
                            result.url = ''
                            res.status(200).send({
                                result
                            })
                        }
                    } else {
                        let result = {
                            status: 'failed',
                            color: 'danger',
                            message: 'Akun tidak ditemukan',
                        }
                        res.send({
                            result
                        })
                    }
                });
                connection.release();
            })
        } else {
            res.send({
                status: 'failed',
                color: 'danger',
                message: 'Isi Email dan Password',
            })
        }
    },
    logout(req,res){
        req.session.destroy((err) => {
            if(err) {
                return console.log(err);
            }
            res.clearCookie('secretname');
            console.log(req.session)
            // res.redirect('/login');
        });

        // res.send({
        //     status: 'success',
        //     message: 'User berhasil logout',
        // });
    },
}