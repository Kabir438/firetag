import Image from "next/image";

export default function Success({
    open,
    setOpen
}: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  console.log(open, "open")
    if(open) {
        return (
            <div
              id="success"
              style={{ height: "calc(100% - 6rem)", zIndex: 9999999999999999999999 }}
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
                  zIndex: 999999999999999999999999,
                }}
              >
                <div
                  id="cross-container"
                  className="w-full h-full flex justify-end pt-2 pr-2 absolute z-[99999999999999999999]"
                  style={{
                    zIndex: 99999999999999999999,
                  }}
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
                <Image src="/fire.png" alt="error" height={394/2} width={320/2.2}></Image>
                <h1
                  className="text-center text-2xl z-[9999999999999999999999]"
                  style={{ zIndex: 9999999999999999999999, color: "#f47c1e", marginTop: "1rem" }}
                >
                  Your Incident was successfully reported. This information is shared with our supported media partners and firemen.
                </h1>
              </div>
            </div>
          );
    }
    else {
        return (
            <></>
        )
    }
}
