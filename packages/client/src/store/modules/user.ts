export const useUserStore = defineStore('user', () => {
  const state = ref({
    token: '',
  })

  const getToken = computed(() => {
    return state.value.token
  })

  return {
    getToken,
  }
})
