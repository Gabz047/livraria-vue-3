
import { RouterLink } from 'vue-router';
import router from './router';
<template>
  <header>
    <router-link :to="{ name: 'home' }">Home</router-link> |
    <router-link to="/categorias">Categorias</router-link> |
    <router-link to="/editoras">Editoras</router-link> |
    <router-link to="/autores">Autores</router-link> |
    <!--<RouterLink to="/livros">Livros</RouterLink>-->
  </header>
  <main>
    <RouterView />
  </main>
</template>
