<script setup>
import { ref, reactive, onMounted } from "vue";
import LivrosApi from "@/api/livros";
const livrosApi = new LivrosApi();

const defaultLivro = {id: null, titulo: "", quantidade: null, preco: "", categoria: "", editora: "", autores: ""};
const livros = ref([]);
const livro = reactive({ ...defaultLivro });

onMounted(async () => {
  livros.value = await livrosApi.buscarTodosOsLivros();
});

function limpar() {
  Object.assign(livro, { ...defaultLivro });
}

async function salvar() {
  if (livro.id) {
    await livrosApi.atualizarLivros(livro);
  } else {
    await livrosApi.adicionarLivros(livro);
  }
  livros.value = await livrosApi.buscarTodosOsLivros();
  limpar();
}

function editar(livro_para_editar) {
  Object.assign(livro, livro_para_editar);
}

async function excluir(id) {
  await livrosApi.excluirLivros(id);
  livros.value = await livrosApi.buscarTodosOsLivros();
}
</script>

<template>
  <h1>Livro</h1>

  <div class="form">
    <input type="text" v-model="livro.titulo" placeholder="Título" />
    <input type="number" v-model="livro.quantidade" placeholder="Quantidade" />
    <input type="text" v-model="livro.preco" placeholder="Preço" />
    <select v-model="livro.categoria">
        <option v-for="nome in categoria" :key="nome.id"></option>
    </select>
    <button @click="salvar">salvar</button>
    <button @click="limpar">limpar</button>
  </div>

  <ul>
    <li v-for="livro in livros" :key="livro.id">
      <span @click="editar(livro)">
        {{ livro.id }} - {{ livro.titulo }} - {{ livro.quantidade }} -
        {{ livro.preco }}
      </span>
      <button @click="excluir(livro.id)">X</button>
    </li>
  </ul>
</template>

<style scooped>
.form {
  border-top: 2px solid;
  border-bottom: 2px solid;
  width: 100%;
}
</style>
