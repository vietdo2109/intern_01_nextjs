import SkeletonComponent from "../skeletonComponent";
import Shimmer from "../shimmer";
import "../skeleton.css";

export default function SkeletonArticle() {
  return (
    <div className="skeleton-wrapper">
      <div className="skeleton-article">
        <SkeletonComponent type="title" />
        <SkeletonComponent type="text" />
        <SkeletonComponent type="text" />
        <SkeletonComponent type="text" />
      </div>
      <Shimmer />
    </div>
  );
}
