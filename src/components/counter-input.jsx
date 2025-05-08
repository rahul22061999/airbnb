import React, { useCallback } from "react";

function counter({ value, onChange }) {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value == 1) {
      return;
    }
    onChange(value - 1);
  }, [onChange, value]);

  return (
    <div>
      <div onClick={onAdd}>+</div>
      <div>{value}</div>
      <div onClick={onReduce}>-</div>
    </div>
  );
}

export default counter;
