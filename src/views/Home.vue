<template>
  <div>
    <div v-if="loading">
      <div class="grid" v-if="$store.getters.user.profile">
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
          <div v-if="gitHubInfo" class="card horizontal">
            <div class="card-image">
              <img v-bind:src="gitHubInfo.avatar_url" />
            </div>
            <div class="card-stacked">
              <div class="card-content">
                <div class="btn-group">
                  <h5 class="center">GitHub</h5>
                  <a
                    target="_blank"
                    v-bind:href="gitHubInfo.html_url"
                    class="btn"
                    >Профиль</a
                  >
                  <a
                    target="_blank"
                    v-bind:href="gitHubInfo.html_followers"
                    class="btn"
                    >Последователи <span>{{ gitHubInfo.followers }}</span></a
                  >
                  <a
                    target="_blank"
                    v-bind:href="gitHubInfo.html_following"
                    class="btn"
                    >Сдедующие <span>{{ gitHubInfo.following }}</span></a
                  >
                  <a
                    target="_blank"
                    v-bind:href="gitHubInfo.html_repositories"
                    class="btn"
                    >Репозитории <span>{{ gitHubInfo.public_repos }}</span></a
                  >
                </div>
              </div>
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
          <ul class="collection with-header">
            <li class="collection-header"><h5>Контакты:</h5></li>
            <li class="collection-item">
              Телефон:
              <span v-if="user.contacts.phone" class="right">{{
                user.contacts.phone
              }}</span>
              <span v-else class="right">Не указано</span>
            </li>
            <li class="collection-item">
              Сайт визитка:
              <span v-if="user.contacts.site" class="right">{{
                user.contacts.site
              }}</span>
              <span v-else class="right">Не указано</span>
            </li>
            <li class="collection-item">
              LinkedIn:
              <span v-if="user.contacts.linkedIn" class="right">{{
                user.contacts.linkedIn
              }}</span>
              <span v-else class="right">Не указано</span>
            </li>
            <li class="collection-item">
              Facebook:
              <span v-if="user.contacts.facebook" class="right">{{
                user.contacts.facebook
              }}</span>
              <span v-else class="right">Не указано</span>
            </li>
            <li class="collection-item">
              E-mail:
              <span v-if="user.contacts.email" class="right">{{
                user.contacts.email
              }}</span>
              <span v-else class="right">Не указано</span>
            </li>
            <li class="collection-item">
              GitHub:
              <span v-if="user.contacts.github" class="right">{{
                user.contacts.github
              }}</span>
              <span v-else class="right">Не указано</span>
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
          <div class="card">
            <div class="card-image">
              <img src="../assets/friends.jpeg" />
            </div>
            <div class="card-content">
              <button
                class="btn activator hide-show"
                v-if="user.lists.friends.length > 0"
              >
                Ваши контакты
                <span>{{ user.lists.friends.length }}</span>
              </button>
              <button class="btn hide-show" v-else>
                У вас нет контактов. Добавить?
              </button>
            </div>
            <div class="card-reveal">
              <button class="card-title btn hide-show">Скрыть</button>
              <div class="collection">
                <li
                  v-for="user in myFriends"
                  v-bind:key="user.id"
                  class="collection-item card-flex"
                >
                  <span>{{ user.profile }}</span>
                  <button class="btn">Открыть</button>
                </li>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-image">
              <img src="../assets/articles.jpg" />
            </div>
            <div class="card-content">
              <button
                class="btn activator hide-show"
                v-if="user.lists.articles.length > 0"
              >
                Ваши статьи
                <span>{{ user.lists.articles.length }}</span>
              </button>
              <button class="btn hide-show" v-else>
                У вас нет статей. Добавить?
              </button>
            </div>
            <div class="card-reveal">
              <button class="card-title btn hide-show">Скрыть</button>
              <div class="collection">
                <li
                  v-for="article in myArticles"
                  v-bind:key="article.id"
                  class="collection-item card-flex"
                >
                  <span>{{ article.name }}</span>
                  <button class="btn">Открыть</button>
                </li>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-image">
              <img src="../assets/repositories.png" />
            </div>
            <div class="card-content">
              <button
                class="btn activator hide-show"
                v-if="user.lists.repositories.length > 0"
              >
                Ваши статьи
                <span>{{ user.lists.repositories.length }}</span>
              </button>
              <button class="btn hide-show" v-else>
                У вас нет статей. Добавить?
              </button>
            </div>
            <div class="card-reveal">
              <button class="card-title btn hide-show">Скрыть</button>
              <div class="collection">
                <li
                  v-for="repository in myRepositories"
                  v-bind:key="repository.id"
                  class="collection-item card-flex"
                >
                  <span>{{ repository.name }}</span>
                  <button class="btn">Открыть</button>
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Loader v-else />
  </div>
