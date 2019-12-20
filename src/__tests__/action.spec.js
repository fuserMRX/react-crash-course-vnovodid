import { userLoaded } from '../rootReducer';


describe('actions', () => {
    it('should return correct action', () => {
        const action = userLoaded({ user: 'activeUser'});

        expect(action).toMatchSnapshot();
    })
})