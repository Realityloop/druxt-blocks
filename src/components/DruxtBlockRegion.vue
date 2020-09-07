<template>
  <component :is="component">
    <!-- Render blocks in their own named slots. --->
    <template
      v-for="block of blocks"
      v-slot:[block.attributes.drupal_internal__id]
    >
      <druxt-block
        :key="block.id"
        :uuid="block.id"
        :type="block.type"
      />
    </template>

    <!-- Render all blocks in the default slot. -->
    <template>
      <druxt-block
        v-for="block of blocks"
        :key="block.id"
        :uuid="block.id"
        :type="block.type"
      />
    </template>
  </component>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { DrupalJsonApiParams } from 'drupal-jsonapi-params'

import { DruxtEntityComponentSuggestionMixin } from 'druxt-entity'

/**
 * The `<druxt-block-region />` Vue.js component.
 *
 * - Loads all JSON:API Block resources for a region/theme via the Druxt.js Router module.
 * - Uses the DruxtBlock component to render individual resources, ordered by weight.
 * - Renders the data via the Component Suggestion system.
 *
 * @example
 * <druxt-block-region
 *   name="header"
 *   theme="umami"
 * />
 *
 * @todo {@link https://github.com/druxt/druxt-blocks/issues/25|Add documentation, tests and examples for slots.}
 */
export default {
  name: 'DruxtBlockRegion',

  /**
   * Vue.js Mixins.
   *
   * @see {@link https://entity.druxtjs.org/api/mixins/componentSuggestion.html|DruxtEntityComponentSuggestionMixin}
   */
  mixins: [DruxtEntityComponentSuggestionMixin],

  /**
   * Vue.js Properties.
   *
   * @see {@link https://vuejs.org/v2/guide/components-props.html}
   */
  props: {
    /**
     * Region name.
     *
     * @type {string}
     * @default content
     */
    name: {
      type: String,
      default: 'content'
    },

    /**
     * Drupal theme.
     *
     * @type {string}
     */
    theme: {
      type: String,
      required: true
    },
  },

  /**
   * Nuxt.js fetch method.
   */
  async fetch() {
    await this.fetch()
  },

  /**
   * Vue.js Data object.
   *
   * Used for on-demand JSON:API resource loading.
   *
   * @property {objects[]} blocks - The Block JSON:API resources.
   */
  data: () => ({
    blocks: []
  }),

  /**
   * Vue.js Computed properties.
   *
   * @vue-computed {object} route The current Route.
   */
  computed: {
    /**
     * Default suggestions for the Component suggestion mixin.
     *
     * - **[Prefix][Region][Theme]**
     * - **[Prefix][Region]**
     *
     * @type {object[]}
     *
     * @see {@link https://entity.druxtjs.org/api/mixins/componentSuggestion.html.html|DruxtEntityComponentSuggestionMixin}
     *
     * @example @lang vue
     * <druxt-block-region
     *   name="header"
     *   theme="umami"
     * />
     * <!--
     * Suggestions to be rendered by the DruxtBlockRegion component:
     *   - DruxtBlockRegionHeaderUmami
     *   - DruxtBlockRegionHeader
     * -->
     */
    suggestionDefaults() {
      if (!this.tokens) return []

      return [
        // e.g. DruxtBlockRegionHeaderUmami
        { value: this.tokens.prefix + this.tokens.region + this.tokens.theme },
        // e.g. DruxtBlockRegionHeader
        { value: this.tokens.prefix + this.tokens.region },
      ]
    },

    /**
     * Tokens for the Component suggestion mixin.
     *
     * - prefix
     * - region
     * - theme
     *
     * @type {boolean|object}
     *
     * @see {@link https://entity.druxtjs.org/api/mixins/componentSuggestion.html.html|DruxtEntityComponentSuggestionMixin}
     */
    tokens() {
      return {
        prefix: 'DruxtBlockRegion',
        region: this.suggest(this.name),
        theme: this.suggest(this.theme)
      }
    },

    /**
     * Token type for DruxtEntityComponentSuggestionMixin.
     *
     * @type {string}
     * @default block-region
     *
     * @see {@link https://entity.druxtjs.org/api/mixins/componentSuggestion.html.html|DruxtEntityComponentSuggestionMixin}
     */
    tokenType: () => 'block-region',

    ...mapState('druxtRouter', {
      route: state => state.route
    })
  },

  /**
   * Nuxt.js watch property.
   */
  watch: {
    /**
     * Updates blocks on Route change.
     */
    $route: function() {
      this.fetch()
    }
  },

  created() {
    // Workaround for Vuepress docs.
    if (!this.blocks.length) {
      this.fetch()
    }
  },

  methods: {
    /**
     * Fetch requested blocks from Druxt.js Router.
     */
    async fetch() {
      const query = new DrupalJsonApiParams()
      query
        .addFilter('region', this.name)
        .addFilter('status', '1')
        .addFilter('theme', this.theme)
        .addGroup('visibility', 'OR')
        .addFilter('visibility.request_path', null, 'IS NULL', 'visibility')

      query.addGroup('pages', 'AND', 'visibility')
        .addFilter('visibility.request_path.pages', this.route.resolvedPath, 'CONTAINS', 'pages')
        .addFilter('visibility.request_path.negate', 0, '=', 'pages')

      query.addGroup('front', 'AND', 'visibility')
        .addFilter('visibility.request_path.pages', '<front>', 'CONTAINS', 'front')
        .addFilter('visibility.request_path.negate', this.route.isHomePath ? 0 : 1, '=', 'front')

      const options = {
        headers: { 'Druxt-Request-Path': this.$store.state.druxtRouter.route.resolvedPath }
      }

      this.blocks = await this.getResources({ resource: 'block--block', query })
    },

    /**
     * Maps `druxtRouter/getResources` Vuex action to `this.getResources`.
     */
    ...mapActions({
      getResources: 'druxtRouter/getResources'
    })
  }
}
</script>