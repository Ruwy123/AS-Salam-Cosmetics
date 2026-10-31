export default function ContactPage() {
  return (
    <div className="container-shell py-16">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#40BFC1]">
          Contact
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-slate-900">
          We’d love to hear from you
        </h1>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="space-y-3 text-slate-600">
            <p>
              <strong className="text-slate-900">Email:</strong>{" "}
              hello@as-salamcosmetics.com
            </p>
            <p>
              <strong className="text-slate-900">Phone:</strong> +233 20 000
              0000
            </p>
            <p>
              <strong className="text-slate-900">Location:</strong> Accra, Ghana
            </p>
          </div>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full rounded-full border border-slate-200 bg-[#F8FAF9] px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#40BFC1]"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-full border border-slate-200 bg-[#F8FAF9] px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#40BFC1]"
            />
            <textarea
              rows={4}
              placeholder="Your message"
              className="w-full rounded-[1.5rem] border border-slate-200 bg-[#F8FAF9] px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#40BFC1]"
            />
            <button className="rounded-full bg-[#40BFC1] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#2fa5a7]">
              Send message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
