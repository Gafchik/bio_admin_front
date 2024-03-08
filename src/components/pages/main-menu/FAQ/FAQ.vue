<script setup>
import { useFaqStore } from '@/store/pages/FAQ/faq-store.js'
import { storeToRefs } from 'pinia'
import {useI18n} from "vue-i18n";
const {t} = useI18n()
const faqStore = useFaqStore()
const {getFaq,selectCategory} = faqStore
const {category,question,selectedCategoryId} = storeToRefs(faqStore)
const TRANC_PREFIX = 'pages.faq'
getFaq();

</script>

<template>
  <div>
    <div v-if="!category.length">
      <h1>Сорян мы не успели перевести на это локаль =)</h1>
    </div>
    <div v-else>
      <div :class="{'flex-column': $q.platform.is.mobile, 'row wrap q-mt-lg': !$q.platform.is.mobile}">
        <div class="col-4 q-px-lg q-mb-lg">
          <div class="text-center text-bold q-mx-lg-md">
            {{t(`${TRANC_PREFIX}.select_section`)}}
          </div>
          <div v-for="(value,key) in category"
               class="my-card text-light-green-8 text-center text-bold"
          >
            <q-btn @click="selectCategory(value.faq_category_id)"
                   :disable="selectedCategoryId === value.faq_category_id"
                  text
                  text-color="light-green-8"
                  class="full-width"
                  :label="value.name" />
          </div>
        </div>
        <div class="col-8 q-px-lg">
          <q-expansion-item v-for="value in question"
                            expand-separator
                            class="q-mb-lg bg-grey-2"
                            icon="question_mark"
                            :label="value.question"
                            header-class="text-light-green-8 text-start text-bold"
          >
            <q-card>
              <q-card-section v-html="value.answer"/>
            </q-card>
          </q-expansion-item>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.q-btn:before {
  box-shadow: none !important;
}
</style>