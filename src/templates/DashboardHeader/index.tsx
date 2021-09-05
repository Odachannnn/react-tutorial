import { 
    AppBar,
    Avatar, 
    Toolbar,
    IconButton,
    Typography
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import { Logo } from "../../components/Logo";
import { SearchBar } from "./SearchBar"
import { useSelectUserByIdQuery } from "../../utils/graphql/generated";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import useStyles from "./style"

export const DashboardHeader = () => {
    const styles = useStyles();

    const { data, error } = useSelectUserByIdQuery({
        variables: { "id": 1 },
    });

    useEffect(() => {
        console.log(data);
        console.log(error);
    }, [data]);
    
    
    return (
        <AppBar elevation={0} color="inherit">
            <Toolbar className={styles.between}>
                <div className={styles.flex}>
                    <IconButton>
                        <MenuIcon />
                    </IconButton>
                    <Link to="/" className={styles.logo}>
                        <Logo />
                    </Link>
                </div>

                <SearchBar />

                <div className={styles.flex}>
                    <IconButton>
                        <Typography>{data?.users_by_pk?.name}</Typography>
                    </IconButton>
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
