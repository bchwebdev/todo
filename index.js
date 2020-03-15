const express = require(`express`);
const mysql = require('mysql2');
const bp = require('body-parcer');
const app = express();
const port = 3000;

app.use(bp.json())
app.use(bp.urlencoded({extend :true}))

const connection = mysql.createConnection({
    user : 'root',
    password : 'rtlry',
    host : 'db',
    database : 'lpdip2020'
});

app.get(`/todo`, (req, res) => {
    connection.query('Select * from todo',
    function(err, resultat){
        res.json(resultat);
    });
});

app.get(`/todo/:id`, (req, res) => {
    connection.query('Select * from todo where id =' + req.params.id,
    function(err, resultat){
        res.json(resultat);
    });
});

app.delete(`/todo/:id`, (req, res) => {
    connection.query('DELETE FROM todo WHERE id =' + req.params.id, 
    function (err, result) {
        if(err) {
            res.json("error: ", err);
        }
        else{        
            if(result.affectedRows == 0){
                res.json("Erreur: l'élément sélectionné n'existe pas.");
            }
            else{
                res.json("Elément supprimé.");
            }  
        }
    }); 
});

app.post(`/todo`, (req, res) =>  {    
    connection.query('INSERT INTO todo (label,isdone) VALUES ("' + req.body.label + '","' + req.body.isdone + '")', 
    function (err, result) {
        if(err) {
            res.json("error: ", err);
        }
        else{        
            res.json("Elément ajouté.");
        }
        });           
});

app.put('/todo/:id', (req, resp) => {
    connection.query('UPDATE todo set label = :label , isDone = :isDone  where id = :id', {
         id: todoId,
         label: todo.label,
         isDone: todo.isDone
        },
        function(err, result) {
        if (err) {
            res.json("error: ", err);
        }
        else{        
            res.json("Elément modifié.");
        }
    });
    response.json(getTodo());
  });
  

  
app.listen(port, () => console.log(`App listening on port ${port}!`))