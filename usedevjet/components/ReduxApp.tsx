import React from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { useAppDispatch, useAppSelector } from "redux/store";
import { fetchReadingList } from "redux/slices/userThunk";
import { cleanUserStore } from "redux/slices/user";

function ReduxApp() {
  const readingList = useAppSelector((state) => state.user.readingList);
  const dispatch = useAppDispatch();
  const { user } = useUser();

  React.useEffect(() => {
    if (user !== null) {
      if (readingList.postSlugs.length === 0) {
        dispatch(fetchReadingList());
      }
    } else dispatch(cleanUserStore());
  }, [user, dispatch, readingList]);

  return null;
}

export default ReduxApp;
