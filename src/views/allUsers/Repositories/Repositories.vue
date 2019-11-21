<template>
  <div class="grid">
    <div class="header">
      <span class="badge">GitHub репозитории</span>
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
        <table class="highlight centered">
          <thead>
            <tr>
              <th>#</th>
              <th>Название</th>
              <th>Оценка</th>
              <th>Профиль</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1</td>
              <td>Eclair</td>
              <td>18</td>
              <td class="flex">
                <button class="btn">
                  <img
                    src="../../../assets/icons/showGitHub.png"
                    alt=""
                  /></button
                ><button class="btn del">
                  <img src="../../../assets/icons/delete.png" alt="" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Repositories"
};
</script>

<style scoped lang="sass">
.grid
  grid-template-rows: 72px 1fr 1fr
  grid-template-areas: 'head head head head head head' 'sec1 sec1 sec1 sec1 sec1 sec1' 'sec1 sec1 sec1 sec1 sec1 sec1'
</style>
