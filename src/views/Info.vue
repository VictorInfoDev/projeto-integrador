<template>
  <v-app>
      <div class="pa-10">
        <v-row>
          <v-col>
            <v-card class="pa-5" outlined>
            <v-card-title>Nome da empresa</v-card-title>
            <v-card-subtitle>empresaemail@gmail.com</v-card-subtitle>
            <v-card-text><b>CNPJ:</b>12345678901</v-card-text>
            <v-divider></v-divider>
            <v-card
              class="text-center"
              color="white"
              outlined
            >
              <v-card-text>
                <div class="text-h4 black--text">
                  Últimas vendas
                </div>
              </v-card-text>
              <v-card-text>
                <v-sheet color="white" rounded>
                  <v-sparkline
                    :value="value"
                    color="black"
                    height="100"
                    padding="24"
                    stroke-linecap="round"
                    smooth
                  >
                    <template v-slot:label="item">
                      R${{ item.value }}
                    </template>
                  </v-sparkline>
                </v-sheet>
              </v-card-text>
            </v-card>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6"><v-card class="pa-5" outlined>
            <v-card-title>Histórico de vendas</v-card-title>
              <v-simple-table
                fixed-header
                height="425px"
              >
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">
                        Name
                      </th>
                      <th class="text-left">
                        Calories
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="item in desserts"
                      :key="item.name"
                    >
                      <td>{{ item.name }}</td>
                      <td>{{ item.calories }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
          </v-card></v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card class="pa-5" outlined>
            <v-toolbar class="mt-5" color="cyan" dark flat>
              <template v-slot:extension>
                <v-tabs
                  v-model="tab"
                  align-with-title
                >
                  <v-tabs-slider color="yellow"></v-tabs-slider>

                  <v-tab
                    v-for="item in items"
                    :key="item"
                  >
                    {{ item }}
                  </v-tab>
                </v-tabs>
              </template>
            </v-toolbar>
    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item"
      >
        <v-card flat>
          <v-card-text v-text="text"></v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
            </v-card>
          </v-col>
        </v-row>


      </div>
  </v-app>
</template>

<script>
export default {
    data () {
      return {
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
          },
          {
            name: 'Eclair',
            calories: 262,
          },
          {
            name: 'Cupcake',
            calories: 305,
          },
          {
            name: 'Gingerbread',
            calories: 356,
          },
          {
            name: 'Jelly bean',
            calories: 375,
          },
          {
            name: 'Lollipop',
            calories: 392,
          },
          {
            name: 'Honeycomb',
            calories: 408,
          },
          {
            name: 'Donut',
            calories: 452,
          },
          {
            name: 'KitKat',
            calories: 518,
          },
          {
            name: 'Gingerbread',
            calories: 356,
          },
          {
            name: 'Jelly bean',
            calories: 375,
          },
          {
            name: 'Lollipop',
            calories: 392,
          },
          {
            name: 'Honeycomb',
            calories: 408,
          },
          {
            name: 'Donut',
            calories: 452,
          },
          {
            name: 'KitKat',
            calories: 518,
          },
        ],
        value: [
        423,
        446,
        675,
        510,
        590,
        610,
        760,
          ],
        tab: null,
        items: [
          'web', 'shopping', 'videos', 'images', 'news',
        ],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      }
    },
}
</script>

<style>

</style>
