"use client";
import { toast } from "@/hooks/use-toast";
import config from "@/lib/config";
import { cn } from "@/lib/utils";
import { IKImage, ImageKitProvider, IKUpload, IKVideo } from "imagekitio-next";
import Error from "next/error";
import Image from "next/image";
import { useRef, useState } from "react";

interface Props {
  type: "image" | "video";
  onFileChange: (filePath: string) => void;
  placeholder: string;
  folder: string;
  variant: "dark" | "light";
  accept: string;
  value?: string;
}

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);
    if (!response.ok) {
      const errorText = await response.text();
      console.log("Hiiiii");
      throw new Error(
        `Request failed with status ${response.status} : ${errorText}`,
      );
    }
    const data = await response.json();
    const { signature, expire, token } = data;

    return { signature, expire, token };
  } catch (error: any) {
    console.log("Hiiiii222");
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const FileUpload = ({
  onFileChange,
  accept,
  placeholder,
  folder,
  variant,
  type,
  value,
}: Props) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string | null }>({
    filePath: value ?? null,
  });
  const [progress, setProgress] = useState(0);

  const styles = {
    button:
      variant === "dark"
        ? "bg-dark-300"
        : "bg-light-600 border-gray-100 border",
    placeholder: variant === "dark" ? "text-light-100" : "text-slate-500",
    text: variant === "dark" ? "text-light-100" : "text-dark-400",
  };

  const onError = (error: any) => {
    console.log(error);
    toast({
      title: ` ${type} upload failed`,
      description: `${type} cannot be uploaded. Please try again`,
      variant: "destructive",
    });
  };

  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);

    toast({
      title: `${type} uploaded successfully`,
      description: `${res.filePath} uploaded successfully`,
    });
  };

  const onValidate = (file: File) => {
    if (type === "image") {
      if (file.size > 20 * 1024 * 1024) {
        toast({
          title: "File size too large",
          description:
            "The file size exceeds the 20MB limit. Please upload a smaller file.",
          variant: "destructive",
        });
        return false;
      }
    } else if (type === "video") {
      if (file.size > 50 * 1024 * 1024) {
        toast({
          title: "File size too large",
          description:
            "The file size exceeds the 50MB limit. Please upload a smaller file.",
          variant: "destructive",
        });
        return false;
      }
    }
    return true;
  };

  return (
    <div>
      <ImageKitProvider
        publicKey={publicKey}
        urlEndpoint={urlEndpoint}
        authenticator={authenticator}
      >
        <IKUpload
          ref={ikUploadRef}
          onError={onError}
          onSuccess={onSuccess}
          useUniqueFileName={true}
          validateFile={onValidate}
          onUploadStart={() => setProgress(0)}
          onUploadProgress={({ loaded, total }) => {
            const percent = Math.round((loaded / total) * 100);
            setProgress(percent);
          }}
          folder={folder}
          accept={accept}
          className="hidden"
        />

        <button
          className={cn("upload-btn", styles.button)}
          onClick={(e) => {
            e.preventDefault();
            if (ikUploadRef.current) {
              //@ts-expect-error
              ikUploadRef.current?.click();
            }
          }}
        >
          <Image
            src="/icons/upload.svg"
            alt="upload"
            width={20}
            height={20}
            className="object-contain"
          />

          <p className={cn("text-base", styles.placeholder)}>{placeholder}</p>
          {file && (
            <p className={cn("upload-filename", styles.text)}>
              {file.filePath}
            </p>
          )}
        </button>

        {progress > 0 && progress !== 100 && (
          <div className="w-full rounded-full bg-green-200 my-2">
            <div className="progress" style={{ width: `${progress}%` }}>
              {progress}%
            </div>
          </div>
        )}

        {file &&
          (type === "image" ? (
            <IKImage
              alt={file.filePath}
              path={file.filePath}
              width={500}
              height={300}
            />
          ) : type === "video" ? (
            <IKVideo
              path={file.filePath}
              controls={true}
              className="h-96 w-full rounded-xl"
            />
          ) : null)}
      </ImageKitProvider>
    </div>
  );
};

export default FileUpload;
