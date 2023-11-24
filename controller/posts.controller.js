const pool = require("../database/index")


const postsController = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("select * from posts")


 

            res.render(
                'default',{rows:rows}
             )
           
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params
            const [rows, fields] = await pool.query("select * from posts where id = ?", [id])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },
    create: async (req, res) => {
        try {
            const { title, content, id } = req.body
            console.log(req.body)
            const sql = "insert into posts (title, content, id) values (?, ?, ?)"
            const [rows, fields] = await pool.query(sql, [title, content, id])
          
            res.json(
               {data:rows}
            )
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },
    update: async (req, res) => {
        try {
            const { title, content, id } = req.body
            const [rows2, fields2] = await pool.query("delete from posts where id = ?", [id])
            const sql = "insert into posts (title, content, id) VALUES (?, ?, ?)"
            const [rows, fields] = await pool.query(sql, [title, content, id])
            
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    }, 
    delete: async (req, res) => {
        try {
            const { id } = req.params
            console.log(id)
        
            const [rows, fields] = await pool.query("delete from posts where id = ?", [id])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    }

}

module.exports = postsController