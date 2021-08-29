import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Divider,
    Typography,
} from "@material-ui/core";
import useStyles from "./style";

export const VideoPlayerCard = () => {
    const styles = useStyles();
    return (
        <Card className={styles.transparent} elevation={0} square>
            <CardMedia
                component="video"
                controls
                src="/static/production ID_4763824.mp4"
            />
            <CardContent className={styles.paddingHorizontailLess}>
                <Typography component="h2" variant="h6">
                    Organization Admin Settings: Dashboard overview [1/7]
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    1,234 回視聴 ・ 2021/12/14
                </Typography>
            </CardContent>
            <Divider />
            <CardHeader
                className={styles.paddingHorizontailLess}
                avatar={<Avatar />}
                title="Movieclips Trailer"
                subheader="104K subscribes"
            />
            <CardContent>
                Find your absolutely beautiful and serene placea and listen to nature sounds, birds singing and....
            </CardContent>
        </Card>
    );
};
