import { IconButton } from "@chakra-ui/react";
import React from "react";
import { useAppDispatch, useAppSelector } from "redux/store";
import { BookmarkIcon as BookmarkIconOutline } from "@heroicons/react/24/outline";
import { BookmarkIcon } from "@heroicons/react/24/solid";
import {
  addToReadingList,
  removeFromReadingList,
} from "redux/slices/userThunk";
import { useUser } from "@supabase/auth-helpers-react";

function ToggleReadingList({ postSlug }: { postSlug: string }) {
  const readingList = useAppSelector((state) => state.user.readingList);
  const dispatch = useAppDispatch();
  const { user } = useUser();

  if (user === null) return null;
  else if (readingList.includes(postSlug)) {
    return (
      <IconButton
        size="sm"
        variant="ghost"
        color="gray.600"
        aria-label="Remove from reading list"
        icon={<BookmarkIcon style={{ height: "1.1rem" }} />}
        onClick={() => dispatch(removeFromReadingList(postSlug))}
      />
    );
  } else {
    return (
      <IconButton
        size="sm"
        variant="ghost"
        color="gray.600"
        aria-label="Add to reading list"
        icon={<BookmarkIconOutline style={{ height: "1.1rem" }} />}
        onClick={() => dispatch(addToReadingList(postSlug))}
      />
    );
  }
}

export default ToggleReadingList;
