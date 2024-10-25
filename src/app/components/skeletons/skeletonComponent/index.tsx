import "../skeleton.css";

export default function SkeletonComponent({ type }: { type: string }) {
  const classes = `skeleton ${type}`;
  return <div className={classes}></div>;
}
