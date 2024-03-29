import { createMachine, createActor } from 'xstate';
export default createMachine({
    id: "taskStatus",
    initial: 'UnDo',
    states: {
        UnDo: {
            on: { START: 'Doing' },
        },
        Doing: {
            on: { END: 'Done' },
        },
        Done: {
            on: { START: "Doing", END: "Done" }
        }
    },
})