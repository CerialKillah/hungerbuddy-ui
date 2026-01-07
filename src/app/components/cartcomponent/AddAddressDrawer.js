import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AddAddress from "./AddAddress";

export default function AddAddressDrawer({
  drawerStatus,
  setDrawerStatus,
  onBack,
  onSave,
}) {
  const toggleDrawer = (newOpen) => () => {
    setDrawerStatus(newOpen);
  };

  const handleClose = () => {
    setDrawerStatus(false);
    if (onBack) onBack();
  };

  const handleSave = () => {
    setDrawerStatus(false);
    if (onSave) onSave();
  };

  const DrawerList = (
    <Box sx={{ width: 500 }}>
      <div>
        <AddAddress onClose={handleClose} onSave={handleSave} />
      </div>
    </Box>
  );

  return (
    <div>
      <Drawer
        open={drawerStatus}
        anchor={"right"}
        onClose={toggleDrawer(false)}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}
