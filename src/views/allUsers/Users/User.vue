<template>
  <div>
    <div class="container" v-if="loading">
      <div class="grid" v-if="user.profile">
        <div class="header">
          <div>
            <span v-if="user.info.first_name || user.info.second_name"
              >{{ user.info.first_name }} {{ user.info.second_name }}
            </span>
            <span v-else class="badge">{{ user.profile }}</span>
            <span v-if="$store.getters.user.isAdmin" class="badge-up"
              >Admin</span
            >
          </div>
          <div></div>
        </div>
        <div class="section-1">
          <div v-if="gitHubInfo" class="card">
            <div class="card-image">
              <a target="_blank" v-bind:href="gitHubInfo.html_url"
                ><img v-bind:src="gitHubInfo.avatar_url"
              /></a>
            </div>
          </div>
          <ul class="collection with-header">
            <li class="collection-header"><h5>Информация:</h5></li>
            <li class="collection-item">
              Место проживания:
              <span v-if="user.info.location" class="right">{{
                user.info.location
              }}</span>
              <span v-else class="right">Не указано</span>
            </li>
            <li class="collection-item">
              Дата рождения:
              <span v-if="user.info.dateOfBirth" class="right">{{
                user.info.dateOfBirth
              }}</span>
              <span v-else class="right">Не указано</span>
            </li>
            <li class="collection-header"><h5>Немного о себе:</h5></li>
            <li class="collection-item">
              <pre v-if="user.info.about">{{ user.info.about }}</pre>
              <pre v-else>Не указано</pre>
            </li>
          </ul>
        </div>
        <div class="section-2">
          <ul class="collection with-header">
            <li class="collection-header"><h5>О вашей работе:</h5></li>
            <li class="collection-item">
              Занятость:
              <span v-if="user.work.tipe_of_work" class="right">{{
                user.work.tipe_of_work
              }}</span>
              <span v-else class="right">Не указано</span>
            </li>
            <li class="collection-item">
              Тип работы:
              <span v-if="user.work.is_working" class="right">{{
                user.work.is_working
              }}</span>
              <span v-else class="right">Не указано</span>
            </li>
            <li class="collection-item">
              Занятость:
              <span v-if="user.work.tipe_of_work" class="right">{{
                user.work.tipe_of_work
              }}</span>
              <span v-else class="right">Не указано</span>
            </li>
            <li class="collection-header"><h5>Должность:</h5></li>
            <div v-if="user.work.position.length > 0">
              <li
                v-for="position in user.work.position"
                v-bind:key="position.id"
                class="collection-item"
              >
                {{ position }}
              </li>
            </div>
            <div v-else><li class="collection-item">Не указано</li></div>
          </ul>
          <ul class="collection with-header">
            <li class="collection-header"><h5>Языки програмирования:</h5></li>
            <div v-if="user.work.languages.length > 0">
              <li
                v-for="language in user.work.languages"
                v-bind:key="language.id"
                class="collection-item"
              >
                {{ language }}
              </li>
            </div>
            <div v-else><li class="collection-item">Не указано</li></div>
          </ul>
          <ul class="collection with-header">
            <li class="collection-header"><h5>Технологии:</h5></li>
            <div v-if="user.work.technologies.length > 0">
              <li
                v-for="technology in user.work.technologies"
                v-bind:key="technology.id"
                class="collection-item"
              >
                {{ technology }}
              </li>
            </div>
            <div v-else><li class="collection-item">Не указано</li></div>
          </ul>
        </div>
        <div class="section-3">
          <ul class="collection with-header">
            <li class="collection-header"><h5>Контакты:</h5></li>
            <li class="collection-item">
              Телефон:
              <a
                target="_blank"
                :to="'tel:' + user.contacts.phone"
                v-if="user.contacts.phone"
                class="right"
                >{{ user.contacts.phone }}</a
              >
              <span v-else class="right">Не указано</span>
            </li>
            <li class="collection-item">
              Сайт визитка:
              <a
                target="_blank"
                :href="user.contacts.site"
                v-if="user.contacts.site"
                class="right"
                >{{
                  user.contacts.site.split("/")[
                    user.contacts.site.split("/").length - 1
                  ]
                }}</a
              >
              <span v-else class="right">Не указано</span>
            </li>
            <li class="collection-item">
              LinkedIn:
              <a
                target="_blank"
                :href="user.contacts.linkedIn"
                v-if="user.contacts.linkedIn"
                class="right"
                >{{
                  user.contacts.linkedIn.split("/")[
                    user.contacts.linkedIn.split("/").length - 1
                  ]
                }}</a
              >
              <span v-else class="right">Не указано</span>
            </li>
            <li class="collection-item">
              Facebook:
              <a
                target="_blank"
                :href="user.contacts.facebook"
                v-if="user.contacts.facebook"
                class="right"
                >{{
                  user.contacts.facebook.split("/")[
                    user.contacts.facebook.split("/").length - 1
                  ]
                }}</a
              >
              <span v-else class="right">Не указано</span>
            </li>
            <li class="collection-item">
              E-mail:
              <a
                target="_blank"
                :href="'mailto:' + user.contacts.email"
                v-if="user.contacts.email"
                class="right"
                >{{
                  user.contacts.email.split("/")[
                    user.contacts.email.split("/").length - 1
                  ]
                }}</a
              >
              <span v-else class="right">Не указано</span>
            </li>
            <li class="collection-item">
              GitHub:
              <a
                target="_blank"
                :href="user.contacts.github"
                v-if="user.contacts.github"
                class="right"
                >{{
                  user.contacts.github.split("/")[
                    user.contacts.github.split("/").length - 1
                  ]
                }}</a
              >
              <span v-else class="right">Не указано</span>
            </li>
          </ul>
          <ul class="collapsible">
            <li class="active">
              <div class="collapsible-header">
                <div>
                  <img src="../../../assets/icons/showFriends.png" alt="" />
                  <span>Список друзей</span>
                </div>
                <span class="badge-up">{{ user.lists.friends.length }}</span>
              </div>
              <div
                class="collapsible-body"
                v-if="user.lists.friends.length > 0"
              >
                <ul class="collection">
                  <li
                    v-for="user in myFriends"
                    v-bind:key="user.id"
                    class="collection-item card-flex"
                  >
                    <span>{{ user.profile }}</span>
                    <router-link
                      class="btn"
                      :to="{
                        name: 'user',
                        params: { user: user.id }
                      }"
                      >Открыть</router-link
                    >
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <div class="collapsible-header">
                <div>
                  <img src="../../../assets/icons/showArticles.png" alt="" />
                  <span>Список статей</span>
                </div>
                <span class="badge-up">{{ user.lists.articles.length }}</span>
              </div>
              <div
                class="collapsible-body"
                v-if="user.lists.articles.length > 0"
              >
                <ul class="collection">
                  <li
                    v-for="article in myArticles"
                    v-bind:key="article.id"
                    class="collection-item card-flex"
                  >
                    <span>{{ article.name }}</span>
                    <router-link
                      class="btn"
                      :to="{
                        name: 'article',
                        params: { article: article.id }
                      }"
                      >Открыть</router-link
                    >
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <div class="collapsible-header">
                <div>
                  <img src="../../../assets/icons/showGitHub.png" alt="" />
                  <span>Список репозиториев</span>
                </div>
                <span class="badge-up">{{
                  user.lists.repositories.length
                }}</span>
              </div>
              <div
                class="collapsible-body"
                v-if="user.lists.repositories.length > 0"
              >
                <ul class="collection">
                  <li
                    v-for="repository in myRepositories"
                    v-bind:key="repository.id"
                    class="collection-item card-flex"
                  >
                    <span>{{ repository.name }}</span>
                    <router-link
                      class="btn"
                      :to="{
                        name: 'repository',
                        params: { repository: repository.id }
                      }"
                      >Открыть</router-link
                    >
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div v-else>Что то не так</div>
    </div>
    <Loader v-else />
  </div>
