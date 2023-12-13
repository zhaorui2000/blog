import { persistentAtom } from '@nanostores/persistent';
import { atom, onSet } from 'nanostores';
import { produce } from 'immer';

export const $progressGroup = persistentAtom('progressGroup', [], {
  encode(value) {
    return JSON.stringify(value);
  },
  decode(value) {
    return JSON.parse(value);
  },
  listen: false,
});

export const $groupIndex = persistentAtom('groupIndex', 0);

export const $progressList = atom([]);

export const $isShowEdit = atom(false);
export const $isShowAddMinute = atom(false);
export const $editIndex = atom(-1);

/* ----------------------------------------------------------------------------------------------------
更新列表项同时更新 store 中的 progressGroup
---------------------------------------------------------------------------------------------------- */
onSet($progressList, ({ newValue, abort }) => {
  $progressGroup.set(
    produce($progressGroup.get(), (draft) => {
      const index = $groupIndex.get();
      return [
        ...draft.slice(0, index),
        {
          title: draft[index]?.title ?? '未命名',
          value: newValue,
        },
        ...draft.slice(index + 1),
      ];
    }),
  );
});
