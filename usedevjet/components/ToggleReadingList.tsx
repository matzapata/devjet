import { IconButton } from "@chakra-ui/react";
import React from "react";
import { useAppDispatch, useAppSelector } from "redux/store";
import { BookmarkIcon as BookmarkIconOutline } from "@heroicons/react/24/outline";
import { BookmarkIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { fetchReadingList } from "redux/slices/userThunk";

function ToggleReadingList({ postSlug }: { postSlug: string }) {
  const readingList = useAppSelector((state) => state.user.readingList);
  const dispatch = useAppDispatch();

  const addToReadingList = async () => {
    await axios.post(`/api/readinglist/add/${postSlug}`);
    console.log("Added");
    // dispatch(fetchReadingList());
  };

  const removeFromReadingList = async () => {
    await axios.delete(`/api/readinglist/delete/${postSlug}`);
    console.log("Removed");
    // dispatch(fetchReadingList());
  };

  if (readingList.postSlugs.includes(postSlug)) {
    return (
      <IconButton
        size="sm"
        variant="ghost"
        color="gray.600"
        aria-label="Remove from reading list"
        icon={<BookmarkIcon style={{ height: "1.1rem" }} />}
        onClick={removeFromReadingList}
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
        onClick={addToReadingList}
      />
    );
  }
}

export default ToggleReadingList;
