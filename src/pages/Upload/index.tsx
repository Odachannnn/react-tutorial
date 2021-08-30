import { 
    Dialog,
    DialogTitle,
    DialogContent,
    Divider,
    Grid,
} from "@material-ui/core";

import { VideoSelect } from "./VideoSelector";
import { UploadForm } from "./UploadForm";

import useStyles from "./style";

export const Upload = () => {
    const styles = useStyles();
    return (
        <Dialog fullWidth={true} maxWidth="md" open={true}>
            <DialogTitle>動画のアップロード</DialogTitle>
            <Divider />

            <DialogContent className={styles.body}>
                <Grid container spacing={4}>
                    <Grid xs item>
                        <VideoSelect />
                    </Grid>
                    <Divider orientation="vertical" flexItem />

                    <Grid xs item>
                        <UploadForm />
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};
