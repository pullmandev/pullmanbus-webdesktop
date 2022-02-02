import store from '@/store';
export default function openDialog(dialogType) {
  store.dispatch('SET_SESSION_DIALOG', { type: 'dialogType', dialogType })
  store.dispatch('SET_SESSION_DIALOG', { type: 'open', open: true })
}
