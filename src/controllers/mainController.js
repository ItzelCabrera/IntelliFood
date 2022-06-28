const controller = {};

let _user;
let _pantrycode;

controller.begin = (req,res)=>{
    res.render('inicioSesion');
};

controller.authenticate = (req,res) =>{//autentica que exista ese usaurio
    const obj = JSON.parse(JSON.stringify(req.body)); // req.body = [Object: null prototype] 
    //console.log(req.body);
    const username = obj.UserName;
    const userpassword = obj.UserPassword;
    req.getConnection((err,conn)=>{
        conn.query("SELECT * FROM USER WHERE UserName = ?",[username],(err,user)=>{
            if(err){
                res.json(err);
            }else{
                let userInfo = JSON.parse(JSON.stringify(user[0]));
                _user = userInfo.UserName;
                if(userInfo.UserPassword == userpassword){
                    //console.log("correcto");
                    res.render('main',{
                        user:_user,
                        date: new Date()
                    });//renderiza el main
                }else{
                    throw err;
                    prompt('Credenciales incorrectas!');
                }
            }
        });
    });
};

controller.gotoRegistro = (req,res)=>{
    res.render('Registro');
};

controller.gotoAlacena = (req,res)=>{
    const obj = JSON.parse(JSON.stringify(req.params)); // req.body = [Object: null prototype] 
    //console.log(req.body);
    const pantrycode = obj.PantryCode;
    const pantryname = obj.PantryName;
    req.getConnection((err,conn)=>{
        conn.query("SELECT * FROM PRODUCT WHERE FK_PantryCode = ?",[pantrycode],(err,products)=>{
            if(err){
                res.json(err);
            }else{
                _pantrycode = pantrycode;
                let PantryProducts = JSON.parse(JSON.stringify(products));
                console.log(PantryProducts);
                res.render('Alacena',{
                    data: PantryProducts
                });//renderiza la alacena
            }
        });
    });
};

controller.gotoAgregarAlacena = (req,res)=>{
    res.render('agregarAlacena');
};

controller.addAlacena = (req,res)=>{
    const obj = JSON.parse(JSON.stringify(req.body)); // req.body = [Object: null prototype] 
    const namealacena = obj.nombreAlacena;
    console.log(obj);
    req.getConnection((err,conn)=>{
        conn.query("INSERT INTO PANTRY(PantryName,FK_UserName) VALUES (?,?)",[namealacena,_user],(err,results)=>{
            if(err){
                res.json(err);
                res.redirect('agregarAlacena');
            }else{
                conn.query("SELECT PantryName FROM PANTRY WHERE FK_UserName = ?",[_user],(err,pantries)=>{
                    if(err){
                        res.json(err);
                    }else{
                        let Pantries = JSON.parse(JSON.stringify(pantries));
                        console.log(Pantries);
                        res.render('MisAlacenas',{
                            data : Pantries
                        });//renderiza el main
                    }
                });
            }
        });
    });
};

controller.gotoMiPerfil = (req,res)=>{
    req.getConnection((err,conn)=>{
        conn.query("SELECT * FROM USER WHERE UserName = ?",[_user],(err,users)=>{
            if(err){
                res.json(err);
            }else{
                let userInfo = JSON.parse(JSON.stringify(users[0]));
                res.render('MiPerfil',{
                    user: userInfo.UserName,
                    password:userInfo.UserPassword,
                    email:userInfo.UserEmail
                });//renderiza el main
            }
        });
    });
    
};

controller.gotoMisAlacenas = (req,res)=>{
    req.getConnection((err,conn)=>{
        conn.query("SELECT PantryName,PantryCode FROM PANTRY WHERE FK_UserName = ?",[_user],(err,pantries)=>{
            if(err){
                res.json(err);
            }else{
                let Pantries = JSON.parse(JSON.stringify(pantries));
                console.log(Pantries);
                res.render('MisAlacenas',{
                    data : Pantries
                });//renderiza el main
            }
        });
    });
};

controller.gotoGastos = (req,res)=>{
    res.render('Gastos');
};

controller.gotoMain = (req,res)=>{
    res.render('main',{
        user:_user,
        date: new Date()
    });
};

controller.add = (req,res)=>{
    const obj = JSON.parse(JSON.stringify(req.body)); // req.body = [Object: null prototype] 
    const username = obj.UserName;
    const useremail = obj.UserEmail;
    const userpassword = obj.UserPassword;
    req.getConnection((err,conn)=>{
        conn.query("INSERT INTO USER VALUES (?,?,?)",[username,useremail,userpassword],(err,user)=>{
            if(err){
                res.json(err);
                res.redirect('Registro');
            }
        });
    });
};

controller.updatePassword = (req,res)=>{
    const obj = JSON.parse(JSON.stringify(req.body)); // req.body = [Object: null prototype] 
    console.log(req.body);
    const newPassword = obj.newPassword;
    req.getConnection((err,conn)=>{
        conn.query("UPDATE USER SET UserPassword = (?) WHERE UserName = (?)",[newPassword,_user],(err,change)=>{
            if(err){
                res.json(err);
            }else{
               res.render('main',{
                   user:_user,
                   date: new Date()
               });
            }
        });
    });
};


module.exports = controller;