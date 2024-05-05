import { getPreferenceValues, List, ActionPanel, Action, showToast, ToastStyle } from "@raycast/api";
import { useState } from "react";

interface Bookmark {
  id: string;
  name: string;
  url: string;
}

export default function Command() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  const addBookmark = (name: string, url: string) => {
    const newBookmark: Bookmark = {
      id: Math.random().toString(36).substring(7),
      name,
      url,
    };
    setBookmarks([...bookmarks, newBookmark]);
    showToast(ToastStyle.Success, "Segnalibro aggiunto", name);
  };

  const removeBookmark = (id: string) => {
    setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== id));
    showToast(ToastStyle.Success, "Segnalibro rimosso");
  };

  return (
    <List>
      {bookmarks.map((bookmark) => (
        <List.Item
          key={bookmark.id}
          title={bookmark.name}
          accessoryTitle={bookmark.url}
          actions={
            <ActionPanel>
              <Action.OpenInBrowser url={bookmark.url} />
              <Action title="Rimuovi Segnalibro" onAction={() => removeBookmark(bookmark.id)} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
