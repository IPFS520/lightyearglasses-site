"use client";

export default function ContactForm() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert("Thank you! We'll get back to you soon.");
      }}
      className="space-y-5 font-sans"
    >
      <div>
        <label
          htmlFor="name"
          className="block text-xs uppercase tracking-wider text-muted mb-2"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          required
          className="w-full px-4 py-3 border border-primary/20 bg-white text-primary text-sm focus:outline-none focus:border-primary transition-colors"
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-xs uppercase tracking-wider text-muted mb-2"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          className="w-full px-4 py-3 border border-primary/20 bg-white text-primary text-sm focus:outline-none focus:border-primary transition-colors"
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="block text-xs uppercase tracking-wider text-muted mb-2"
        >
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          required
          className="w-full px-4 py-3 border border-primary/20 bg-white text-primary text-sm focus:outline-none focus:border-primary transition-colors resize-none"
        />
      </div>
      <button type="submit" className="btn btn-primary w-full md:w-auto">
        Send Message
      </button>
    </form>
  );
}
