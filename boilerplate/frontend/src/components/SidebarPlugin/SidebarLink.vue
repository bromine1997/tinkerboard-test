<template>
  <li class="nav-item">
    <component :is="tag" class="nav-link" v-bind="$attrs" @click.native="hideSidebar">
      <slot>
        <i v-if="icon" :class="icon"></i>
        <p>{{ name }}</p>
      </slot>
    </component>
  </li>
</template>

<script>
export default {
  name: 'sidebar-link',
  inheritAttrs: false,
  inject: ['autoClose', 'addLink', 'removeLink'],
  props: {
    name: String,
    icon: String,
    tag: {
      type: String,
      default: 'router-link',
    },
  },
  methods: {
    hideSidebar() {
      if (this.autoClose) {
        this.$emit('hideSidebar');
      }
    },
    isActive() {
      return this.$el?.classList.contains('active');
    },
  },
  mounted() {
    if (this.addLink) {
      this.addLink(this);
    }
  },
  unmounted() {
    if (this.removeLink) {
      this.removeLink(this);
    }
  },
};
</script>
<style></style>
