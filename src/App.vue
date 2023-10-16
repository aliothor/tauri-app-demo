<script setup lang="ts">
import { ref } from "vue";
import { MessagePlugin } from "tdesign-vue-next";

import { checkUpdate, installUpdate } from "@tauri-apps/api/updater";
import { relaunch } from "@tauri-apps/api/process";

import pkg from "../package.json";

const isNeedUpdate = ref(false);
const updateInfo = ref();
const loading = ref(false);
const installing = ref(false);

async function appCheckUpdate() {
  loading.value = true;

  try {
    const { shouldUpdate, manifest } = await checkUpdate();
    console.log(shouldUpdate, manifest);
    isNeedUpdate.value = shouldUpdate;
    updateInfo.value = manifest;

    if (shouldUpdate === false) {
      MessagePlugin.info("当前版本已是最新版本");
    }
  } catch (error) {
    console.error(error);
    MessagePlugin.error("版本更新失败");
  } finally {
    loading.value = false;
  }
}

async function appInstallNewVersion() {
  const e = await MessagePlugin.loading("正在请求新版应用程序安装包...", 0);
  installing.value = true;
  try {
    if (isNeedUpdate.value) {
      await installUpdate();
    }
  } catch (error) {
    console.error(error);
  } finally {
    installing.value = false;
    e.close();
  }
}
</script>

<template>
  <div class="container">
    <h4>Tauri 跨平台自动更新测试(当前版本 {{ pkg.version }})</h4>
    <h4>版本更新信息:{{ updateInfo }}</h4>
  </div>
  <t-space size="24px">
    <t-button theme="primary" @click="appCheckUpdate" :loading="loading">
      <template #icon> <t-icon name="refresh" /></template>
      检查更新
    </t-button>
    <t-button theme="primary" :disabled="!isNeedUpdate" @click="appInstallNewVersion" :loading="installing">
      <template #icon> <t-icon name="download" /></template>
      安装更新
    </t-button>

    <t-button @click="relaunch">
      <template #icon> <t-icon name="download" /></template>
      重启应用
    </t-button>
  </t-space>
</template>

<style>
#app{
  margin-top: 30px;
}
</style>