import { MenuStats } from "./components/MenuStats";
import { MenuList } from "./components/MenuList";
import { MenuItemForm } from "./components/MenuItemForm";
import { CategoryManager } from "./components/CategoryManager";
import { Drawer } from "./components/Drawer";
import { useAppDrawers } from "./hooks/useAppDrawers";

const App = () => {
  const {
    drawerOpen,
    editingItem,
    catDrawerOpen,
    openCreate,
    openEdit,
    closeDrawer,
    handleSubmit,
    openCatDrawer,
    closeCatDrawer,
  } = useAppDrawers();

  return (
    <>
      <header>
        <h1>Menu</h1>
      </header>

      <main>
        <MenuStats />
        <MenuList onEdit={openEdit} onCreate={openCreate} onCategoryManage={openCatDrawer} />
      </main>

      <Drawer open={drawerOpen} onClose={closeDrawer} title={editingItem ? "Edit Menu" : "Tambah Menu"}>
        <MenuItemForm
          key={editingItem?.id ?? "new"}
          initial={editingItem}
          onSubmit={handleSubmit}
          onCancel={closeDrawer}
        />
      </Drawer>

      <Drawer open={catDrawerOpen} onClose={closeCatDrawer} title="Kelola Kategori">
        <CategoryManager onClose={closeCatDrawer} />
      </Drawer>
    </>
  );
};

export default App;
