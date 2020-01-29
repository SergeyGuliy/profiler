<template>
  <div>
    <div class="container" v-if="loading">
      <div v-if="!gitHubInfo.message">
        <div class="grid" v-if="loading">
          <div class="header">
            <div>
              <span class="badge">{{ repository.name }}</span>
            </div>
          </div>

          <div class="section-1">
            <ul class="collection with-header">
              <li class="collection-header"><h5>Информация:</h5></li>
              <li class="collection-item">
                Создатель:
                <router-link
                  v-if="repository.name"
                  class="right"
                  :to="{
                    name: 'user',
                    params: { user: repository.creator_id }
                  }"
                  >{{ repository.creator }}</router-link
                >
                <span v-else class="right">Не указано</span>
              </li>
              <li class="collection-item">
                Доступность:
                <span
                  v-if="repository.accessibility === 'private'"
                  class="right"
                  >Приватный</span
                >
                <span v-else class="right">Публичный</span>
              </li>
              <li class="collection-header"><h5>Описание:</h5></li>
              <li class="collection-item">
                <p v-if="repository.about">{{ repository.about }}</p>
                <p v-else-if="gitHubInfo.description">
                  {{ gitHubInfo.description }}
                </p>
                <p v-else>Не указано</p>
              </li>
            </ul>
          </div>
          <div class="section-2">
            <ul class="collection with-header">
              <li class="collection-header"><h5>Ключи:</h5></li>
              <li class="collection-item">
                Язык програмирования:
                <span v-if="repository.languages" class="right">{{
                  repository.languages
                }}</span>
                <span v-else class="right">Не указано</span>
              </li>
              <li class="collection-item">
                Технология:
                <span v-if="repository.technologies" class="right">{{
                  repository.technologies
                }}</span>
                <span v-else class="right">Не указано</span>
              </li>
              <li
                class="collection-header"
                v-if="repository.cite || repository.repository"
              >
                <h5>Ссылки:</h5>
              </li>
              <li
                class="collection-item"
                v-if="repository.cite || gitHubInfo.homepage"
              >
                На официальный сайт:
                <a
                  target="_blank"
                  v-if="repository.cite"
                  :href="'http://' + repository.cite"
                  class="right"
                  >{{ repository.cite }}</a
                >
                <a
                  target="_blank"
                  v-else
                  :href="gitHubInfo.homepage"
                  class="right"
                  >{{ repository.cite }}</a
                >
              </li>
              <li class="collection-item" v-if="repository.repository">
                На GitHub репозиторий:<a
                  target="_blank"
                  :href="'https://github.com/' + repository.repository"
                  class="right"
                  >{{ repository.repository }}</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Error v-else message="Ошибка получения доступа к GitHub" />
    </div>
    <Loader v-else />
  </div>
</template>

<script>
import Loader from "../../../components/Loader";
import Error from "../../../components/Error";
export default {
  name: "Repository",
  components: { Loader, Error },
  data() {
    return {
      loading: false,
      repository: "",
      gitHubInfo: ""
    };
  },
  async mounted() {
    this.repository = await this.$store.dispatch(
      "fetchARepositoryById",
      this.$route.params.repository
    );
    this.gitHubInfo = await (
      await fetch(`https://api.github.com/repos/${this.repository.repository}`)
    ).json();
    console.log(this.gitHubInfo);
    this.loading = true;
  }
};
</script>

<style scoped lang="sass">
.grid
  grid-template-rows: 72px 1fr 1fr 1fr
  grid-template-areas: 'head head head head head head' 'sec1 sec1 sec1 sec2 sec2 sec2' 'sec1 sec1 sec1 sec2 sec2 sec2' 'sec1 sec1 sec1 sec2 sec2 sec2'
  @media screen and (max-width: 900px)
    grid-template-areas: 'head head head head head head' 'sec1 sec1 sec1 sec2 sec2 sec2' 'sec1 sec1 sec1 sec2 sec2 sec2'
  @media screen and (max-width: 600px)
    grid-template-areas: 'head head head head head head' 'sec1 sec1 sec1 sec1 sec1 sec1' 'sec2 sec2 sec2 sec2 sec2 sec2'

.section-1, .section-2, .section-3
  padding: 10px 10px !important
h5
  margin: 0 !important
.collection-item
  padding: 7px 30px !important
</style>
