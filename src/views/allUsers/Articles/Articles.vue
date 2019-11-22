<template>
  <div>
    <div class="grid" v-if="loading">
      <div class="header">
        <span class="badge">Статьи</span>
        <div>
          <input type="text" class="validate" />
          <button class="btn">
            Поиск<img
              class="right ico"
              src="../../../assets/icons/search.png"
              alt=""
            />
          </button>
        </div>
      </div>
      <div class="section-1">
        <div class="input-field center">
          <table class="highlight centered table">
            <thead>
              <tr>
                <th>#</th>
                <th>Название</th>
                <th>Оценка</th>
                <th>Профиль</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="arcticle in articles" :key="arcticle.id">
                <td>{{ arcticle.id }}</td>
                <td>{{ arcticle.name }}</td>
                <td>{{ arcticle.rate }}</td>
                <td class="flex">
                  <router-link
                    class="btn"
                    :to="{
                      name: 'article',
                      params: { article: arcticle.name }
                    }"
                  >
                    <img src="../../../assets/icons/showArticles.png" alt="" />
                  </router-link>
                  <button class="btn del">
                    <img src="../../../assets/icons/delete.png" alt="" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <Loader v-else />
  </div>
</template>

<script>
import Loader from "../../../components/Loader";
export default {
  name: "Articles",
  components: { Loader },
  data() {
    return {
      loading: false,
      articles: [
        {
          id: 1,
          name: "sergey",
          rate: 6,
          link: "qwe"
        },
        {
          id: 2,
          name: "serg",
          rate: 6,
          link: "wQQQQw"
        },
        {
          id: 3,
          name: "gey",
          rate: 6,
          link: "we12231w"
        }
      ]
    };
  },
  mounted() {
    this.loading = true;
  }
};
</script>

<style scoped lang="sass">
.grid
  grid-template-rows: 72px 1fr 1fr
  grid-template-areas: 'head head head head head head' 'sec1 sec1 sec1 sec1 sec1 sec1' 'sec1 sec1 sec1 sec1 sec1 sec1'
</style>
