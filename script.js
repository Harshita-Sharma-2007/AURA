document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", function(e) {
    if (!this.classList.contains("flip")) {
      e.preventDefault();
      this.classList.add("flip");

      setTimeout(() => {
        window.open(this.href, "_blank");
        this.classList.remove("flip");
      }, 600);
    }
  });
});