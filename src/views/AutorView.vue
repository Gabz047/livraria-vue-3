<script setup>
import { ref, reactive, onMounted } from "vue";
import AutoresApi from "@/api/autores";
const autoresApi = new AutoresApi();

const defaultAutor = { id: null, nome: "", email: "" };
const autores = ref([]);
const autor = reactive({ ...defaultAutor });

onMounted(async () => {
  autores.value = await autoresApi.buscarTodosOsAutores();
});

function limpar() {
  Object.assign(autor, { ...defaultAutor });
}

async function salvar() {
  if (autor.id) {
    await autoresApi.atualizarAutor(autor);
  } else {
    await autoresApi.adicionarAutor(autor);
  }
  autores.value = await autoresApi.buscarTodosOsAutores();
  limpar();
}

function editar(autor_para_editar) {
  Object.assign(autor, autor_para_editar);
}

async function excluir(id) {
  await autoresApi.excluirAutor(id);
  autores.value = await autoresApi.buscarTodosOsAutores();
  limpar();
}

function buscar() {
  console.log(autor)
}
</script>

<template>
  <h1>Autor</h1>
  <hr />
  <div class="form">
    <input type="text" v-model="autor.nome" placeholder="Nome" />
    <input type="text" v-model="autor.email" placeholder="Email" />
    <button @click="salvar">Salvar</button>
    <button @click="limpar">Limpar</button>
  </div>
  <hr />
  <ul>
    <li v-for="autor in autores" :key="autor.id">
      <span @click="editar(autor)">
        ({{ autor.id }}) - {{ autor.nome }} - {{ autor.email }} -
      </span>
      <button @click="excluir(autor.id)">X</button>
    </li>
  </ul>
  <button @click="buscar">teste</button>
</template>

<style></style>
