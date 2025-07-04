document.addEventListener("DOMContentLoaded", function () {
  console.log("✨ 포트폴리오 페이지가 로드되었습니다! ✨");

  // 내비게이션 바 스크롤 효과
  const mainNavbar = document.getElementById("mainNavbar");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      // 50px 이상 스크롤 시
      mainNavbar.classList.add("scrolled");
    } else {
      mainNavbar.classList.remove("scrolled");
    }
  });

  // 부드러운 스크롤 (Bootstrap scrollspy와 연동)
  // Bootstrap 5의 data-bs-spy="scroll"과 data-bs-target="#mainNavbar"를 body에 추가하면
  // 스크롤 위치에 따라 nav-link의 active 클래스를 자동으로 토글해줍니다.
  // 수동으로 스크롤을 제어할 필요는 없지만, 클릭 시 부드럽게 이동하는 것은 유지합니다.
  document.querySelectorAll('a.nav-link[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      // Bootstrap collapse 메뉴가 열려있을 경우 닫기
      const navbarToggler = document.querySelector(".navbar-toggler");
      const navbarCollapse = document.getElementById("navbarNav");
      if (navbarToggler && navbarCollapse.classList.contains("show")) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
          toggle: false,
        });
        bsCollapse.hide();
      }

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // 스크롤 시 헤더 높이를 고려하여 오프셋 적용
        const headerOffset = mainNavbar.offsetHeight;
        const elementPosition =
          targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // 프로젝트 카드 호버 효과 (CSS로 처리)
  // 이미지 로딩 오류 처리 (선택 사항)
  document.querySelectorAll(".portfolio-item img").forEach((img) => {
    img.onerror = function () {
      img.src =
        "https://via.placeholder.com/400x250/cccccc/000000?text=Image+Not+Found"; // 대체 이미지
    };
  });
});
