import React from "react";

function useMergeState<InitialState>(initialState: InitialState): [InitialState, (any: any) => void] {
    const [value, setValue] = React.useState<InitialState>(initialState);
  
    const mergeState: (any: any) => void = (newState: any) => {
      if (typeof newState === 'function') newState = newState(value);
      setValue({ ...value, ...newState });
    };
  
    return [value, mergeState];
};

  export default useMergeState