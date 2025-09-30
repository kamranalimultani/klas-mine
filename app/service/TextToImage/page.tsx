'use client';
import { useState } from "react";
import MenuSidebar from "../../components/Sidebar/MenuSidebar";
import TextToImageContent from "../TextBehindImage/page";
import ImageGeneratorOption from "../../components/Sidebar/ImageGeneratorOption";
export default function TextToImagePage() {
  return (
    <div className="flex">
      <ImageGeneratorOption />
      <div className="flex-1 bg-gray-100 p-4">
        Text to Images       
      </div>
    </div>
  );
}
