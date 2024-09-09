import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface ModalState {
  isOpen: boolean
}

const initialState: ModalState = {
  isOpen: false,
}

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: state => {
      state.isOpen = true
    },
    closeModal: state => {
      state.isOpen = false
    },
  },
})

export const { openModal, closeModal } = modalSlice.actions

export const selectIsOpen = (state: { modal: ModalState }) => state.modal.isOpen

export default modalSlice.reducer
