type Props = {
  children: React.ReactNode;
  onClick: () => void;
  containerStyle?: React.CSSProperties;
};

export default function Button({ children, onClick, containerStyle }: Props) {
  return (
    <button style={containerStyle} className="p-2 text-[11px] text-white rounded cursor-pointer  font-semibold" onClick={onClick}>
      {children}
    </button>
  );
}
