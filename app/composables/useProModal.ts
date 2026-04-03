const createSharedComposable = () => {
    const isOpen = ref(true)

    const toggleModalState = (modalState: boolean) => {
        isOpen.value = modalState
    }

    return {
        isOpen,
        toggleModalState
    }
}

export default createSharedComposable