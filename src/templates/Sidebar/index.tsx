import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import WhatShotIcon from "@material-ui/icons/Whatshot";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import useStyles from "./style";
import { Link } from "react-router-dom";

export const Sidebar = () => {
    const styles = useStyles();
    return (
        <List component="nav" className={styles.root}>
            <ListItem button component={Link} to="/">
                <ListItemIcon>
                    <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="ホーム" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <WhatShotIcon />
                </ListItemIcon>
                <ListItemText primary="トレンド" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <SubscriptionsIcon />
                </ListItemIcon>
                <ListItemText primary="登録チャンネル" />
            </ListItem>
        </List>
    )
};
