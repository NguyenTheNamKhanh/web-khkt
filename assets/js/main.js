/* ==========================================
   GÓC LỚP 12 — CHỨC NĂNG CHUNG
   File: assets/js/main.js
   ========================================== */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initSmoothScrolling();
  initActiveNavigation();
  initCurrentYear();
});

/* ------------------------------------------
   1. MENU ĐIỆN THOẠI
   ------------------------------------------ */

function initMobileMenu() {
  const toggle = document.querySelector(
    ".menu-toggle, [data-menu-toggle], .nav-toggle"
  );

  const nav = document.querySelector(
    ".main-nav, .nav-links, [data-nav], .site-nav"
  );

  if (!toggle || !nav) return;

  // Thiết lập trạng thái ban đầu.
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Mở menu điều hướng");

  if (!nav.id) {
    nav.id = "main-navigation";
  }

  toggle.setAttribute("aria-controls", nav.id);

  function closeMenu() {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Mở menu điều hướng");
  }

  function toggleMenu() {
    const isOpen = nav.classList.toggle("is-open");

    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute(
      "aria-label",
      isOpen ? "Đóng menu điều hướng" : "Mở menu điều hướng"
    );
  }

  toggle.addEventListener("click", toggleMenu);

  // Đóng menu sau khi người dùng chọn một trang.
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Đóng menu bằng phím Escape.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      toggle.focus();
    }
  });

  // Khi chuyển lại sang màn hình lớn, đóng menu di động.
  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      closeMenu();
    }
  });

  // Đóng menu nếu bấm bên ngoài khu vực điều hướng.
  document.addEventListener("click", (event) => {
    const clickedInsideNav = nav.contains(event.target);
    const clickedToggle = toggle.contains(event.target);

    if (!clickedInsideNav && !clickedToggle) {
      closeMenu();
    }
  });
}

/* ------------------------------------------
   2. CUỘN MƯỢT ĐẾN NỘI DUNG TRONG TRANG
   ------------------------------------------ */

function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      if (!href || href === "#") return;

      let target;

      try {
        target = document.querySelector(href);
      } catch {
        return;
      }

      // Nếu không tìm thấy nội dung đích, giữ hành vi mặc định.
      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches
          ? "auto"
          : "smooth",
        block: "start"
      });

      // Cập nhật địa chỉ trang khi có thể.
      if (history.replaceState) {
        history.replaceState(null, "", href);
      }
    });
  });
}

/* ------------------------------------------
   3. ĐÁNH DẤU TRANG ĐANG ĐƯỢC XEM
   ------------------------------------------ */

function initActiveNavigation() {
  const links = document.querySelectorAll(
    ".main-nav a, .nav-links a, [data-nav] a, .site-nav a"
  );

  if (!links.length) return;

  const currentPath = normalizePath(window.location.pathname);

  links.forEach((link) => {
    const href = link.getAttribute("href");

    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:")
    ) {
      return;
    }

    let linkUrl;

    try {
      linkUrl = new URL(href, window.location.href);
    } catch {
      return;
    }

    // Chỉ xét liên kết trong cùng website.
    if (linkUrl.origin !== window.location.origin) return;

    const linkPath = normalizePath(linkUrl.pathname);
    const isCurrentPage = linkPath === currentPath;

    link.classList.toggle("active", isCurrentPage);

    if (isCurrentPage) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function normalizePath(path) {
  // Chuẩn hóa đường dẫn để so sánh các trang nhất quán.
  const cleaned = path.replace(/\/+/g, "/").replace(/\/$/, "");

  if (cleaned === "" || cleaned === "/index.html") {
    return "/";
  }

  return cleaned;
}

/* ------------------------------------------
   4. TỰ ĐỘNG CẬP NHẬT NĂM Ở CHÂN TRANG
   ------------------------------------------ */

function initCurrentYear() {
  const yearElements = document.querySelectorAll(
    "[data-current-year], #current-year"
  );

  yearElements.forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });
}
