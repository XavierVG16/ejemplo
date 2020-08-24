const pool = require("../database");

const categoriaCtrl = {};
categoriaCtrl.getCategorias = async (req, res, next) => {
    const categoria = await pool.query("select * from categoria");
  
    res.json(categoria);
};

categoriaCtrl.createCategoria = async (req, res, next) => {
    const { nombre, descripcion } = req.body;

    const newCategoria = {
      nombre,
      descripcion
    };
    await pool.query('insert into categoria  set ?', newCategoria);
    res.json({status: 'Categoria creada'});
};
categoriaCtrl.getCategoria = async (req, res, next) => {
    const { id } = req.params;
    const categoria = await pool.query('SELECT * FROM categoria WHERE idcategoria =  ?',[id]);
    res.json(categoria);
};

categoriaCtrl.editCategoria = async (req, res, next) => {
    const { id } = req.params;
    console.log(id)
  const { nombre, descripcion } = req.body;
  const edCategoria = {
    nombre,
    descripcion,
  };
    await pool.query('UPDATE categoria set ? WHERE idcategoria = ?',[edCategoria, id]);
    res.json({status: 'Caegoria Updated'});
};

categoriaCtrl.deleteCategoria = async (req, res, next) => {
    const { id } = req.params;
    await pool.query('DELETE FROM categoria WHERE idcategoria = ?',[id]);
    res.json({status: 'Categoria Deleted'});
};

module.exports = categoriaCtrl;