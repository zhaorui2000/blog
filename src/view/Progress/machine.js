import { createMachine } from 'xstate';

export const machine = createMachine(
  {
    id: 'todo',
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
          CANCEL: {
            target: 'done',
            actions: ['onCancel'],
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
          CANCEL: {
            target: 'done',
            actions: ['onCancel'],
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
          CANCEL: {
            target: 'done',
            actions: ['onCancel'],
          },
        },
      },
    },
    predictableActionArguments: true,
    preserveActionOrder: true,
  },
  {
    actions: {
      onReStart: function () { },
      onStart: function () { },
      onCancel: function () { },
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
