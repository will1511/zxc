const express = require('express')
const UserData = require('../models/user')
const DokterData = require('../models/dokter')


const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID;

const router = express.Router()



MongoClient.connect("mongodb://clara:clara123@cluster0-shard-00-00.mkqbl.mongodb.net:27017,cluster0-shard-00-01.mkqbl.mongodb.net:27017,cluster0-shard-00-02.mkqbl.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-11ixiz-shard-0&authSource=admin&retryWrites=true&w=majority", { useUnifiedTopology: true })
.then(client => {
    console.log('Connected to Database')
    // untuk pilih DB
    const db = client.db('HaloDocDatabase')
    const userDB = db.collection('User');
    const dokterDB = db.collection('Dokter');
    const adminDB = db.collection('Admin');
    const artikelDB = db.collection('Artikel');

    router.get('/', (req, res) => {
        res.render('pages/index')
    })
    
    router.get(('/artikel'), async (req, res) => {
        const data = await artikelDB.find().toArray();
        res.render('pages/artikel', { artikelList: data });
    })

    router.get(('/isiartikel'), async (req, res) => {
        const data = await artikelDB.find().toArray();
        res.render('pages/artikel', { artikelList: data });
    })
    
    router.get(('/bmi'), (req, res) => {
        res.render('pages/bmi')
    })

    router.get(('/thankyoudokter'), (req, res) => {
        res.render('pages/thankyoudokter')
    })
    
    router.get(('/faq'), (req, res) => {
        res.render('pages/faq')
    })
    
    router.get(('/isiartikel'), (req, res) => {
        res.render('pages/isiartikel')
    })
    
    router.get(('/kalenderK'), (req, res) => {
        res.render('pages/kalenderK')
    })
    
    router.get(('/kalenderM'), (req, res) => {
        res.render('pages/kalenderM')
    })
    
    router.get(('/kategori'), (req, res) => {
        res.render('pages/kategori')
    })
    
    router.get(('/listdokter'), (req, res) => {
        res.render('pages/listdokter')
    })
    
    router.get(('/registerdokter'), (req, res) => {
        res.render('pages/registerdokter')
    })
    
    router.get(('/security'), (req, res) => {
        res.render('pages/security')
    })
    
    router.get(('/sk'), (req, res) => {
        res.render('pages/sk')
    })
    
    router.get(('/admin'), (req, res) => {
        res.render('pages/admin')
    })

    router.get(('/aplikasi'), (req, res) => {
        res.render('pages/aplikasi')
    })
    
    router.get(('/addartikel'), (req, res) => {
        res.render('pages/addartikel', { error : "" })
    })
    
    router.get(('/updateartikel'), (req, res) => {
        res.render('pages/updateartikel')
    })

    router.get(('/artikeladmin'), async (req, res) => {
        // if (req.session.isLoggedIn) {
            const data = await artikelDB.find().toArray();
            res.render('pages/artikeladmin', { artikelList: data });
        // } else {
        //     res.redirect('/admin');
        // }
    })

    router.get(('/logout'), (req, res) => {
        req.session.isLoggedIn = false;
        res.render('pages/index')
    })

    router.get(('/logoutadmin'), (req, res) => {
        req.session.isLoggedIn = false;
        res.render('pages/admin')
    })

    router.get(('/logout'), (req, res) => {
        res.render('pages/index')
    })

    router.get(('/listuser'), (req, res) => {
        res.render('pages/listuser')
    })

    router.get(('/cobalistuser'), async (req, res)=>{
        if (req.session.isLoggedIn) {
            const data = await userDB.find().toArray();
            res.render('pages/listuser', { userList: data || [], name: req.session.name });
        }
    })

    router.post(('/register'), async (req, res)=>{
        if (!req.session.isLoggedIn) {
            const body = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: 0,
            };
            userDB.insertOne(body).then(result => {
                res.redirect('/cobalistuser');
            })

            .catch(error => console.error(error))
        }
    })
    
    router.post(('/authenticationuser'), async (req, res)=>{
        const email = req.body.email;
        const password = req.body.password;
        let isLogin = false; 
    
        // untuk pilih collection user
        userDB.find().toArray().then(result => {
            result.forEach((data) => {
                if (email == data.email && password == data.password) {
                    req.session.isLoggedIn = true;
                    req.session.name = data.name;
                    res.render('pages/index');
                    isLogin = true;
                }

            })

            if (isLogin == false) {
                res.render('pages/index', { error: "Email dan Password tidak terdaftar!" });
            }
        })
        .catch(error => console.error(error))
    })
    
    router.get(('/validasidokter'), (req, res) => {
        res.render('pages/validasidokter'), { error : "" }
    })

    router.get(('/cobalistdokter'), async (req, res)=>{
        if (req.session.isLoggedIn) {
            const data = await dokterDB.find().toArray();
            res.render('pages/validasidokter', { dokterList: data || [], name: req.session.name });
        }
    })

    router.post(('/registerdokter'), async (req, res)=>{
        if (!req.session.isLoggedIn) {
            const body = {
                photo: req.body.photo,
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                phonenumber: req.body.phonenumber,
                hospital: req.body.hospital,
                domisili: req.body.domisili,
                spesialis: req.body.spesialis,
                dokumen: req.body.dokumen,
                role: 2,
            };

            dokterDB.insertOne(body).then(result => {
                res.redirect('/cobalistdokter');
            })

            .catch(error => console.error(error))
        }
    })

    router.post(('/authenticationdokter'), async (req, res)=>{
        const email = req.body.email;
        const password = req.body.password;
        let isLogin = false; 
    
        // untuk pilih collection
        dokterDB.find().toArray().then(result => {
            result.forEach((data) => {
                if (email == data.email && password == data.password) {
                    req.session.isLoggedIn = true;
                    req.session.name = data.name;
                    res.render('pages/index');
                    isLogin = true;
                }
            })

            if (isLogin == false) {
                res.render('pages/registerdokter', { error: "Email dan Password tidak terdaftar!" });
            }
        })
        .catch(error => console.error(error))
    })

    router.post(('/cobapostcreateartikel'), async (req, res)=>{
        const body = {
            title: req.body.title,
            isi: req.body.isi,
            // img: req.body.img,
        };
        artikelDB.insertOne(body).then(result => {
            res.redirect('/artikeladmin');
        })
        .catch(error => {
            res.render('pages/addartikel', { error : error })
        })
    })


    router.post(('/authenticationadmin'), async (req, res)=>{
        const email = req.body.email;
        const password = req.body.password;
        let isLogin = false; 
    
        // untuk pilih collection
        adminDB.find().toArray().then(result => {
            result.forEach((data) => {
                if (email == data.email && password == data.password) {
                    req.session.isLoggedIn = true;
                    req.session.name = data.name;
                    res.redirect('/artikeladmin');
                    isLogin = true;
                }
            })

            if (isLogin == false) {
                res.render('pages/admin', { error: "Email dan Password tidak terdaftar!" });
            }
        })
        .catch(error => console.error(error))
    })



    
})
.catch(console.error)

module.exports = router;