<template>
  <div class="grid" v-if="isCurrectUser">
    <div class="header">
      <span class="badge">Друзья</span>
      <div>
        <input
          placeholder="Placeholder"
          id="first_name"
          type="text"
          class="validate"
        />
        <button class="btn">
          Поиск<img
            class="right ico"
            src="../../assets/icons/search.png"
            alt=""
          />
        </button>
      </div>
    </div>
    <div class="section-1">
      <div class="row">
        <div class="input-field col s12">
          <table class="highlight centered">
            <thead>
              <tr>
                <th>#</th>
                <th>Имя</th>
                <th>Друзья</th>
                <th>Статьи</th>
                <th>GitHub</th>
                <th>Профиль</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>1</td>
                <td>Eclair</td>
                <td>4</td>
                <td>8</td>
                <td>18</td>
                <td><button class="btn">Профиль</button></td>
              </tr>
              <tr>
                <td>1</td>
                <td>Eclair</td>
                <td>4</td>
                <td>8</td>
                <td>18</td>
                <td><button class="btn">Профиль</button></td>
              </tr>
              <tr>
                <td>1</td>
                <td>Eclair</td>
                <td>4</td>
                <td>8</td>
                <td>18</td>
                <td><button class="btn">Профиль</button></td>
              </tr>
              <tr>
                <td>1</td>
                <td>Eclair</td>
                <td>4</td>
                <td>8</td>
                <td>18</td>
                <td><button class="btn">Профиль</button></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col s12 center">
          <ul class="pagination">
            <li class="disabled">
              <a href="#"><i class="material-icons">chevron_left</i></a>
            </li>
            <li class="active"><a href="#">1</a></li>
            <li class="waves-effect"><a href="#">2</a></li>
            <li class="waves-effect"><a href="#">3</a></li>
            <li class="waves-effect"><a href="#">4</a></li>
            <li class="waves-effect"><a href="#">5</a></li>
            <li class="waves-effect">
              <a href="#"><i class="material-icons">chevron_right</i></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserFriends",
  computed: {
    isCurrectUser() {
      return this.$route.params.user === this.$store.state.user.profile;
    }
  }
};
</script>

<style scoped lang="sass">
.grid
  margin-top: 25px !important
  min-height: 100% !important
  display: grid
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr
  grid-template-rows: 72px 1fr 1fr
  grid-column-gap: 15px
  grid-row-gap: 15px
  grid-template-areas: 'head head head head head head' 'sec1 sec1 sec1 sec1 sec1 sec1' 'sec1 sec1 sec1 sec1 sec1 sec1'
  span
    margin: 0
    padding: 0

.header
  grid-area: head
  padding: 5px 15px
  border: 3px solid #e3e3e3
  border-radius: 5px
  display: flex
  justify-content: space-between
  align-items: center
  div
    display: flex
    input
      display: block
      width: 120px !important
      height: 36px
      margin: 0 10px 0 0
.section-1
  grid-area: sec1
  padding: 15px
  border: 3px solid #e3e3e3
  border-radius: 5px
.row
  margin: 0
.col
  margin: 20px 0
.btn
  margin-left: 5px
img.right
  margin: 7px 0 7px 10px !important
  height: 22px
  @media screen and (max-width: 800px)
    display: none
table
  th, td
    padding: 5px 4px
    height: 47px
    font-size: 11px
    @media screen and (min-width: 900px)
      font-size: 14px
  .btn
    padding: 0 5px
    margin: 0
    height: 25px
    line-height: 25px
    font-size: 11px
    @media screen and (min-width: 900px)
      font-size: 14px
      height: 30px
      line-height: 30px
</style>
