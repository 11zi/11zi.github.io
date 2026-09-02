(function () {
  "use strict";

  var root = document.querySelector("[data-blog-index]");
  if (!root) return;

  var cards = Array.prototype.slice.call(root.querySelectorAll("[data-post-card]"));
  var tagButtons = Array.prototype.slice.call(root.querySelectorAll("[data-tag]"));
  var tagLinks = Array.prototype.slice.call(root.querySelectorAll("[data-tag-link]"));
  var pagination = root.querySelector("[data-pagination]");
  var pageNumbers = root.querySelector("[data-page-numbers]");
  var previousButton = root.querySelector("[data-page-previous]");
  var nextButton = root.querySelector("[data-page-next]");
  var emptyState = root.querySelector("[data-empty-state]");
  var configuredPageSize = Number.parseInt(root.dataset.pageSize, 10);
  var pageSize = Number.isFinite(configuredPageSize) && configuredPageSize > 0
    ? configuredPageSize
    : 5;

  var availableTags = tagButtons
    .map(function (button) { return button.dataset.tag; })
    .filter(Boolean);
  var params = new URLSearchParams(window.location.search);
  var requestedTag = params.get("tag") || "";
  var state = {
    tag: availableTags.indexOf(requestedTag) === -1 ? "" : requestedTag,
    page: positiveInteger(params.get("page"))
  };

  cards.forEach(function (card) {
    try {
      card._tags = JSON.parse(card.dataset.tags || "[]");
    } catch (error) {
      card._tags = [];
    }
  });

  function positiveInteger(value) {
    var parsed = Number.parseInt(value, 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
  }

  function updateUrl() {
    var nextParams = new URLSearchParams(window.location.search);

    if (state.tag) nextParams.set("tag", state.tag);
    else nextParams.delete("tag");

    if (state.page > 1) nextParams.set("page", String(state.page));
    else nextParams.delete("page");

    var query = nextParams.toString();
    var nextUrl = window.location.pathname + (query ? "?" + query : "") + window.location.hash;
    window.history.replaceState(null, "", nextUrl);
  }

  function makePageButton(page) {
    var button = document.createElement("button");
    button.type = "button";
    button.textContent = String(page);
    button.dataset.page = String(page);
    button.setAttribute("aria-label", "第 " + page + " 页");
    if (page === state.page) button.setAttribute("aria-current", "page");
    return button;
  }

  function render() {
    var filtered = cards.filter(function (card) {
      return !state.tag || card._tags.indexOf(state.tag) !== -1;
    });
    var totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    state.page = Math.min(state.page, totalPages);
    var firstIndex = (state.page - 1) * pageSize;
    var visibleCards = filtered.slice(firstIndex, firstIndex + pageSize);

    cards.forEach(function (card) {
      card.hidden = visibleCards.indexOf(card) === -1;
    });

    tagButtons.forEach(function (button) {
      var active = button.dataset.tag === state.tag;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });

    emptyState.hidden = filtered.length !== 0;
    pagination.hidden = totalPages <= 1;
    previousButton.disabled = state.page === 1;
    nextButton.disabled = state.page === totalPages;
    pageNumbers.replaceChildren();

    for (var page = 1; page <= totalPages; page += 1) {
      pageNumbers.appendChild(makePageButton(page));
    }

    updateUrl();
  }

  function changePage(page) {
    state.page = page;
    render();
    root.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  tagButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      state.tag = button.dataset.tag;
      state.page = 1;
      render();
    });
  });

  tagLinks.forEach(function (button) {
    button.addEventListener("click", function () {
      state.tag = button.dataset.tagLink;
      state.page = 1;
      render();
      root.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  previousButton.addEventListener("click", function () {
    if (state.page > 1) changePage(state.page - 1);
  });

  nextButton.addEventListener("click", function () {
    changePage(state.page + 1);
  });

  pageNumbers.addEventListener("click", function (event) {
    var button = event.target.closest("[data-page]");
    if (button) changePage(positiveInteger(button.dataset.page));
  });

  render();
}());
