(function () {
  var $ = function (id) { return document.getElementById(id); };
  var mode = "dl";
  var lastFocus = null;

  function getId(text) {
    var s = (text || "").trim(), m;
    if (!s) return null;
    m = s.match(/\/d\/([A-Za-z0-9_-]{10,})/) || s.match(/[?&]id=([A-Za-z0-9_-]{10,})/);
    return m ? m[1] : null;
  }

  function setMode(m) {
    mode = m;
    $("seg").setAttribute("data-mode", m);
    $("m-dl").setAttribute("aria-pressed", m === "dl");
    $("m-img").setAttribute("aria-pressed", m === "img");
    if (!$("result").hidden) convert(true);
  }

  function convert(quiet) {
    var input = $("link"), err = $("err"), id = getId(input.value);
    if (!id) {
      $("result").hidden = true;
      input.classList.add("bad");
      err.textContent = input.value.trim()
        ? "We couldn’t find a file ID. Paste a link like https://drive.google.com/file/d/…/view"
        : "Paste a Google Drive share link first.";
      if (!quiet) input.focus();
      return;
    }
    input.classList.remove("bad");
    err.textContent = "";

    var url = mode === "dl"
      ? "https://drive.google.com/uc?export=download&id=" + id
      : "https://lh3.googleusercontent.com/d/" + id;

    $("out").value = url;
    $("open").href = url;
    var t = $("rtag");
    t.textContent = mode === "dl" ? "Download link" : "Image preview link";
    t.className = "tag " + (mode === "dl" ? "dl" : "img");
    $("copy").textContent = "Copy";
    $("copy").classList.remove("ok");

    var wasHidden = $("result").hidden;
    $("result").hidden = false;
    if (wasHidden) { $("result").style.animation = "none"; void $("result").offsetWidth; $("result").style.animation = ""; }

    var pv = $("preview");
    if (mode === "img") {
      var img = $("prev");
      $("pfail").hidden = true;
      img.hidden = false;
      img.onerror = function () { img.hidden = true; $("pfail").hidden = false; };
      if (img.getAttribute("src") !== url) img.src = url;
      pv.hidden = false;
    } else {
      pv.hidden = true;
    }
  }

  function copy() {
    var o = $("out"), b = $("copy");
    function done() {
      b.textContent = "Copied";
      b.classList.add("ok");
      setTimeout(function () { b.textContent = "Copy"; b.classList.remove("ok"); }, 1600);
    }
    o.select(); o.setSelectionRange(0, 99999);
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(o.value).then(done, function () { document.execCommand("copy"); done(); });
      } else { document.execCommand("copy"); done(); }
    } catch (e) { b.textContent = "Press Ctrl+C"; }
  }

  /* notice */
  $("close-notice").onclick = function () {
    $("notice").classList.add("gone");
    try { sessionStorage.setItem("dr-notice", "1"); } catch (e) {}
  };
  try { if (sessionStorage.getItem("dr-notice")) $("notice").classList.add("gone"); } catch (e) {}

  /* modal */
  function openHow() {
    lastFocus = document.activeElement;
    var m = $("modal");
    m.classList.remove("closing");
    m.hidden = false;
    document.body.classList.add("modal-open");
    m.querySelector(".sheet").focus();
  }
  function closeHow() {
    var m = $("modal");
    if (m.hidden) return;
    m.classList.add("closing");
    document.body.classList.remove("modal-open");
    setTimeout(function () {
      m.hidden = true;
      m.classList.remove("closing");
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }, 180);
  }
  $("open-how").onclick = openHow;
  $("close-how").onclick = closeHow;
  $("done-how").onclick = closeHow;
  $("scrim").onclick = closeHow;
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeHow();
    if (e.key === "Tab" && !$("modal").hidden) {
      var f = $("modal").querySelectorAll("button,a[href]");
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  $("m-dl").onclick = function () { setMode("dl"); };
  $("m-img").onclick = function () { setMode("img"); };
  $("go").onclick = function () { convert(false); };
  $("copy").onclick = copy;
  $("link").addEventListener("keydown", function (e) { if (e.key === "Enter") convert(false); });
  $("link").addEventListener("input", function () { this.classList.remove("bad"); $("err").textContent = ""; });
})();
