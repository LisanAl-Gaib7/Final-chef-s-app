import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { MenuItem } from "./src/types";
import MenuListScreen from "./src/screens/MenuListScreen";
import AddMenuItemScreen from "./src/screens/AddMenuItemScreen";

// Screen state: list (home), add (new item), or edit (existing item).
type Screen = "list" | "add" | "edit";

export default function App() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [screen, setScreen] = useState<Screen>("list");
  // When editing, hold the item currently being edited.
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  function handleAddItem(newItem: Omit<MenuItem, "id">) {
    const itemWithId: MenuItem = {
      ...newItem,
      id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    };
    // Newest dish at the top for instant visual confirmation.
    setItems((current) => [itemWithId, ...current]);
  }

  function handleUpdateItem(updated: MenuItem) {
    setItems((current) =>
      current.map((item) => (item.id === updated.id ? updated : item))
    );
  }

  function handleDeleteItem(id: string) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  function openEdit(item: MenuItem) {
    setEditingItem(item);
    setScreen("edit");
  }

  function openAdd() {
    setEditingItem(null);
    setScreen("add");
  }

  function goToList() {
    setEditingItem(null);
    setScreen("list");
  }

  return (
    <>
      <StatusBar style="dark" />
      {screen === "list" ? (
        <MenuListScreen
          items={items}
          onAddPress={openAdd}
          onEditPress={openEdit}
          onDeletePress={handleDeleteItem}
        />
      ) : (
        <AddMenuItemScreen
          // Re-use the same form for both create and edit.
          initialItem={editingItem}
          onSave={(data) => {
            if (editingItem) {
              handleUpdateItem({ ...editingItem, ...data });
              goToList(); // After update, return to the list immediately.
            } else {
              handleAddItem(data);
              // Stay on the form so the success banner can be seen.
            }
          }}
          onCancel={goToList}
        />
      )}
    </>
  );
}
