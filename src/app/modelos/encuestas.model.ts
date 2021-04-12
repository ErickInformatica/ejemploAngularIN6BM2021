export class Encuesta{
  constructor(
    public _id: String,
    public titulo: String,
    public descipcion: String,
    public opinion: {
      si: Number,
      no: Number,
      ninguna: Number,
      usuarioEncuestados: []
    },
    public listaComentarios: [{
      textoComentario: String,
      idUsuarioComentario: String
    }],
    public creadorEncuesta: String
  ){}
}
