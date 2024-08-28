type HeadingProps = {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  text?: string;
  className?: string;
  color?: string;

  children?: React.ReactNode;
  size?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl";
  weight?:
    | "thin"
    | "extralight"
    | "light"
    | "normal"
    | "medium"
    | "semibold"
    | "bold"
    | "extrabold"
    | "black";
  align?: "left" | "center" | "right" | "justify";
  leading?: "none" | "tight" | "snug" | "normal" | "relaxed" | "loose";
};

const Heading: React.FC<HeadingProps> = ({
  level = 1,
  text,
  className = "",
  children,
  color = "text-gray-900",
  size = "4xl",
  weight = "extrabold",
  align = "center",
  leading = "tight",
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag
      className={`font-${weight} text-${size} ${color} text-${align} leading-${leading} ${className} `}
    >
      {children || text}
    </Tag>
  );
};

export default Heading;