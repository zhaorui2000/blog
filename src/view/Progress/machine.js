import { createMachine } from 'xstate';

export const machine = createMachine(
  {
    id: 'task',
    initial: 'todo',
    states: {
      todo: {
        always: {
          target: 'doing',
          cond: 'didStart',
        },
        on: {
          START: {
            target: 'doing',
            actions: ['onStart'],
          },
          FINISH: {
            target: 'done',
            actions: ['onFinish'],
          },
          RESET: {
            target: 'todo',
          },
        },
      },
      doing: {
        always: {
          target: 'done',
          cond: 'didFinish',
        },
        on: {
          FINISH: {
            target: 'done',
            actions: ['onFinish'],
          },
          START: {
            target: 'todo',
            actions: ['onReStart'],
          },
          RESET: {
            target: 'todo',
          },
        },
      },
      done: {
        on: {
          FINISH: {
            target: 'done',
          },
          START: {
            target: 'todo',
            actions: ['onReStart'],
          },
          RESET: {
            target: 'todo',
          },
        },
      },
    },
    predictableActionArguments: true,
    preserveActionOrder: true,
  },
  {
    actions: {
      onReStart: function () {},
      onStart: function () {},
    },
    services: {},
    guards: {
      didStart: (context, event) => {
        return false;
      },
      didFinish: (context, event) => {
        return false;
      },
    },
    delays: {},
  },
);
