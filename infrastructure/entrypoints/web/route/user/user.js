const express = require('express');
const Usuario = require('../../../../../domain/model/user.js');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const app = express();

//const { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion.js')

app.get('/usuario', function(req, res) {

    let desde = req.query.desde || 0;
    let limite = req.query.limite || 10;

    desde = Number(desde);
    limite = Number(limite);

    Usuario.find({ estado: true }, 'nombre email estado role google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.countDocuments({ estado: true }, (err, conteo) => {

                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                });

            });


        });

});

app.post('/usuario', function(req, res) {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });


    });
});

app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

app.delete('/usuario/:id', function(req, res) {
    let id = req.params.id;

    let cambiaEstado = {
        estado: false
    };

    //    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    Usuario.findByIdAndUpdate(id, { estado: false }, { new: true }, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });

    });
});

module.exports = app;