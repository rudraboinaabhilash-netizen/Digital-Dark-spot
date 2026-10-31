export default function Tag({ k = "s", style, children }) {
  return <span className={"tag " + k} style={style}>{children}</span>;
}

export const FromSource = () => <Tag k="k">From source</Tag>;
export const Signal = () => <Tag k="s">Rule-based signal</Tag>;