</template>

<script>
import Loader from "../components/Loader";
export default {
  name: "home",
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
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  async mounted() {
    await this.$store.dispatch("fetchUser");
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
      this.gitHubInfo.html_repositories = `${this.gitHubInfo.html_url}?tab=repositories`;
      this.gitHubInfo.html_followers = `${this.gitHubInfo.html_url}?tab=followers`;
      this.gitHubInfo.html_following = `${this.gitHubInfo.html_url}?tab=following`;
      console.log(this.gitHubInfo);
    }

    this.loading = true;
  }
};
</script>
<style scoped lang="sass">
.grid
  grid-template-rows: 50px 1fr 1fr 1fr
  grid-template-areas: 'head head head head head head' 'sec1 sec1 sec2 sec2 sec3 sec3' 'sec1 sec1 sec2 sec2 sec3 sec3' 'sec1 sec1 sec2 sec2 sec3 sec3'
  @media screen and (max-width: 1150px)
    grid-template-areas: 'head head head head head head' 'sec1 sec1 sec1 sec3 sec3 sec3' 'sec2 sec2 sec2 sec2 sec2 sec2'
    grid-template-rows: 50px 1fr 1fr
  @media screen and (max-width: 740px)
    grid-template-areas: 'head head head head head head' 'sec1 sec1 sec1 sec1 sec1 sec1' 'sec2 sec2 sec2 sec2 sec2 sec2' 'sec3 sec3 sec3 sec3 sec3 sec3'
.badge-up
  margin-left: 10px !important
  width: 60px !important
  text-align: center
  border: 1px solid black
  border-radius: 2px
  background-color: aquamarine

.section-3 .card
  height: 235px
  .card-image img
    height: 205px
  .card-reveal, .card-content
    padding: 0 !important
.btn.hide-show
  width: 100%
  height: 30px
  display: flex
  align-items: center
  justify-content: center
  font-family: sans-serif
  font-size: 100%
  line-height: 1.15
  span
    display: inline-block
    background-color: blue
    line-height: 20px
    border: 1px solid black
    border-radius: 2px
    width: 30px
    height: 20px
    margin-left: 10px
.card-flex
  display: flex
  flex-direction: row
  justify-content: space-between
  align-items: center
  padding: 5px 20px !important
  .btn
    height: 20px
    padding: 0 10px !important
    line-height: 10px

.section-1, .section-2, .section-3
  padding: 10px 10px !important
h5
  margin: 0 !important
.collection-item
  padding: 7px 30px !important

.card.horizontal
  img
    width: 100%
    max-width: 220px
  h5
    margin: 10px
  .card-content
    padding: 5px !important
  .btn-group
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    .btn
      width: 100%
      margin: 3px 0
      padding: 0 5px !important
      @media screen and (max-width: 1430px)
        font-size: 12px
      @media screen and (max-width: 1330px)
        font-size: 12px
        height: 30px
      @media screen and (max-width: 450px)
        font-size: 10px
        height: 25px
        line-height: 25px
    span
      display: inline-block
      background-color: blue
      line-height: 15px
      border: 1px solid black
      border-radius: 2px
      width: 18px
      height: 15px
</style>
