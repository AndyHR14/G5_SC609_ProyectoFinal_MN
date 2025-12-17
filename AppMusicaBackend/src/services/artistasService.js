const Artistas = require('../models/Artistas');

class ArtistasService {

  basePopulate(query) {
    return query
      .populate({
        path: 'generos',
        select: 'nombre'
      });
  }

  async findAll() {
    return await this.basePopulate(Artistas.find());
  }

  async findById(id) {
    return await this.basePopulate(Artistas.findById(id));  
  }

  async findByNameOrBioLike(text) {
    return await this.basePopulate(Artistas.find({
      $or: [
        { nombre: { $regex: text, $options: 'i' } },
        { bio: { $regex: text, $options: 'i' } }
      ]
    }));
  }

  async create(data) {
    const artista = new Artistas(data);
    return await artista.save();
  }

  async updateArtistaById(id, data) {
    return await Artistas.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteById(id) {
    return await Artistas.findByIdAndDelete(id);
}

}

module.exports = new ArtistasService();