</template>

<script>
import Loader from "../../../components/Loader";
import M from "materialize-css/dist/js/materialize.min";

export default {
  name: "User",
  components: { Loader },
  data() {
    return {
      loading: false,
      myArticles: [],
      myFriends: [],
      myRepositories: [],
      gitHubInfo: ""
    };
  },
  async mounted() {
    this.user = await this.$store.dispatch(
      "fetchUserById",
      this.$route.params.user
    );
    // Fetching user Articles
    const allArticles = await this.$store.dispatch("fetchAllArticles");
    let myArticles = [];
    for (let f of this.user.lists.articles) {
      let article = allArticles[f];
      article.id = f;
      myArticles.push(article);
    }
    this.myArticles = myArticles;
    // Fetching user Friends
    const users = await this.$store.dispatch("fetchAllUsers");
    let myFriends = [];
    for (let i of this.user.lists.friends) {
      let user = users[i];
      myFriends.push(user);
    }
    this.myFriends = myFriends;
    // Fetching user Repositories
    const allRepositories = await this.$store.dispatch("fetchAllRepositories");
    let myRepositories = [];
    for (let f of this.user.lists.repositories) {
      let repository = allRepositories[f];
      repository.id = f;
      myRepositories.push(repository);
    }
    this.myRepositories = myRepositories;
    // Fetching GitHub info
    if (this.user.contacts.github) {
      let gitHubName = this.user.contacts.github.split("/")[
        this.user.contacts.github.split("/").length - 1
      ];
      let fetchGithub = await fetch(
        `https://api.github.com/users/${gitHubName}`
      );
      this.gitHubInfo = await fetchGithub.json();
    }
    this.loading = true;
  },
  updated() {
    M.Collapsible.init(document.querySelectorAll(".collapsible"));
  }
};
</script>

