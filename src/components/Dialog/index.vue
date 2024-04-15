<script lang="ts" setup>
  import { defineAsyncComponent, onBeforeUnmount, onMounted, reactive } from 'vue';
  import useDialog from '~/composables/useDialog';
  import 'animate.css';

  const DialogHistoricCoin = defineAsyncComponent(() => import('./HistoricCoin.vue'));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const componentsInstance: any = {
    DialogHistoricCoin,
  };

  interface ModalProps {
    status: boolean;
    component: string;
    props: object;
  }

  const modal = useDialog();
  const state = reactive({
    isActive: false,
    component: '',
    props: {},
  });

  function handleModalToggle(payload: ModalProps) {
    if (payload.status) {
      state.component = payload.component;
      state.props = payload.props;
    } else {
      state.component = '';
      state.props = {};
    }
    state.isActive = payload.status;
  }
  onMounted(() => {
    modal.listen(handleModalToggle);
  });
  onBeforeUnmount(() => {
    modal.off(handleModalToggle);
  });
</script>

<template>
  <teleport to="body">
    <div
      v-if="state.isActive && componentsInstance[state.component]"
      class="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-slate-800/60"
      @click="handleModalToggle({ status: false, component: '', props: {} })"
    >
      <div @click.stop>
        <div class="flex items-center justify-center">
          <div
            class="animate__animated animate__fadeIn fixed flex min-h-[288px] min-w-[320px] flex-col overflow-hidden rounded-lg bg-slate-100 px-6 py-8"
          >
            <component
              :is="componentsInstance[state.component]"
              :data="state.props"
            />
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>
