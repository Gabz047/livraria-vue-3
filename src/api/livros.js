import axios from "axios";

export default class LivrosApi {
  async buscarTodosOsLivros() {
    const { data } = await axios.get("/livros/");
    return data;
  }

  async adicionarLivros(livro) {
    const { data } = await axios.post("/livros/", livro);
    
    return data.results;
  }

  async atualizarLivros(livro) {
    const { data } = await axios.put(`/livros/${livro.id}/`, livro);
    return data.results;
  }

  async excluirLivros(id) {
    const { data } = await axios.delete(`/livros/${id}/`);
    return data.results;
  }
}
