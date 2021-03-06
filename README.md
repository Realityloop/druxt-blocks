# DruxtJS Blocks

[![CircleCI](https://circleci.com/gh/druxt/druxt-blocks.svg?style=svg)](https://circleci.com/gh/druxt/druxt-blocks)
[![Known Vulnerabilities](https://snyk.io/test/github/druxt/druxt-blocks/badge.svg?targetFile=package.json)](https://snyk.io/test/github/druxt/druxt-blocks?targetFile=package.json)
[![codecov](https://codecov.io/gh/druxt/druxt-blocks/branch/develop/graph/badge.svg)](https://codecov.io/gh/druxt/druxt-blocks)

> Provides Drupal Blocks and Region components to be used within a Druxt (DRUpal nuXT) project.

## Links

- DruxtJS: https://druxtjs.org
- Documentation: https://blocks.druxtjs.org/
- Community Discord server: https://discord.druxtjs.org

## Install

`$ npm install druxt-blocks`

## Usage

Add module to `nuxt.config.js`

```js
module.exports = {
  modules: [
    'druxt-blocks'
  ],
  druxt: {
    baseUrl: 'https://demo-api.druxtjs.org'
  }
}
```

## Options

### Base Druxt options

These options are available to all Druxt modules.

| Option | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `axios` | `object` | No | `{}` | [Axios instance settings](https://github.com/axios/axios#axioscreateconfig). |
| `baseUrl` | `string` | Yes | `null` | Base URL for the Drupal installation. |
| `endpoint` | `string` | No | `/jsonapi` | JSON:API Endpoint of the Drupal installation. |
