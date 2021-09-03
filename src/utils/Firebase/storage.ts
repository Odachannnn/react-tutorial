import { storage } from "./config";

/**
 * アップロード用関数
 * @param ref:アップロードするファイルの参照を指定
 * @param file:アップロードするファイルそのもの
 * @returns firebase.storage.UploadTask
 */

export const uploader = (ref: string, file: File) =>
    storage.ref().child(ref).put(file);

/**
 * ダウンロード用関数
 * @param ref: ダウンロードするファイルの参照を指定する
 * @returns string ファイルをダウンロードするためのURL
 */
export const downloader = (ref: string) =>
    storage.ref().child(ref).getDownloadURL();
    