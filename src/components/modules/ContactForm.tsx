import { MainButton } from "../ui/MainButton";

export default function ContactForm() {
    return (
        <section
            id="contact"
            className="mx-auto w-xl max-w-2xl px-4 py-16 text-neutral-100 font-serif z-10 h-[90vh]"
        >
            <h2 className="mb-8 text-2xl font-bold tracking-tight text-white font-kaisei">
                Contact
            </h2>

            <form className="space-y-3">
                {/* Nom */}
                <div>
                    {/* <label
                        htmlFor="name"
                        className="block text-sm font-medium text-neutral-300 mb-1 font-noto"
                    >
                        Nom
                    </label> */}
                    <input
                        type="text"
                        id="name"
                        placeholder="Votre nom"
                        className="w-full rounded border border-neutral-700 bg-neutral-900 px-4 py-2 text-neutral-100 placeholder:text-neutral-500 focus:border-[var(--color-main)] focus:ring-1 focus:ring-[var(--color-main)]"
                    />
                </div>

                {/* Email */}
                <div>
                    {/* <label
                        htmlFor="email"
                        className="block text-sm font-medium text-neutral-300 mb-1"
                    >
                        Email
                    </label> */}
                    <input
                        type="email"
                        id="email"
                        placeholder="Votre email"
                        className="w-full rounded border border-neutral-700 bg-neutral-900 px-4 py-2 text-neutral-100 placeholder:text-neutral-500 focus:border-[var(--color-main)] focus:ring-1 focus:ring-[var(--color-main)]"
                    />
                </div>

                {/* Sujet */}
                <div>
                    {/* <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-neutral-300 mb-1"
                    >
                        Sujet
                    </label> */}
                    <input
                        type="text"
                        id="subject"
                        placeholder="Sujet de votre message"
                        className="w-full rounded border border-neutral-700 bg-neutral-900 px-4 py-2 text-neutral-100 placeholder:text-neutral-500 focus:border-[var(--color-main)] focus:ring-1 focus:ring-[var(--color-main)]"
                    />
                </div>

                {/* Message */}
                <div>
                    {/* <label
                        htmlFor="message"
                        className="block text-sm font-medium text-neutral-300 mb-1"
                    >
                        Message
                    </label> */}
                    <textarea
                        id="message"
                        rows={5}
                        placeholder="Votre message..."
                        className="w-full rounded border border-neutral-700 bg-neutral-900 px-4 py-2 text-neutral-100 placeholder:text-neutral-500 focus:border-[var(--color-main)] focus:ring-1 focus:ring-[var(--color-main)]"
                    ></textarea>
                </div>

                {/* Bouton */}
                <div>
                    <MainButton className="w-full">Envoyer</MainButton>
                </div>
            </form>
        </section>
    );
}
