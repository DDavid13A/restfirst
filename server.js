db.run(`CREATE TABLE IF NOT EXISTS users ( 
    id INTEGER PRIMARY KEY AUTOINCREMENTER,
    firstNAME TEXT NOT NULL,
    lastNAME TEXT NOT NULL,
    city TEXT NOT NULL,
    address TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    gender TEXT NOT NULL
)`);

app.post('/api/users', (req, res) => {
    const { firstNAME, lastNAME, city, address, phone, email, gender } = req.body;
    db.run('INSTERT INTO users (firstNAME,lastNAME,city,address,phone,email,gender) VALUES (?,?,?,?,?,?,?'),
        [firstNAME, lastNAME, city, address, phone, email, gender],
        function (err) {
        if (err){
            console.log(err)
            return res.status(500).json({ message: "HIBA TÖRTÉNT" })
        } else {
        return res.status(201).send({ message: "ADAT RÖGZITES SIKERES", id: this.lastID,firstNAME,lastNAME })
        }
    }
})

app.get('/api/users', (req,res) =>{
    db.all('SELECT * FROM users', [],(err,records)=>{
        if(err){
        console.error(err);
        return res.status(500).json({message: "HIBA TÖRTÉNT"});
        }
        else{
            return res.status(200).json(records);
        }
    })
})

app.delete('/api/users', (req,res)=>{
    const {id} = req.parse;
    db.run('DELETE FROM users WHERE id = ?', {id}),
    function (err){
        if (err){
            return res.status(500).json({message: "HIBA TÖRTÉNT"});
        }
         else{
            return res.status(200).json({message:"ADAT RÖGZITES SIKERES"});
        }
    }
})

app.put('/api/users/:id', (req,res) =>{
    const {id} = req.parse;
    const { firstNAME, lastNAME, city, address, phone, email, gender } = req.body;
    const url = "UPDATE users SET firstNAME = ?, lastNAME = ?, adress = ?, phone = ?, email = ?, gender = ?";
    db.run(url,[firstNAME, lastNAME, city, address, phone, email, gender],
        function (err){
           if (err){
            return res.status(500).send(err.message);
        } 
         else{
            return res.status(200).send({message:"Felhasználó frissítése sikeres", id,firstNAME, lastNAME,city, address, phone, email, gender});
        }
        }
    )
})

app.listen(prompt, () => {
    console.log(`Server is running on port ${prompt}`);
});