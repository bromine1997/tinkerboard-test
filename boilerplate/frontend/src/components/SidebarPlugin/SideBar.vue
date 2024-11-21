<template>
  <div class="sidebar" :data="backgroundColor">
    <div class="sidebar-wrapper" id="style-3">
      <div class="logo">
        <a href="http://www.creative-tim.com" aria-label="sidebar mini logo" class="simple-text logo-mini">
          <div class="logo-img" :class="{ 'logo-img-rtl': $rtl.isRTL }">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQCAMAAAC3Ycb+AAACLlBMVEVMaXFBuIN..."
              alt=""
            />
          </div>
        </a>
        <a href="http://www.creative-tim.com" class="simple-text logo-normal">
          {{ title }}
        </a>
      </div>
      <slot></slot>
      <ul class="nav">
        <slot name="links">
          <sidebar-link
            v-for="(link, index) in sidebarLinks"
            :key="index"
            :to="link.path"
            :name="link.name"
            :icon="link.icon"
          >
          </sidebar-link>
        </slot>
      </ul>
    </div>
  </div>
</template>

<script>
import SidebarLink from './SidebarLink';

export default {
  name: 'Sidebar',
  props: {
    title: {
      type: String,
      default: 'Creative Tim',
    },
    backgroundColor: {
      type: String,
      default: 'vue',
    },
    activeColor: {
      type: String,
      default: 'success',
      validator: (value) => {
        let acceptedValues = ['primary', 'info', 'success', 'warning', 'danger'];
        return acceptedValues.includes(value);
      },
    },
    sidebarLinks: {
      type: Array,
      default: () => [],
    },
    autoClose: {
      type: Boolean,
      default: true,
    },
  },
  provide() {
    return {
      autoClose: this.autoClose,
      addLink: this.addLink,
      removeLink: this.removeLink,
    };
  },
  components: {
    SidebarLink,
  },
  computed: {
    /**
     * Styles to animate the arrow near the current active sidebar link
     * @returns {{transform: string}}
     */
    arrowMovePx() {
      return this.linkHeight * this.activeLinkIndex;
    },
    shortTitle() {
      return this.title
        .split(' ')
        .map((word) => word.charAt(0))
        .join('')
        .toUpperCase();
    },
  },
  data() {
    return {
      linkHeight: 65,
      activeLinkIndex: 0,
      windowWidth: 0,
      isWindows: false,
      hasAutoHeight: false,
      links: [],
    };
  },
  methods: {
    findActiveLink() {
      this.links.forEach((link, index) => {
        if (link.isActive()) {
          this.activeLinkIndex = index;
        }
      });
    },
    addLink(link) {
      const slotLinks = this.$slots.links ? Object.values(this.$slots.links()) : [];
      const index = slotLinks.findIndex((vnode) => vnode === link.$vnode);
      if (index !== -1) {
        this.links.splice(index, 0, link);
      } else {
        this.links.push(link);
      }
    },
    removeLink(link) {
      const index = this.links.indexOf(link);
      if (index > -1) {
        this.links.splice(index, 1);
      }
    },
  },
  mounted() {
    this.$watch(() => this.$route, this.findActiveLink, {
      immediate: true,
    });
  },
};
</script>
