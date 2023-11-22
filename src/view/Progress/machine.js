import { createMachine, assign } from "xstate";
import { interval, map, take } from "rxjs"
import dayjs from "dayjs"

export const machine = createMachine(
  {
    id: "todo",
    initial: "todo",
    context: { currentTime: 0 },
    states: {
      todo: {
        invoke: {
          src(context, event) {
            return interval(1000).pipe(
              map((value) => ({ type: "UPDATE" })),
            )
          }
        },
        always: [{
          target: "doing",
          cond: "didStart",
        },
        {
          target: "done",
          cond: "didFinish",
        }
        ],
        on: {
          START: {
            target: "doing",
            actions: ["onStart"],
          },
          CANCEL: {
            target: "done",
            actions: ["onCancel"],
          },
          UPDATE: {
            actions: ["update"]
          },
          RESET: {
            target: "todo",
          },
        },
      },
      doing: {
        invoke: {
          src(context, event) {
            return interval(1000).pipe(
              map((value) => ({ type: "UPDATE" })),
            )
          }
        },
        always: {
          target: "done",
          cond: "didFinish",
        },
        on: {
          FINISH: {
            target: "done",
            actions: ["onFinish"],
          },
          CANCEL: {
            target: "done",
            actions: ["onCancel"],
          },
          START: {
            target: "todo",
            actions: ["onReStart"],
          },
          RESET: {
            target: "todo",
          },
          UPDATE: {
            actions: ["update"]
          }
        },
      },
      done: {
        always: {
          target: "doing",
          cond: "didStart",
        },
        on: {
          FINISH: {
            target: "done",
          },
          START: {
            target: "todo",
            actions: ["onReStart"],
          },
          RESET: {
            target: "todo",
          },
          CANCEL: {
            target: "done",
            actions: ["onCancel"],
          },
          UPDATE: {
            actions: ["update"]
          }
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
      update: assign({
        currentTime: (context, event) => {
          context.currentTime = +dayjs()
        }
      })
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
  }
);
