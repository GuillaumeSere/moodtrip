export default function ContactPage() {
  return (
    <main className="min-h-screen bg-linear-to-br from-slate-400 to-slate-700 flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-8 text-white">
        
        <h1 className="text-4xl font-bold mb-4 text-center">Contact 🌍</h1>
        <p className="text-white/80 text-center mb-8">
          Une question, une suggestion ou une envie de voyager ? Écris-nous ✨
        </p>

        <form className="flex flex-col gap-5">
          <div>
            <label className="block mb-2 text-sm font-medium">Nom</label>
            <input
              type="text"
              placeholder="Ton nom"
              className="w-full p-3 rounded-lg bg-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="ton@email.com"
              className="w-full p-3 rounded-lg bg-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Message</label>
            <textarea
              rows={4}
              placeholder="Ton message..."
              className="w-full p-3 rounded-lg bg-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white resize-none"
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-white text-indigo-700 font-semibold py-3 rounded-lg hover:scale-105 transition-transform"
          >
            Envoyer ✉️
          </button>
        </form>
      </div>
    </main>
  );
}