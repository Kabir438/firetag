import { Dispatch, FormEvent, SetStateAction, useRef } from "react";

export default function Input({
  coordinates,
  setData,
  setOpen,
  setMedia,
  place
}: {
  coordinates: {
    x: number;
    y: number;
  };
  setData: (any: any) => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setMedia: Dispatch<SetStateAction<boolean>>;
  place: string | null;
}) {
    const nameRef = useRef<null | HTMLInputElement>(null)
    const emailRef = useRef<null | HTMLInputElement>(null)
    const telRef = useRef<null | HTMLInputElement>(null)
    const descriptionRef = useRef<null | HTMLTextAreaElement>(null)

    const handleSendData = (e: FormEvent<HTMLFormElement> | null, media: boolean) => {
        e?.preventDefault()
        setData({
            name: nameRef.current.value,
            email: emailRef.current.value,
            phoneNumber: telRef.current.value,
            description: descriptionRef.current.value
        })
        setOpen(false);
        setMedia(true)
    }

  return (
    <form onSubmit={(e) => handleSendData(e, true)} className="w-full flex items-center flex-col justify-center relative float-left">
      {!place ? <h2 className="text-white text-2xl">
        Your co-ordinates are ({coordinates.x}, {coordinates.y}){" "}
      </h2> : <h2 className="text-white text-2xl">
        Your location is at {place}
      </h2>}
      <h3 className="text-white text-xl">
        Please enter the following details:
      </h3>
      <div className="input-container">
        <input
          type="text"
          name="name"
          id="name"
          required
          ref={nameRef}
          onChange={(e) =>
            e.target.value.trim()
              ? e.target.classList.add("full")
              : e.target.classList.remove("full")
          }
        />
        <label
          onClick={(e: any) =>
              typeof e.currentTarget.previousSibling.focus !== "undefined" &&
                e.currentTarget.previousSibling.focus()
          }
        >
          Name
        </label>
      </div>
      {/* <br /> */}
      <div className="input-container">
        <input
          type="email"
          name="email"
          id="email"
          required
          ref={emailRef}
          onChange={(e) =>
            e.target.value.trim()
              ? e.target.classList.add("full")
              : e.target.classList.remove("full")
          }
        />
        <label
          onClick={(e: any) =>
              typeof e.currentTarget.previousSibling.focus !== "undefined" &&
                e.currentTarget.previousSibling.focus()
          }
        >
          Email
        </label>
      </div>
      {/* <br /> */}
      <div className="input-container">
        <input
          type="tel"
          name="tel"
          id="tel"
          required
          max={10}
          ref={telRef}
          onChange={(e) =>
            e.target.value.trim()
              ? e.target.classList.add("full")
              : e.target.classList.remove("full")
          }
        />
        <label
          onClick={(e: any) =>
              typeof e.currentTarget.previousSibling.focus !== "undefined" &&
                e.currentTarget.previousSibling.focus()
          }
        >
          Phone Number
        </label>
      </div>
      {/* <br /> */}
      <div className="input-container">
        <textarea
          name="description"
          id="description"
          cols={30}
          rows={5}
          ref={descriptionRef}
          style={{
            resize: 'none'
          }}
          onChange={(e) =>
            e.target.value.trim()
              ? e.target.classList.add("full")
              : e.target.classList.remove("full")
          }
        ></textarea>
        <label
          onClick={(e: any) =>
              typeof e.currentTarget.previousSibling.focus !== "undefined" &&
                e.currentTarget.previousSibling.focus()
          }
        >
          Description (Optional)
        </label>
      </div>
      <div className="flex items-center justify-between w-full">
        <button type={"submit"} className="bg-[#c3c3c3] font-openSans text-xl hover:bg-[#9e9e9e] text-black w-1/2 p-4 pt-2 pb-2 rounded-[5px] transition-all font-bold" style={{width: "100%"}}>
          Next
        </button>
      </div>
    </form>
  );
}
