import { useRef } from "react";
import emailjs from "@emailjs/browser";

export default function About() {
  const email = useRef<HTMLInputElement>(null);
  const message = useRef<HTMLTextAreaElement>(null);
  const name = useRef<HTMLInputElement>(null);
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log("submitted");
    const emailText = email.current?.value;
    const messageText = message.current?.value;
    const nameText = name.current?.value;
    console.log("message", messageText)
    emailjs
      .send("service_mfhepbu", "template_qvmd1ss", {
        from_name: nameText,
        message: messageText,
        reply_to: emailText,
      }, "Q1DwN28hjL-He8_dC")
      .then(() => console.log("done"))
      .catch(() => console.error("shit"));
  };
  return (
    <main className="max-h-screen pt-[93px]">
      <section className="bg-[hsl(0,0%,10%)]">
        <div className="py-8 lg:py-16 px-4 mx-auto h-[calc(100vh-93px)] max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-white">
            Support Us
          </h2>
          <p className="mb-8 lg:mb-16 font-light text-center text-gray-400 sm:text-xl">
            Got a technical issue? Want to send feedback? Want to register as a
            fireman? Let us know.
          </p>
          <form onSubmit={onSubmit} className="space-y-8">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-300"
              >
                Your email
              </label>
              <input
                ref={email}
                type="email"
                id="email"
                className="outline-0 shadow-sm border border-gray-300 text-sm rounded-lg focus:border-[#3c4362] focus:border-2 block w-full p-2.5 bg-[rgb(46,50,54)] placeholder-gray-400 text-white focus:ring-[#436edc] shadow-sm-light"
                placeholder="Email"
                required
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-300"
              >
                Your Name
              </label>
              <input
                ref={name}
                type="text"
                id="name"
                className="outline-0 shadow-sm border border-gray-300 text-sm rounded-lg focus:border-[#3c4362] focus:border-2 block w-full p-2.5 bg-[rgb(46,50,54)] placeholder-gray-400 text-white focus:ring-[#436edc] shadow-sm-light"
                placeholder="Name"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-300"
              >
                Your message
              </label>
              <textarea
                ref={message}
                id="message"
                rows={6}
                className="outline-0 shadow-sm border border-gray-300 text-sm rounded-lg focus:border-[#3c4362] focus:border-2 block w-full p-2.5 bg-[rgb(46,50,54)] placeholder-gray-400 text-white focus:ring-[#436edc] shadow-sm-light"
                placeholder="Leave a comment..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-slate-700 sm:w-fit hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300"
            >
              Send message
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

About.title = `Firetag - Support Us`;
