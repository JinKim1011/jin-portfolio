"use client";

import SegmentedControl from "./ui/segmented-control";
import type { PostView } from "@/types/post";
import { ViewHorizontalIcon, ViewGridIcon } from "@radix-ui/react-icons";

type PostViewTypeControlProps = {
  view: PostView;
  onViewChange: (selected: PostView) => void;
};

export default function PostViewTypeControl({
  view,
  onViewChange,
}: PostViewTypeControlProps) {
  const options = [
    { value: "list", iconName: ViewHorizontalIcon },
    { value: "card", iconName: ViewGridIcon },
  ];

  const handleThemeChange = (selected: string) => {
    onViewChange(selected as PostView);
  };

  return (
    <SegmentedControl
      options={options}
      onChange={handleThemeChange}
      value={view as PostView}
    />
  );
}
