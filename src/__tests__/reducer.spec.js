import { handleChangeColor, userLoadingError, usersReducer, userInterruptLoading, userLoading } from '../rootReducer';

describe('reducer', () => {
    const initialState = {
        data: null,
        error: null,
        color: 'coral',
        loading: false,
    };

    it('should return the same state by default', () => {
        const state = usersReducer(initialState, {type: 'UNKONWN'});
        expect(state).toBe(initialState);
    });

    it('should change color in state', () => {
        const state = usersReducer(initialState, handleChangeColor('green'));
        expect(state.color).toBe('green');
    });

    it('should contain error message', () => {
        const state = usersReducer(initialState, userLoadingError('server error'));
        expect(!!state.error).toBe(true);
    });

    it('should remove all data because of interrupting', () => {
        initialState.data = 'not null';
        const state = usersReducer(initialState, userInterruptLoading());
        expect(state.data).toBe(null);
    });

    it('should indicate load as true', () => {
        const state = usersReducer(initialState, userLoading());
        expect(state.loading).toBe(true);
    })
});