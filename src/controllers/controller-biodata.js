const config = require('../configs/database');

let mysql      = require('mysql');
let pool       = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports = {
    index(req,res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
                res.render("biodata/index",{
                url: 'http://localhost:5050/',
            });
            connection.release();
        })
    },
    getAll(req,res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT a.id AS id_user, a.user_email, b.id AS id_biodata, b.nama, b.tempat_lahir, b.tanggal_lahir, b.posisi_dilamar FROM user a LEFT JOIN biodata b ON a.id = b.id_user 
                `
            , function (error, results) {
                if(error) throw error;
                return res.status(200).send({
                    users: results,
                    colorFlash: req.flash('color'),
                    pesanFlash: req.flash('message'),
                });
            });
            connection.release();
        })
    },
    create(req,res){
        res.render("biodata/create",{
            url: 'http://localhost:5050/',
        });
    },
    store(req,res){
        const body = req.body;
        const errors = [];
        for (const key in body) {
            if (body.hasOwnProperty(key)) {
                if (body[key] === null || body[key] === undefined || 
                    (Array.isArray(body[key]) && body[key].length === 0) || 
                    (typeof body[key] === 'string' && body[key].trim() === '')) {
                    errors.push(`${key} belum diisi.`);
                }
            }
        }
        
        if (errors.length > 0) {
            return res.status(400).json({ 
                status: 'failed',
                message: errors,
            });
            
        }

        let id_user = req.headers.iduser
        let posisi_dilamar = req.body.posisi_dilamar;
        let nama = req.body.nama;
        let no_ktp = req.body.no_ktp;
        let tempat_lahir = req.body.tempat_lahir;
        let tanggal_lahir = req.body.tanggal_lahir;
        let jenis_kelamin = req.body.jenis_kelamin;
        let agama = req.body.agama;
        let golongan_darah = req.body.golongan_darah;
        let status = req.body.status;
        let alamat_ktp = req.body.alamat_ktp;
        let alamat_tinggal = req.body.alamat_tinggal;
        let no_telp = req.body.no_telp;
        let orang_terdekat = req.body.orang_terdekat;
        let bersedia_ditempatkan = req.body.bersedia_ditempatkan;
        let penghasilan_diharapkan = req.body.penghasilan_diharapkan;
        
        let pendidikan = req.body.pendidikan
        let pekerjaan = req.body.pekerjaan
        let pelatihan = req.body.pelatihan
        let skill = req.body.skill

        let dumpPendidikan = [];
        let dumpPekerjaan = [];
        let dumpPelatihan = [];
        let dumpSkill = [];
        
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `INSERT INTO biodata (id_user, posisi_dilamar, nama, no_ktp, tempat_lahir, tanggal_lahir, jenis_kelamin, agama, golongan_darah, 
                status, alamat_ktp, alamat_tinggal, no_telp, orang_terdekat, bersedia_ditempatkan, penghasilan_diharapkan) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`
                , [id_user, posisi_dilamar, nama, no_ktp, tempat_lahir, tanggal_lahir, jenis_kelamin, agama, golongan_darah, status, 
                    alamat_ktp, alamat_tinggal, no_telp, orang_terdekat, bersedia_ditempatkan, penghasilan_diharapkan], function (error, results) {
                    if (error) throw error;
                    let id_biodata = results.insertId;
                    
                    for(let i = 0; i < pendidikan.length; i++){
                        dumpPendidikan.push([
                            id_biodata,
                            pendidikan[i].jenjang_pendidikan,
                            pendidikan[i].nama_institusi,
                            pendidikan[i].jurusan,
                            pendidikan[i].tahun_lulus,
                            pendidikan[i].ipk
                        ])
                    }

                    for(let i = 0; i < pekerjaan.length; i++){
                        dumpPekerjaan.push([
                            id_biodata, 
                            pekerjaan[i].nama_perusahaan,
                            pekerjaan[i].posisi,
                            pekerjaan[i].pendapatan,
                            pekerjaan[i].tahun,
                        ])
                    }

                    for(let i = 0; i < pelatihan.length; i++){
                        dumpPelatihan.push([
                            id_biodata, 
                            pelatihan[i].nama_kursus,
                            pelatihan[i].sertifikat,
                            pelatihan[i].tahun_pelatihan
                        ])
                    }

                    for(let i = 0; i < skill.length; i++){
                        dumpSkill.push([
                            id_biodata, 
                            skill[i]
                        ])
                    }

                    connection.query(`INSERT INTO pendidikan (id_biodata, jenjang_pendidikan, nama_institusi, jurusan, tahun_lulus, ipk) 
                        VALUES ?;`
                        , [dumpPendidikan], function (error, results) {
                            if (error) throw error; 
                    
                        });
                    
                    connection.query(`INSERT INTO pekerjaan (id_biodata, nama_perusahaan, posisi, pendapatan, tahun) 
                        VALUES ?;`
                        , [dumpPekerjaan], function (error, results) {
                            if (error) throw error;
                        });
                    
                    connection.query(`INSERT INTO pelatihan (id_biodata, nama_kursus, sertifikat, tahun_pelatihan) 
                        VALUES ?;`
                        , [dumpPelatihan], function (error, results) {
                            if (error) throw error;
                        });

                    connection.query(`INSERT INTO skill (id_biodata, nama_skill) 
                        VALUES ?;`
                        , [dumpSkill], function (error, results) {
                            if (error) throw error;
                        });
                    
                    req.flash('color', 'success');
                    req.flash('message', 'Buat Biodata berhasil');
                    res.status(200).send({
                        status: 'success',
                        message:'Buat Biodata Berhasil',
                        data: req.body
                    });

                });
            connection.release();
            
        })
        
    },
    view(req,res){
        let id = req.params.id;
        let result;
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT a.id as id_user, a.*, b.id as id_biodata, b.* FROM user a 
                LEFT JOIN biodata b ON a.id = b.id_user 
                WHERE a.id = ${id};
                `
            , function (error, results) {
                if(error) throw error;

                if(results.length > 0){
                    const id_biodata = results[0].id_biodata;
                    const specificDate = new Date(results[0].tanggal_lahir);
                    const formatNumber = num => num.toString().padStart(2, '0');

                    // Extract year, month, and day
                    const year = specificDate.getFullYear();
                    const month = formatNumber(specificDate.getMonth() + 1); // Months are zero-based (0-11)
                    const day = formatNumber(specificDate.getDate());

                    // Format date as yyyy-mm-dd
                    const formattedDate = `${year}-${month}-${day}`;

                    result = {
                        id_biodata: id_biodata,
                        posisi_dilamar : results[0].posisi_dilamar,
                        nama : results[0].nama,
                        no_ktp : results[0].no_ktp,
                        tempat_lahir : results[0].tempat_lahir,
                        tanggal_lahir : formattedDate,
                        jenis_kelamin : results[0].jenis_kelamin,
                        agama : results[0].agama,
                        golongan_darah : results[0].golongan_darah,
                        status : results[0].status,
                        alamat_ktp : results[0].alamat_ktp,
                        alamat_tinggal : results[0].alamat_tinggal,
                        no_telp : results[0].no_telp,
                        orang_terdekat : results[0].orang_terdekat,
                        bersedia_ditempatkan : results[0].bersedia_ditempatkan,
                        penghasilan_diharapkan : results[0].penghasilan_diharapkan
                    }
                    
                    connection.query(`
                        SELECT * FROM pendidikan  
                        WHERE id_biodata = ${id_biodata};
                        `
                    , function (error, results) {
                        if(error) throw error;

                        result.pendidikan = results

                        connection.query(`
                            SELECT * FROM pelatihan  
                            WHERE id_biodata = ${id_biodata};
                            `
                        , function (error, results) {
                            if(error) throw error;
                            result.pelatihan = results

                            connection.query(`
                                SELECT * FROM pekerjaan  
                                WHERE id_biodata = ${id_biodata};
                                `
                            , function (error, results) {
                                if(error) throw error;
                                result.pekerjaan = results

                                connection.query(`
                                    SELECT * FROM skill  
                                    WHERE id_biodata = ${id_biodata};
                                    `
                                , function (error, results) {
                                    if(error) throw error;
                                    result.skill = results
                                    
                                    console.log('result', result)
                                    return res.status(200).send({
                                        data: result,
                                    });
                                    // res.render("biodata/edit",{
                                    //     url: 'http://localhost:5050/',
                                    //     data: result
                                    // });
                                })
                            })
                        })
                    })
                }else{
                    return res.status(404).send({
                        message: 'Biodata tidak ada',
                    });
                }
            });
            connection.release();
        })
    },
    edit(req,res){
        let id = req.params.id;
        let result;
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT a.*, b.id as id_biodata, b.* FROM user a 
                LEFT JOIN biodata b ON a.id = b.id_user 
                WHERE a.id = ${id};
                `
            , function (error, results) {
                if(error) throw error;
                const id_biodata = results[0].id_biodata;
                const specificDate = new Date(results[0].tanggal_lahir);
                const formatNumber = num => num.toString().padStart(2, '0');

                // Extract year, month, and day
                const year = specificDate.getFullYear();
                const month = formatNumber(specificDate.getMonth() + 1); // Months are zero-based (0-11)
                const day = formatNumber(specificDate.getDate());

                // Format date as yyyy-mm-dd
                const formattedDate = `${year}-${month}-${day}`;

                result = {
                    id_user: results[0].id_user,
                    id_biodata: id_biodata,
                    posisi_dilamar : results[0].posisi_dilamar,
                    nama : results[0].nama,
                    no_ktp : results[0].no_ktp,
                    tempat_lahir : results[0].tempat_lahir,
                    tanggal_lahir : formattedDate,
                    jenis_kelamin : results[0].jenis_kelamin,
                    agama : results[0].agama,
                    golongan_darah : results[0].golongan_darah,
                    status : results[0].status,
                    alamat_ktp : results[0].alamat_ktp,
                    alamat_tinggal : results[0].alamat_tinggal,
                    no_telp : results[0].no_telp,
                    orang_terdekat : results[0].orang_terdekat,
                    bersedia_ditempatkan : results[0].bersedia_ditempatkan,
                    penghasilan_diharapkan : results[0].penghasilan_diharapkan
                }
                
                connection.query(`
                    SELECT * FROM pendidikan  
                    WHERE id_biodata = ${id_biodata};
                    `
                , function (error, results) {
                    if(error) throw error;

                    result.pendidikan = results

                    connection.query(`
                        SELECT * FROM pelatihan  
                        WHERE id_biodata = ${id_biodata};
                        `
                    , function (error, results) {
                        if(error) throw error;
                        result.pelatihan = results

                        connection.query(`
                            SELECT * FROM pekerjaan  
                            WHERE id_biodata = ${id_biodata};
                            `
                        , function (error, results) {
                            if(error) throw error;
                            result.pekerjaan = results

                            connection.query(`
                                SELECT * FROM skill  
                                WHERE id_biodata = ${id_biodata};
                                `
                            , function (error, results) {
                                if(error) throw error;
                                result.skill = results
                                
                                console.log('result', result)
                                res.render("biodata/edit",{
                                    url: 'http://localhost:5050/',
                                    data: result
                                });
                            })
                        })
                    })
                })
            });
            connection.release();
        })
    },
    update(req,res){
        const body = req.body;
        const errors = [];

        for (const key in body) {
            if (body.hasOwnProperty(key)) {
                if (body[key] === null || body[key] === undefined || 
                    (Array.isArray(body[key]) && body[key].length === 0) || 
                    (typeof body[key] === 'string' && body[key].trim() === '')) {
                    errors.push(`${key} belum diisi.`);
                }
            }
        }
        
        if (errors.length > 0) {
            return res.status(400).json({ 
                status: 'failed',
                message: errors,
            });
        }
        
        let id_user = req.headers.userid
        let id_biodata = req.body.id_biodata;
        let posisi_dilamar = req.body.posisi_dilamar;
        let nama = req.body.nama;
        let no_ktp = req.body.no_ktp;
        let tempat_lahir = req.body.tempat_lahir;
        let tanggal_lahir = req.body.tanggal_lahir;
        let jenis_kelamin = req.body.jenis_kelamin;
        let agama = req.body.agama;
        let golongan_darah = req.body.golongan_darah;
        let status = req.body.status;
        let alamat_ktp = req.body.alamat_ktp;
        let alamat_tinggal = req.body.alamat_tinggal;
        let no_telp = req.body.no_telp;
        let orang_terdekat = req.body.orang_terdekat;
        let bersedia_ditempatkan = req.body.bersedia_ditempatkan;
        let penghasilan_diharapkan = req.body.penghasilan_diharapkan;

        let pendidikan = req.body.pendidikan; 
        let pekerjaan = req.body.pekerjaan; 
        let pelatihan = req.body.pelatihan; 
        let skill = req.body.skill; 

        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `UPDATE biodata SET posisi_dilamar = ?, nama = ?, no_ktp = ?, tempat_lahir = ?, tanggal_lahir = ?, jenis_kelamin = ?, agama = ?, golongan_darah = ?, 
                status = ?, alamat_ktp = ?, alamat_tinggal = ?, no_telp = ?, orang_terdekat = ?, bersedia_ditempatkan = ?, penghasilan_diharapkan = ? WHERE id = ?`
                , [posisi_dilamar, nama, no_ktp, tempat_lahir, tanggal_lahir, jenis_kelamin, agama, golongan_darah, status, 
                    alamat_ktp, alamat_tinggal, no_telp, orang_terdekat, bersedia_ditempatkan, penghasilan_diharapkan, id_biodata], function (error, results) {
                    if (error) throw error;
                
                    for(let i = 0; i < pendidikan.length; i++){
                        connection.query(`UPDATE pendidikan SET jenjang_pendidikan = ?, nama_institusi = ?, jurusan = ?, tahun_lulus = ?, ipk = ?
                            WHERE id= ?
                            `
                            , [pendidikan[i].jenjang_pendidikan, pendidikan[i].nama_institusi, pendidikan[i].jurusan, pendidikan[i].tahun_lulus, pendidikan[i].ipk, pendidikan[i].id], function (error, results) {
                                if (error) throw error; 
                        
                            });
                    }
                    
                    for(let i = 0; i < pekerjaan.length; i++){
                        connection.query(`UPDATE pekerjaan SET nama_perusahaan = ?, posisi = ?, pendapatan = ?, tahun = ?
                            WHERE id= ?
                            `
                            , [pekerjaan[i].nama_perusahaan, pekerjaan[i].posisi ,pekerjaan[i].pendapatan ,pekerjaan[i].tahun, pekerjaan[i].id], function (error, results) {
                                if (error) throw error;
                            });
                    }
                    
                    for(let i = 0; i < pelatihan.length; i++){
                        connection.query(`UPDATE pelatihan SET nama_kursus = ?, sertifikat = ?, tahun_pelatihan = ?
                            WHERE id= ?
                            `
                            , [pelatihan[i].nama_kursus, pelatihan[i].sertifikat, pelatihan[i].tahun_pelatihan, pelatihan[i].id], function (error, results) {
                                if (error) throw error;
                            });
                    }

                    connection.query(`DELETE FROM skill WHERE id_biodata= ?`
                    , [id_biodata], function (error, results) {
                        if (error) throw error;
                    });

                    for(let i = 0; i < skill.length; i++){
                        connection.query(`INSERT INTO skill (id_biodata, nama_skill) 
                        VALUES (?, ?);`
                        , [id_biodata, skill[i]], function (error, results) {
                            if (error) throw error;
                        });
                    }
                    
                    res.status(200).send({
                        message:'Update Biodata Berhasil',
                        data: req.body
                    });

                    // res.redirect('/');
                });
            connection.release();
            
        })
        
    },
    delete(req,res){
        let id_biodata = req.params.id;
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(`SELECT * FROM biodata WHERE id = ${id_biodata}`, 
                function (error, results) {
                    if(error) throw error;
                    
                    if(results.length > 0){
                        connection.query(`DELETE FROM biodata WHERE id = ${id_biodata}`
                            , function (error, results) {
                                if(error) throw error;
                                    
                        });
                        
                        connection.query(`DELETE FROM pendidikan WHERE id_biodata = ${id_biodata}`
                            , function (error, results) {
                                if(error) throw error;   
                        });

                        connection.query(`DELETE FROM pekerjaan WHERE id_biodata = ${id_biodata}`
                            , function (error, results) {
                                if(error) throw error;
                        }); 

                        connection.query(`DELETE FROM pelatihan WHERE id_biodata = ${id_biodata}`
                            , function (error, results) {
                                if(error) throw error;
                                
                        });
                                        
                        connection.query(`DELETE FROM skill WHERE id_biodata = ${id_biodata}`
                            , function (error, results) {
                            if(error) throw error;
                        });
                    
                        // connection.query(`DELETE FROM user WHERE id = ${id}`
                        //     , function (error, results) {
                        //     if(error) throw error;
                        // })
    
                        res.status(200).send({
                            status: 'success',
                            message:'Biodata berhasil dihapus',
                        });
                    }else{
                        res.status(404).send({
                            status: 'failed',
                            message:'Biodata tidak ditemukan',
                        });
                    }


                });
                connection.release();
        });
    }
}