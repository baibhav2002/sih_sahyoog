import React from "react";

const PdfPreviewer = ({
  pdfPreviewerToggler,
  setPdfPreviewerToggler,
  pdfSrc,
}) => {
  return (
    <div
      className={
        pdfPreviewerToggler && pdfSrc !== ""
          ? "transition-all a- duration-300 left-0 top-0 w-[calc(100%-500px)] bg-purple-50 shadow-md border-r h-screen fixed overflow-hidden z-[9999] md:block hidden"
          : "transition-all a- duration-300 left-0 top-0 w-[calc(100%-500px)] bg-purple-50 shadow-md border-r h-0 fixed overflow-hidden z-[9999] md:block hidden"
      }
    >
      <object
        data={pdfSrc}
        width="800"
        height="500"
        className="w-full h-full"
      ></object>
    </div>
  );
};

export default PdfPreviewer;
