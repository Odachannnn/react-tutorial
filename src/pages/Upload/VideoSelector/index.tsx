import { Button, CardMedia, Grid, Typography } from "@material-ui/core";
import { useState, useRef, ChangeEvent, useEffect } from "react";

export const VideoSelect = () => {
    const [file, setFile] = useState<File>();
    const [ videoURL, setVideoURL ] = useState<string>();
    const [thumbnailURLs, setThumbnailURLs] = useState<string[]>([]);

    const createThumbnail = (videoRefURL: string) => {
        const video = document.createElement("video");
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        video.onloadeddata = () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            video.currentTime = 0;
        };

        video.onseeked = () => {
            if (video.currentTime >= video.duration || !context) return;

            context.drawImage(video, 0, 0);

            setThumbnailURLs((prev) => [...prev, canvas.toDataURL("image/jpeg")]);
            video.currentTime += Math.ceil(video.duration / 3);
        };

        video.src = videoRefURL;
        video.load();

    };

    const selectedFile = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.files?.length) {
            setFile(event.currentTarget.files[0]);
        }
    };

    const inputRef = useRef<HTMLInputElement>(null);
    const handleClick = () => {
        inputRef.current?.click();
    };

    useEffect(() => {
        if (file) {
            const videoURL = URL.createObjectURL(file);
            setVideoURL(videoURL);
            createThumbnail(videoURL);
        }
    }, [file])

    return (
        <div>
            {videoURL && (
                <div>
                    <CardMedia component="video" src={videoURL} controls />
                    <Typography>サムネイル</Typography>
                    <Grid container spacing={2}>
                        {thumbnailURLs.map((url) => {
                            return (
                                <Grid item xs={4}>
                                    <CardMedia image={url} style={{ paddingTop: "56.25%" }} />
                                </Grid>
                            );
                        })}
                    </Grid>
                </div>
            )}

            <input type="file" hidden ref={inputRef} onChange={selectedFile} />
            {!videoURL && <Button onClick={handleClick}>ファイルを選択</Button>}
        </div>
    );
};
