"use client";

import SegmentedControl from "./ui/segmented-control";
import type { PostView } from "@/types/post";
import { SquareIcon, RowIcon } from "./icons";

type PostViewTypeControlProps = {
  view: PostView;
  onViewChange: (selected: PostView) => void;
};

export default function PostViewTypeControl({
  view,
  onViewChange,
}: PostViewTypeControlProps) {
  const options = [
    { value: "list", iconName: RowIcon },
    { value: "card", iconName: SquareIcon },
  ];

  const handleViewTypeChange = (selected: string) => {
    if (selected === "list" || selected === "card") {
      onViewChange(selected as PostView);
    }
  };

  return (
    <SegmentedControl
      options={options}
      onChange={handleViewTypeChange}
      value={view}
      ariaLabel="post-view-type-control"
    />
  );
}