<style scoped lang="sass">
.grid
  grid-template-rows: 72px 1fr 1fr 1fr
  grid-template-areas: 'head head head head head head' 'sec1 sec1 sec2 sec2 sec3 sec3' 'sec1 sec1 sec2 sec2 sec3 sec3' 'sec1 sec1 sec2 sec2 sec3 sec3'
  @media screen and (max-width: 1150px)
    grid-template-areas: 'head head head head head head' 'sec1 sec1 sec1 sec3 sec3 sec3' 'sec2 sec2 sec2 sec2 sec2 sec2'
    grid-template-rows: 72px 1fr 1fr
  @media screen and (max-width: 740px)
    grid-template-areas: 'head head head head head head' 'sec1 sec1 sec1 sec1 sec1 sec1' 'sec2 sec2 sec2 sec2 sec2 sec2' 'sec3 sec3 sec3 sec3 sec3 sec3'
.badge-up
  margin-left: 10px !important
  padding: 1px 5px
  text-align: center
  border: 1px solid black
  border-radius: 2px
  background-color: aquamarine
.section-1, .section-2, .section-3
  padding: 10px 10px !important
h5
  margin: 0 !important
.collection-item
  padding: 7px 30px !important

.card
  .card-image
    padding: 10px
    img
      margin: 0 auto
      max-height: 250px
      max-width: 250px




.collapsible
  .collapsible-header
    display: flex
    justify-content: space-between
    align-items: center
    div
      display: flex
      justify-content: center
      align-items: center
      img
        height: 20px
        margin-right: 10px

  .collapsible-body
    padding: 5px
    .card-flex
      display: flex
      flex-direction: row
      justify-content: space-between
      align-items: center
      padding: 5px 20px !important
      .btn
        height: 20px
        padding: 0 10px !important
        line-height: 18px
</style>
