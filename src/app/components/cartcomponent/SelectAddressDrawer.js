import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import SelectAddress from "./SelectAddress";

export default function SelectAddressDrawer({
  drawerStatus,
  setDrawerStatus,
  onAddAddress,
}) {
  const toggleDrawer = (newOpen) => () => {
    setDrawerStatus(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 400 }} role="presentation">
      <div>
        <SelectAddress
          setDrawerStatus={setDrawerStatus}
          onAddAddress={onAddAddress}
        />
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
