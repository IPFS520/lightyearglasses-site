"use client";

export default function NewsletterForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
    >
      <input
        type="email"
        required
        placeholder="Enter your email"
        className="flex-1 px-5 py-3 border border-primary/20 bg-white text-sm font-sans placeholder:text-muted focus:outline-none focus:border-primary transition-colors"
      />
      <button
        type="submit"
        className="btn btn-primary px-8 py-3 text-sm"
      >
        Join
      </button>
    </form>
  );
}
