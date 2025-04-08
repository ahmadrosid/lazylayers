import * as htmlToImage from "html-to-image";
import { saveAs } from "file-saver";
import { useRef, useState } from "react";
import uuid from "@/lib/uuid";

import { Gentium_Plus, Alfa_Slab_One } from 'next/font/google';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const gentiumPlus = Gentium_Plus({
    weight: ['400', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const alfaSlabOne = Alfa_Slab_One({
    weight: ['400'],
    subsets: ['latin'],
    display: 'swap',
});

export default function Carousel() {
    let [text, setText] = useState({
        tagline: "5 Kesalahan FATAL",
        title: "Yang Bikin Kamu Gagal Dapat Kerja Remote",
        paragraph: "(Yang ke-4 paling sering terjadi!)",
    });

    const content = useRef<HTMLDivElement>(null);
    let filename = uuid().split("-").join("");
    const handleDownload = () => {
        if (!content.current) return;
        htmlToImage.toPng(content.current).then(function (dataUrl) {
            saveAs(dataUrl, `${filename}.png`);
        });
    };

    return (
        <div className="flex antialiased">
            <div className="flex-1 max-h-screen relative">
                <div className="absolute z-0 inset-0 h-full w-full bg-gray-50 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="flex justify-between">
                    <div className='text-lg p-8 flex justify-center w-full'>
                        <div className="relative casual_white" ref={content} style={{
                            backgroundColor: "rgb(39, 64, 69)",
                            width: "440px",
                            height: "575px",
                            fontFamily: gentiumPlus.style.fontFamily
                        }}>
                            <div className="design_elements"></div>
                            <div className='w-full h-full grid place-content-center p-8 text-white tracking-normal leading-tight space-y-3'>
                                <div>{text.tagline}</div>
                                <div style={{ fontFamily: alfaSlabOne.style.fontFamily, fontSize: "2.5rem" }}>
                                    {text.title}
                                </div>
                                <div>(Yang ke-4 paling sering terjadi!)</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-[20rem] h-[92vh] overflow-y-auto border-l bg-whit'>
                <div className="space-y-4 mb-2 p-4">
                    <div className="text-sm space-y-2">
                        <p>Tagline</p>
                        <Input value={text.tagline} onChange={(e) => setText({ ...text, tagline: e.target.value })} />
                    </div>

                    <div className="text-sm space-y-2">
                        <p>Title</p>
                        <Textarea className="resize-none" value={text.title} onChange={(e) => setText({ ...text, title: e.target.value })} />
                    </div>

                    <div className="text-sm space-y-2">
                        <p>Paragraph</p>
                        <Textarea className="resize-none" value={text.paragraph} onChange={(e) => setText({ ...text, paragraph: e.target.value })} />
                    </div>
                    <Button onClick={handleDownload}>Download</Button>
                </div>
            </div>
        </div>
    );
}
