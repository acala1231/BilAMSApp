import { LOADER_START, LOADER_END } from 'constants'


const initialState = {
    isLoading: false
}

function loader(state = initialState, action) {
    switch (action.type) {
        case LOADER_START:
            return {
                isLoading: true,
            }
        case LOADER_END:
            return {
                isLoading: false,
            }
        default:
            return state;
    }
};

export default loader;