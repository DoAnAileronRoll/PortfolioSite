
interface ButtonProps{
    children: string;
    onClick: () => void;
    color?: 'primary' | 'secondary' | 'success';
}

const Button = ({children, onClick, color = 'primary'}:ButtonProps) => {
  return (
    <button 
    type="button" 
    className={"btn btn-outline-"+color}
    onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
