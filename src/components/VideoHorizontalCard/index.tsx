import { Card, CardHeader, CardMedia } from "@material-ui/core";
// import { HeaderTitle } from "../VideoCard/HeaderTitle";
// import { SubHeaderContent } from "../VideoCard/SubHeaderContent";

import useStyles from "./style";

export const VideoHorizontalCard = () => {
    const styles = useStyles();
    return (
        <Card
            className={`${styles.root} ${styles.transparent}`}
            elevation={0}
            square
        >
            <div className={styles.thumbnail}>
                <CardMedia
                    className={styles.media}
                    image="/static/no-image.jpeg"
                    title="Thumbnail" />
            </div>
            <CardHeader
                className={styles.contentPadding}
                // title={<HeaderTitle />}
                // subheader={<SubHeaderContent />}
            />
        </Card>
    )
}