<template>
  <div>
    <DruxtEntity v-bind="propsData" />
  </div>
</template>

<script>
import { DruxtBlocksBlockMixin } from '../../mixins/block'

/**
 * Block Content block.
 *
 * _This component is intended to be rendered by the `<DruxtBlock />` component._
 *
 * - Renders Block Content JSON:API resources via the DruxtEntity component.
 *
 * @example
 * <DruxtBlock
 *   uuid="baefa4d3-9517-4413-8b9e-975c8affb8ac"
 * />
 *
 * @see {@link ../DruxtBlock|DruxtBlock}
 */
export default {
  name: 'DruxtBlockBlockContent',

  /**
   * Vue.js Mixins.
   *
   * @see {@link ../../mixins/DruxtBlocksBlockMixin|DruxtBlocksBlockMixin}
   */
  mixins: [DruxtBlocksBlockMixin],

  /**
   * Vue.js Computed properties.
   */
  computed: {
    /**
     * Properties to pass through to Druxt for the Entity module.
     *
     * @type {object}
     *
     * @see {@link https://druxt.github.io/druxt-entity/api/components/DruxtEntity.html|DruxtEntity}
     */
    propsData() {
      const parts = this.block.attributes.dependencies.content[0].split(':')

      return {
        type: `${parts[0]}--${parts[1]}`,
        uuid: parts[2]
      }
    }
  }
}
</script>
