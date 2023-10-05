<template>
  <div class="">
    <div class="sidebar w-64 absolute shadow-md">
      <div class="text-3xl font-bold drop-shadow-lg text-center pt-10 pb-10">
        <a href="/admin/supplier" class="pt-6 pb-6 primary-color">
          <font-awesome-icon :icon="['fas', 'weight-scale']" /> Truck Scale</a
        >
      </div>
      <hr />

      <div class="pt-6">
        <ul>
          <!-- RENDER MODULE -->
          <li
            class="li-sidebar pb-3 text-base hover:drop-shadow-md font-bold"
            v-for="item in moduleList"
          >
            <font-awesome-icon class="pr-3" :icon="['fas', `${item.icon}`]" />{{
              item.module
            }}
            <Transition name="slide-fade">
              <div class="pt-4 pl-4" v-if="item.selected">
                <!-- RENDER SUB-MODULE -->
                <li
                  v-for="(itemSubModule, index) in item.subModules"
                  :class="
                    itemSubModule.selected
                      ? getStyleForSelectedSubmod
                      : getDefaultStyleSubmod
                  "
                  @click="onClickSubModule(item, itemSubModule, index)"
                >
                  <font-awesome-icon
                    class="pr-3"
                    :icon="['fas', `${itemSubModule.icon}`]"
                  />
                  {{ itemSubModule.subModule }}
                </li>
              </div>
            </Transition>
          </li>
        </ul>
      </div>
    </div>

    <nuxt />
  </div>
</template>

<script>
export default {
  data() {
    return {
      moduleList: [
        {
          module: "Admin",
          subModules: [
            { subModule: "Supplier", selected: true, icon: "fa-truck-field" },
            { subModule: "Items", selected: false, icon: "fa-cart-flatbed" },
            { subModule: "Drivers", selected: false, icon: "fa-wheelchair" },
            { subModule: "Users", selected: false, icon: "fa-user" },
          ],
          icon: "user",
          selected: true,
        },
        {
          module: "Transaction",
          subModules: [],
          icon: "fa-tent-arrow-left-right",
          selected: true,
        },
      ],
    };
  },

  methods: {
    onClickSubModule(module, subModule, index) {
      module.subModules.forEach((val, subIndex) => {
        if (subIndex != index) {
          val.selected = false;
        }
      });
      subModule.selected = true;
    },
  },

  computed: {
    getDefaultStyleSubmod() {
      return "pb-2 pt-2 pl-4 text-base hover:drop-shadow-md li-border_left font-normal";
    },
    getStyleForSelectedSubmod() {
      return "pb-2 pt-2 pl-4 text-base hover:drop-shadow-md li-border_left--active primary-color font-semibold";
    },
  },
};
</script>

<style scope lang="scss">
.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  height: 200vh;
  color: black;
  background-color: whitesmoke;
}

li {
  cursor: pointer;
}

.li-sidebar {
  padding: 10px 30px;
}
.li-border_left {
  border-left: 1px solid gray;

  &:hover {
    border-left: 1px solid #ca8a04;
  }
}

.li-border_left--active {
  border-left: 1px solid #ca8a04;
}
</style>
