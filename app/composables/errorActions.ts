import { FetchError } from 'ofetch';

const {toggleModalState} = useProModal()

export default (error: FetchError) => {
    if (error.statusCode == 403) {
        toggleModalState(true)
    }

    if (error.statusCode == 401) {
        if (tryUseNuxtApp()) {
            navigateTo('/auth/login')
        }
    }
}