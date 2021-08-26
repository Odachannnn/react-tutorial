import { AppBar, Avatar, Grid, Toolbar, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import { Logo } from "../../components/Logo";
import { SearchBar } from "./SearchBar"

import useStyles from "./style"

export const DashboardHeader = () => {
    const styles = useStyles();
    return (
        <AppBar elevation={0} color="inherit">
            <Toolbar className={styles.between}>
                <div className={styles.flex}>
                    <IconButton>
                        <MenuIcon />
                    </IconButton>
                    <div className={styles.logo}>
                        <Logo />
                    </div>
                </div>

                <SearchBar />

                <div className={styles.flex}>
                    <IconButton>
                        <VideoCallIcon />
                    </IconButton>

                    <IconButton className={styles.profileIcon}>
                        <Avatar />
                    </IconButton>
                </div>

            </Toolbar>
        </AppBar>
    )
};
