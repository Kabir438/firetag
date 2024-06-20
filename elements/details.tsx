import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import Input from "./dialog-frames/input";
import Media from "./dialog-frames/media";
import Success from "./views/success";
import { useRouter } from "next/router";


export default function Details({
    open,
    setOpen,
    coordinates,
    setData,
    slug,
    place
}: {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    coordinates: {
        x: number;
        y: number;
    };
    setData: (any: any) => void;
    slug: null | string;
    place: null | string;
}) {
    const router = useRouter();
    const [ showSuccess, setShowSuccess ] = useState(false);
    const [ media, setMedia ] = useState(false);
    useEffect(() => {
        console.log(media, open)
    }, [media, open])
    useEffect(() => {
        if(showSuccess) {
            setTimeout(() => {
                setShowSuccess(false);
                router.reload()
            }, 10*1000)
        }
        console.log("showing sucess", showSuccess)
    }, [router, showSuccess])
    if(media||open) {
        console.log("showing sucess", showSuccess)
        return (
            <div
            id="not-supported-container fixed"
            style={{ height: "calc(100% - 6rem)", zIndex: 99999999999999 }}
            className="w-full h-full absolute"
            >
                <Success open={showSuccess} setOpen={setShowSuccess}/>
                <div
                    className="details dialog w-[90vw] max-w-[48rem] absolute p-5 flex flex-col justify-center items-center"
                    style={{
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        background: "#0000008c",
                        boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                        backdropFilter: "blur( 5px )",
                        WebkitBackdropFilter: "blur( 5px )",
                        borderRadius: "10px",
                        border: "1px solid rgba( 255, 255, 255, 0.18 )",
                        zIndex: 999999999999999,
                    }}
                >
                    <div className="frame-container w-[80%]">
                        
                            {(!open ? (
                                <></>
                            ) : (
                                <Input {...{
                                    number: 1,
                                    setOpen: setOpen,
                                    setData: setData,
                                    coordinates: coordinates,
                                    setMedia: setMedia,
                                    place: place
                                }}/>
                            ))}
    
                            {
                                !media ? (
                                    <></>
                                ) : (
                                    <Media setShowSuccess={setShowSuccess} slug={slug} setOpen={setMedia}/>
                                )
                            }
                        
                    </div>
                </div>
            </div>
        );
    } else {
        console.log("showing sucess", showSuccess)
        return (<><Success open={showSuccess} setOpen={setShowSuccess}/></>)
    }
}