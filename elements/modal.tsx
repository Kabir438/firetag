import Image from "next/image";

export default function NotSupported({
    open,
    setOpen
}: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    if(open) {
        return (
            <div
            id="not-supported-container fixed"
            style={{ height: "calc(100% - 6rem)" }}
            className="w-full h-full absolute z-[9999999999999999999999]"
            >
            <div
                className="dialog w-96 absolute p-5 flex flex-col justify-center items-center z-[999999999999999999999999]"
                style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                background: "rgb(0 48 255 / 25%)",
                boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                backdropFilter: "blur( 5px )",
                WebkitBackdropFilter: "blur( 5px )",
                borderRadius: "10px",
                border: "1px solid rgba( 255, 255, 255, 0.18 )",
                }}
            >
                <div
                id="cross-container"
                className="w-full h-full flex justify-end pt-2 pr-2 absolute z-[99999999999999999999]"
                >
                <button
                    id="cross"
                    onClick={() => setOpen(false)}
                    className="absolutew w-8 h-8 rounded-full hover:backdrop-brightness-50"
                    style={{
                    background: "rgb(0 48 255 / 25%)",
                    boxShadow: "inset 0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                    backdropFilter: "blur( 5px )",
                    WebkitBackdropFilter: "blur( 5px )",
                    border: "1px solid rgba( 255, 255, 255, 0.18 )",
                    }}
                >
                    ✕
                </button>
                </div>
                <Image src="/error.png" alt="error" height={125} width={125}></Image>
                <h1 className="text-center z-[9999999999999999999999]">
                Could not get your current location. Please recheck your browser
                settings.
                </h1>
            </div>
            </div>
        );
    } else {
        return <></>
    }
}
