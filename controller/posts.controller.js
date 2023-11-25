const pool = require("../database/index")

//helper function:
function isInt(value) {
    return !isNaN(value) && 
           parseInt(Number(value)) == value && 
           !isNaN(parseInt(value, 10));
  }

const postsController = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("select * from posts")


 

            res.render(
                'default',{rows:rows}
             )
           
        }catch(errors){

            req.flash('errors',errors)
            console.log(errors)
               res.render('404', {errors: req.flash('errors')})
           }
        },

    getById: async (req, res) => {
        try {
            const { id } = req.params
            
            const [rows, fields] = await pool.query("select * from posts where id = ?", [id])
            res.json({
                data: rows
            })
        }catch(errors){
            req.flash('errors',errors)
            console.log(errors)
               res.render('404', {errors: req.flash('errors')})
               return -1;
           }
         },
    create: async (req, res) => {
        try {
            const { title, content, id } = req.body
            if((! isInt(id)) || ((id) < 0)){
                throw new Error("ID must be a number!")}
            console.log(req.body)
            const sql = "insert into posts (title, content, id) values (?, ?, ?)"
            const [rows, fields] = await pool.query(sql, [title, content, id])
            res.render(
               'after_operation'
             )
        } catch(errors){
            setTimeout(function() {
            }, 1000);
            console.log("line 53")
            console.log(errors)
            console.log("line 55")
            req.flash('errors',errors)
            
               res.render('404', {errors: req.flash('errors')})
               return -1;
           }
            
        }
        ,
    
    update: async (req, res) => {
        try {
            const { title, content, id } = req.body
            const [rows2, fields2] = await pool.query("delete from posts where id = ?", [id])
            const sql = "insert into posts (title, content, id) VALUES (?, ?, ?)"
            const [rows, fields] = await pool.query(sql, [title, content, id])
            
            res.render(
                'after_operation'
              )
        } catch(errors){
            req.flash('errors',errors)
            console.log(errors)
               res.render('404', {errors: req.flash('errors')})
               return -1;
           }
           
        }
    , 
    delete: async (req, res) => {
        try {
            const { id } = req.params
            console.log(id)
        
            const [rows, fields] = await pool.query("delete from posts where id = ?", [id])
            res.render(
                'after_operation'
              )
        } catch(errors){
            req.flash('errors',errors)
            console.log(errors)
               res.render('404', {errors: req.flash('errors')})
               return -1;
           }
    }

}

module.exports = postsController