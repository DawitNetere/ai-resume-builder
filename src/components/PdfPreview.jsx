import React, { useState, useEffect } from "react";
import { Divider, cn } from "@nextui-org/react";
import { Buffer } from "buffer";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import Loader from "./Loader";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
const options = {
  cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
};

const PdfPreview = ({ file }) => {
  const [loading, setLoading] = useState(true);
  const [numPages, setNumPages] = useState();
  const pages = numPages
    ? Array(numPages)
        .fill(0)
        .map((_, i) => i + 1)
    : [];

  const [arrayBuffer, setArrayBuffer] = useState();
  const base64String = arrayBuffer
    ? Buffer.from(arrayBuffer, "binary").toString("base64")
    : "";

  useEffect(() => {
    if (!file || file.type !== "application/pdf") {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      const receivedArrayBuffer = event.target?.result;
      setArrayBuffer(receivedArrayBuffer);
    };

    fileReader.readAsArrayBuffer(file);
  }, [file]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setLoading(false);
    setNumPages(numPages);
  };

  if (!base64String) return null;

  return (
    <div
      className={cn(
        "w-full h-full flex flex-col justify-between",
        loading && "justify-center"
      )}
    >
      <Document
        file={`data:application/pdf;base64,${base64String}`}
        options={options}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={<Loader />}
        className="flex flex-col gap-2 w-fit mx-auto"
      >
        {pages.map((page, index) => (
          <React.Fragment key={page}>
            <Page pageNumber={page} loading={null} />
            {index !== pages.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </Document>
    </div>
  );
};

export default PdfPreview;
