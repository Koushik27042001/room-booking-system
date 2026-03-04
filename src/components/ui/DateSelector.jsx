function DateSelector({ value, onChange }) {
  return (
    <input
      type="date"
      value={value}
      onChange={onChange}
      className="border rounded px-2 py-1 w-full"
    />
  );
}

export default DateSelector;
