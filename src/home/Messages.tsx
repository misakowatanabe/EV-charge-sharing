import { useState } from "react";
import Inbox from "./Inbox";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";

export default function Messages() {
  const items = [
    { id: 1, message: "List 1", time: "00:00" },
    { id: 2, message: "List 2", time: "01:00" },
    { id: 3, message: "List 3", time: "02:00" },
  ];

  const [checked, setChecked] = useState([0]);
  console.log(checked);

  const handleToggle = (id: number) => () => {
    const currentIndex = checked.indexOf(id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const handleItem = () => {
    console.log("clicked");
  };

  return (
    <Inbox>
      {items.map((item) => {
        const labelId = `checkbox-list-label-${item.id}`;

        return (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              role={undefined}
              dense
              style={{ paddingTop: "0px", paddingBottom: "0px" }}
            >
              <ListItemIcon>
                <Checkbox
                  onClick={handleToggle(item.id)}
                  edge="start"
                  checked={checked.indexOf(item.id) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText
                primary={
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>{item.message}</div>
                    <div>{item.time}</div>
                  </div>
                }
                onClick={handleItem}
                style={{ padding: "15px 0px", margin: "0px" }}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </Inbox>
  );
}
