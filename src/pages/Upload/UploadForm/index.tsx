import { Button, TextField, Typography } from "@material-ui/core";

import useStyles from "./style";

export const UploadForm = () => {
    const styles = useStyles();
    return (
        <div>
            <label className={styles.label}>
                <Typography variant="body2">タイトル</Typography>
                <TextField size="small" fullWidth variant="outlined" />
            </label>

            <label className={styles.label}>
                <Typography variant="body2">説明</Typography>
                <TextField
                    size="small"
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={4}
                />
            </label>

            <div className={styles.button}>
                <Button variant="contained" color="primary">
                    画像をアップロード
                </Button>
            </div>
        </div>
    )
}