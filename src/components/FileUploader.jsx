import React, { useRef, useState, useEffect, useId } from "react";
import { cn, Button } from "@nextui-org/react";
import { UploadIcon, XIcon } from "lucide-react";
import { toast } from "sonner";
import Spinner from "./Spinner";

const FileUploader = ({
  label,
  file,
  accept,
  align,
  fullWidth,
  small,
  icon,
  onChange,
  onClear,
  isDisabled,
  isLoading,
  defaultValue,
}) => {
  const maxFileSize = 2 * 1024 * 1024; // 2MB

  const id = useId();
  const ref = useRef(null);
  const [fileName, setFileName] = useState(null);

  useEffect(() => {
    setFileName(file?.name || null);
    if (ref.current) ref.current.value = "";
  }, [file]);

  const handleClick = () => {
    ref.current.click();
  };

  const handleChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    if (file.size > maxFileSize) {
      toast.error("File is too large.", {
        description: `File size exceeds ${maxFileSize / 1024 / 1024}MB.`,
      });
      event.target.value = null;
      return;
    }

    onChange(event);
  };

  const handleClear = () => {
    setFileName(null);
    onClear();
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-1 w-full max-w-96",
        align === "left" && "items-start",
        fullWidth && "max-w-none",
        (isDisabled || isLoading) && "opacity-50 pointer-events-none"
      )}
    >
      {label && (
        <label htmlFor={id} className="text-sm">
          {label}
        </label>
      )}
      <div className="relative mb-5 w-full">
        <div
          className={cn(
            "absolute -bottom-5 w-full px-4 flex items-center justify-center gap-2",
            align === "left" && "justify-start",
            small && "-bottom-4"
          )}
        >
          <Button
            color="primary"
            variant="shadow"
            size={small ? "sm" : "md"}
            radius="md"
            startContent={
              <UploadIcon className={cn("w-5 h-5", small && "w-4 h-4")} />
            }
            onClick={handleClick}
          >
            Choose File
          </Button>
          {!!onClear && (file || defaultValue) && (
            <Button
              color="primary"
              variant="flat"
              size={small ? "sm" : "md"}
              radius="md"
              startContent={
                <XIcon className={cn("w-5 h-5", small && "w-4 h-4")} />
              }
              onClick={handleClear}
            >
              Clear
            </Button>
          )}
        </div>
        <div
          className={cn(
            "grid place-items-center p-4 py-12 bg-default-100 rounded-xl w-full overflow-hidden hover:bg-default-200 transition-background motion-reduce:transition-none !duration-150 cursor-pointer",
            align === "left" && "place-content-start"
          )}
          onClick={handleClick}
        >
          <div className="flex items-center gap-3">
            {isLoading ? <Spinner /> : icon}
            <span
              className={cn(
                "text-sm text-black line-clamp-1 text-ellipsis",
                !fileName && !defaultValue && "text-foreground-500"
              )}
            >
              {fileName || defaultValue || "No file chosen"}
            </span>
          </div>
        </div>
        <input
          ref={ref}
          id={id}
          type="file"
          accept={accept}
          className="hidden"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default FileUploader;
