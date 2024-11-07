<template>
  <table class="table tablesorter" :class="tableClass">
    <thead :class="theadClasses">
      <tr>
        <slot name="columns">
          <th v-for="column in columns" :key="column.field">{{ column.label }}</th>
        </slot>
      </tr>
    </thead>
    <tbody :class="tbodyClasses">
      <tr v-for="(item, index) in data" :key="index">
        <slot :row="item">
          <template v-for="(column, colIndex) in columns">
            <td :key="colIndex" v-if="hasValue(item, column.field)">
              {{ itemValue(item, column.field) }}
            </td>
          </template>
        </slot>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'base-table',
  props: {
    columns: {
      type: Array,
      default: () => [],
      description: 'Table columns',
    },
    data: {
      type: Array,
      default: () => [],
      description: 'Table data',
    },
    type: {
      type: String, // striped | hover
      default: '',
      description: 'Whether table is striped or hover type',
    },
    theadClasses: {
      type: String,
      default: '',
      description: '<thead> css classes',
    },
    tbodyClasses: {
      type: String,
      default: '',
      description: '<tbody> css classes',
    },
  },
  computed: {
    tableClass() {
      return this.type && `table-${this.type}`;
    },
  },
  methods: {
    hasValue(item, field) {
      return typeof item[field] !== 'undefined';
    },
    itemValue(item, field) {
      return item[field];
    },
  },
};
</script>
