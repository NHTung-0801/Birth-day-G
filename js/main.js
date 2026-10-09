"use strict";

  /* =========================================================
     1. CẤU HÌNH WEBSITE
  ========================================================= */

  /**
   * Mật khẩu mở khóa.
   * Bạn có thể đổi "2508" thành ngày sinh hoặc ngày kỷ niệm.
   */
  const CORRECT_PASSCODE = "2508";

  /**
   * Nội dung lá thư.
   * Có thể sửa trực tiếp nội dung trong dấu backtick.
   */
  const LETTER_CONTENT = `Gửi cậu, người tớ yêu thương nhất!

  Hôm nay là một ngày thật đặc biệt, bởi vì đây là ngày một
  người vô cùng tuyệt vời đã xuất hiện trên thế giới này.

  Cảm ơn cậu vì đã đến bên tớ, lắng nghe tớ, cùng tớ tạo nên
  thật nhiều kỷ niệm đẹp và khiến những ngày bình thường cũng
  trở nên đáng nhớ hơn.

  Tớ mong tuổi mới của cậu sẽ luôn ngập tràn tiếng cười, sự bình
  yên và những điều dịu dàng nhất. Mong mọi ước mơ của cậu đều
  sẽ từng chút một trở thành hiện thực.

  Và tớ hy vọng mình vẫn sẽ được ở bên cạnh cậu, cùng cậu đón
  thêm thật nhiều sinh nhật nữa.

  Chúc mừng sinh nhật người tớ yêu.
  Yêu cậu rất nhiều! ♥`;

  /**
   * Dữ liệu ảnh minh họa.
   *
   * Hiện tại website tự tạo ảnh SVG pastel từ các dữ liệu này.
   * Vì vậy không cần thêm photo-1.jpg, photo-2.jpg...
   *
   * Sau này, khi có ảnh thật, có thể thay thuộc tính `src`
   * bằng đường dẫn như:
   * assets/images/gallery/photo-1.jpg
   */
  const PLACEHOLDER_MEMORIES = [
      {
          title: "Our First Memory",
          subtitle: "Ngày mọi điều dễ thương bắt đầu",
          caption: "Một khoảnh khắc thật dịu dàng",
          colorOne: "#ffc3da",
          colorTwo: "#d8c7ff",
          accent: "#e65c91"
      },
      {
          title: "Sweet Moments",
          subtitle: "Những điều nhỏ bé nhưng thật đáng nhớ",
          caption: "Mỗi ngày bên cậu đều là một ngày đặc biệt",
          colorOne: "#ffd5c8",
          colorTwo: "#ffc0d8",
          accent: "#d95483"
      },
      {
          title: "You & Me",
          subtitle: "Cùng nhau viết nên câu chuyện của riêng mình",
          caption: "Nơi nào có cậu, nơi đó có niềm vui",
          colorOne: "#d9cbff",
          colorTwo: "#ffc7df",
          accent: "#9d6ed0"
      },
      {
          title: "Happy Days",
          subtitle: "Lưu giữ thật nhiều nụ cười",
          caption: "Cảm ơn cậu vì luôn khiến tớ mỉm cười",
          colorOne: "#ffe6ad",
          colorTwo: "#ffbfd7",
          accent: "#e67a91"
      },
      {
          title: "Lovely Journey",
          subtitle: "Cùng nhau đi qua những ngày bình thường",
          caption: "Mong hành trình này sẽ còn thật dài",
          colorOne: "#bfe7e2",
          colorTwo: "#ffd0e1",
          accent: "#d85e8e"
      },
      {
          title: "Forever Us",
          subtitle: "Một góc nhỏ chỉ dành cho hai chúng ta",
          caption: "Chúc cho chúng mình luôn hạnh phúc",
          colorOne: "#ffd1df",
          colorTwo: "#ead8ff",
          accent: "#ca4d7f"
      }
  ];

  /**
   * Số bong bóng được tạo khi bấm nút Gift.
   */
  const DEFAULT_BUBBLE_COUNT = 24;

  /* =========================================================
     CẤU HÌNH INTRO GALAXY

     - galaxyParticleCount: số hạt tạo hai nhánh dải ngân hà.
     - heartParticleCount: số hạt tạo trái tim ở tâm.
     - colors: bảng màu hạt. Có thể thay bằng mã HEX tùy ý.

     Canvas tự giảm số hạt trên điện thoại để giữ chuyển động mượt.
  ========================================================= */

  const GALAXY_CONFIG = {
      galaxyParticleCount: 1250,
      heartParticleCount: 480,
      backgroundStarCount: 170,
      colors: ["#ff2fb3", "#f27cff", "#b557ff", "#ffd1f0"],
      rotationSpeed: 0.000055,
      heartBeatSpeed: 0.0024,
      galaxyBranches: 3,
      galaxyTurns: 2.4
  };

  /* =========================================================
     2. TRUY CẬP CÁC PHẦN TỬ HTML
  ========================================================= */

  // Intro galaxy
  const galaxyIntro = document.getElementById("galaxyIntro");
  const galaxyCanvas = document.getElementById("galaxyCanvas");
  const orbitItems = Array.from(
      document.querySelectorAll(".orbit-item")
  );
  const enterUniverseButton = document.getElementById(
      "enterUniverseButton"
  );
  const introMessageModal = document.getElementById(
      "introMessageModal"
  );
  const introMessageTitle = document.getElementById(
      "introMessageTitle"
  );
  const introMessageText = document.getElementById(
      "introMessageText"
  );
  const closeIntroMessageButton = document.getElementById(
      "closeIntroMessageButton"
  );

  // Màn hình khóa
  const lockScreen = document.getElementById("lockScreen");
  const lockCard = document.getElementById("lockCard");
  const lockMessage = document.getElementById("lockMessage");

  const passcodeDots = Array.from(
      document.querySelectorAll(".passcode-dot")
  );

  const keypadNumberButtons = Array.from(
      document.querySelectorAll("[data-number]")
  );

  const clearPasscodeButton = document.getElementById(
      "clearPasscodeButton"
  );

  const deletePasscodeButton = document.getElementById(
      "deletePasscodeButton"
  );

  // Dashboard
  const mainDashboard =
  document.getElementById("mainDashboard");

  const menuButtons = Array.from(
      document.querySelectorAll(".menu-button[data-modal]")
  );

  // Modal
  const modals = Array.from(
      document.querySelectorAll(".modal")
  );

  const closeModalElements = Array.from(
      document.querySelectorAll("[data-close-modal]")
  );

  // Music preview
  const vinylRecord = document.getElementById("vinylRecord");

  const musicPreviewButton = document.getElementById(
      "musicPreviewButton"
  );

  // Letter
  const envelope = document.getElementById("envelope");
  const envelopeHint = document.getElementById("envelopeHint");
  const typedLetter = document.getElementById("typedLetter");
  const typingCursor = document.getElementById("typingCursor");

  // Gallery
  const galleryImage = document.getElementById("galleryImage");

  const galleryMiniLabel = document.getElementById(
      "galleryMiniLabel"
  );

  const galleryCaption =
  document.getElementById("galleryCaption");
  const galleryCounter =
  document.getElementById("galleryCounter");
  const galleryDots = document.getElementById("galleryDots");

  const previousImageButton = document.getElementById(
      "previousImageButton"
  );

  const nextImageButton = document.getElementById(
      "nextImageButton"
  );

  // Gift
  const giftBox = document.getElementById("giftBox");

  const releaseBubblesButton = document.getElementById(
      "releaseBubblesButton"
  );

  const giftBubbleLayer = document.getElementById(
      "giftBubbleLayer"
  );

  // Trang trí và thông báo
  const heartBackground = document.getElementById(
      "heartBackground"
  );

  const toast = document.getElementById("toast");

  // Các ảnh avatar
  const lockAvatar = document.getElementById("lockAvatar");

  const dashboardAvatar = document.getElementById(
      "dashboardAvatar"
  );

  const vinylAvatar = document.getElementById("vinylAvatar");

  /* =========================================================
     3. BIẾN TRẠNG THÁI
  ========================================================= */

  let enteredPasscode = "";

  let activeModal = null;
  let lastFocusedElement = null;

  let currentGalleryIndex = 0;
  let galleryChangeTimer = null;

  let letterTypingTimer = null;
  let letterCharacterIndex = 0;
  let isEnvelopeOpened = false;

  let toastTimer = null;
  let isMusicPreviewActive = false;

  // Trạng thái riêng của Intro Canvas.
  let galaxyAnimationFrame = null;
  let galaxyParticles = [];
  let heartParticles = [];
  let backgroundStars = [];
  let galaxyStartTime = 0;
  let isGalaxyIntroActive = true;
  let introLastFocusedElement = null;

  const introPointer = {
      isDragging: false,
      startX: 0,
      startY: 0,
      dragRotationX: 0,
      targetDragRotationX: 0,
      dragRotationY: 0,
      targetDragRotationY: 0,
      velocity: 0
  };

  /* =========================================================
     4. HÀM HỖ TRỢ CHUNG
  ========================================================= */

  /**
   * Sinh số ngẫu nhiên trong khoảng min đến max.
   *
   * @param {number} min Giá trị nhỏ nhất.
   * @param {number} max Giá trị lớn nhất.
   * @returns {number}
   */
  function randomBetween(min, max) {
      return Math.random() * (max - min) + min;
  }

  /* =========================================================
     INTRO CANVAS: GALAXY + TRÁI TIM 3D GIẢ LẬP
  ========================================================= */

  /** Chuyển mã HEX sang chuỗi RGB để vẽ particle có alpha. */
  function hexToRgb(hexColor) {
      const hex = hexColor.replace("#", "");
      const value = Number.parseInt(hex, 16);

      return {
          red: (value >> 16) & 255,
          green: (value >> 8) & 255,
          blue: value & 255
      };
  }

  /**
   * Tạo dữ liệu dải ngân hà một lần, tránh cấp phát object trong
   * mỗi frame. `radius` phân bố theo căn bậc hai để lõi sáng dày,
   * trong khi `branch` chia particle thành các nhánh xoắn.
   */
  function createGalaxyParticles() {
      const isSmallScreen = window.innerWidth < 700;
      const performanceRatio = isSmallScreen ? 0.62 : 1;
      const galaxyCount = Math.round(
          GALAXY_CONFIG.galaxyParticleCount * performanceRatio
      );
      const heartCount = Math.round(
          GALAXY_CONFIG.heartParticleCount * performanceRatio
      );

      galaxyParticles = [];
      heartParticles = [];
      backgroundStars = [];

      for (let index = 0; index < galaxyCount; index += 1) {
          const radius = Math.pow(Math.random(), 0.72);
          const branch = index % GALAXY_CONFIG.galaxyBranches;
          const branchAngle =
              (branch / GALAXY_CONFIG.galaxyBranches) * Math.PI * 2;
          const spiralAngle =
              radius * GALAXY_CONFIG.galaxyTurns * Math.PI * 2 +
              branchAngle + randomBetween(-0.24, 0.24);
          const spread = (1 - radius * 0.52) * randomBetween(-0.14, 0.14);

          galaxyParticles.push({
              radius,
              angle: spiralAngle,
              spread,
              height: randomBetween(-0.18, 0.18) * (1 - radius * 0.45),
              size: randomBetween(0.55, 2.05),
              alpha: randomBetween(0.28, 0.95),
              twinkle: randomBetween(0, Math.PI * 2),
              color: hexToRgb(
                  GALAXY_CONFIG.colors[
                      Math.floor(Math.random() * GALAXY_CONFIG.colors.length)
                  ]
              )
          });
      }

      // Công thức parametric trái tim cổ điển, thêm trục Z để tạo khối.
      for (let index = 0; index < heartCount; index += 1) {
          const angle = randomBetween(0, Math.PI * 2);
          const fill = Math.sqrt(Math.random());
          const x = 16 * Math.pow(Math.sin(angle), 3) / 17;
          const y = -(
              13 * Math.cos(angle) -
              5 * Math.cos(2 * angle) -
              2 * Math.cos(3 * angle) -
              Math.cos(4 * angle)
          ) / 17;

          heartParticles.push({
              x: x * fill,
              y: y * fill,
              z: randomBetween(-0.32, 0.32) * (1 - fill * 0.55),
              size: randomBetween(0.65, 1.85),
              alpha: randomBetween(0.48, 1),
              twinkle: randomBetween(0, Math.PI * 2),
              color: hexToRgb(
                  Math.random() > 0.2 ? "#ff4fbd" : "#f5b4ff"
              )
          });
      }

      for (
          let index = 0;
          index < GALAXY_CONFIG.backgroundStarCount;
          index += 1
      ) {
          backgroundStars.push({
              x: Math.random(),
              y: Math.random(),
              size: randomBetween(0.35, 1.35),
              alpha: randomBetween(0.12, 0.65),
              twinkle: randomBetween(0, Math.PI * 2)
          });
      }
  }

  /** Đặt kích thước bitmap Canvas theo DPR nhưng giới hạn để nhẹ GPU. */
  function resizeGalaxyCanvas() {
      if (!galaxyCanvas) {
          return;
      }

      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75);
      const bounds = galaxyCanvas.getBoundingClientRect();

      galaxyCanvas.width = Math.max(1, Math.round(bounds.width * pixelRatio));
      galaxyCanvas.height = Math.max(1, Math.round(bounds.height * pixelRatio));
  }

  /** Vẽ một hạt có lõi sáng; hạt lớn có thêm quầng glow. */
  function drawGlowParticle(context, x, y, radius, color, alpha) {
      if (alpha <= 0.015 || radius <= 0.1) {
          return;
      }

      if (radius > 1.7) {
          context.fillStyle =
              `rgba(${color.red},${color.green},${color.blue},${alpha * 0.13})`;
          context.beginPath();
          context.arc(x, y, radius * 3.5, 0, Math.PI * 2);
          context.fill();
      }

      context.fillStyle =
          `rgba(${color.red},${color.green},${color.blue},${alpha})`;
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
  }

  /** Cập nhật các text/icon theo quỹ đạo ellipse có chiều sâu. */
  function updateOrbitItems(elapsed, width, height) {
      const radiusX = Math.min(width * 0.39, 480);
      
      const dynamicTiltY = 0.255 + introPointer.dragRotationY * 0.2;
      const radiusY = Math.min(height * dynamicTiltY, 235);
      
      const orbitSpeed = elapsed * 0.000085 + introPointer.dragRotationX;

      orbitItems.forEach((item, index) => {
          const angle =
              orbitSpeed +
              (index / Math.max(orbitItems.length, 1)) * Math.PI * 2;
          const depth = (Math.sin(angle) + 1) / 2;
          const x = Math.cos(angle) * radiusX;
          const y = Math.sin(angle) * radiusY + Math.cos(angle * 2) * 9;
          const scale = 0.7 + depth * 0.38;

          item.style.transform =
              `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) scale(${scale})`;
          item.style.opacity = String(0.38 + depth * 0.62);
          item.style.zIndex = String(5 + Math.round(depth * 10));
      });
  }

  /** Vòng lặp render Canvas, chỉ chạy khi Intro còn hiển thị. */
  function renderGalaxyFrame(timestamp) {
      if (!isGalaxyIntroActive || !galaxyCanvas) {
          return;
      }

      if (!galaxyStartTime) {
          galaxyStartTime = timestamp;
      }

      const elapsed = timestamp - galaxyStartTime;
      const context = galaxyCanvas.getContext("2d", { alpha: false });
      const width = galaxyCanvas.width;
      const height = galaxyCanvas.height;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75);
      const cssWidth = width / pixelRatio;
      const cssHeight = height / pixelRatio;
      const centerX = cssWidth * 0.5;
      const centerY = cssHeight * 0.52;
      const galaxyScale = Math.min(cssWidth, cssHeight) * 0.43;

      if (!introPointer.isDragging) {
          introPointer.targetDragRotationX += introPointer.velocity;
          introPointer.velocity *= 0.95; // friction
      }

      introPointer.dragRotationX += (introPointer.targetDragRotationX - introPointer.dragRotationX) * 0.15;
      introPointer.dragRotationY += (introPointer.targetDragRotationY - introPointer.dragRotationY) * 0.15;

      const rotation = elapsed * GALAXY_CONFIG.rotationSpeed + introPointer.dragRotationX;

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.globalCompositeOperation = "source-over";
      context.fillStyle = "#020105";
      context.fillRect(0, 0, cssWidth, cssHeight);
      context.globalCompositeOperation = "lighter";

      backgroundStars.forEach((star) => {
          const flicker = 0.62 + Math.sin(elapsed * 0.0015 + star.twinkle) * 0.38;
          drawGlowParticle(
              context,
              star.x * cssWidth,
              star.y * cssHeight,
              star.size,
              { red: 241, green: 195, blue: 255 },
              star.alpha * flicker
          );
      });

      galaxyParticles.forEach((particle) => {
          const angle = particle.angle + rotation;
          const radialDistance = particle.radius + particle.spread;
          const localX = Math.cos(angle) * radialDistance;
          const localY = Math.sin(angle) * radialDistance;
          const perspective = 1 + particle.height * 0.3;
          
          const dynamicTiltY = 0.34 + introPointer.dragRotationY * 0.3;
          const x = centerX + localX * galaxyScale * perspective;
          const y =
              centerY +
              (localY * dynamicTiltY + particle.height) * galaxyScale * perspective;
          const flicker =
              0.72 + Math.sin(elapsed * 0.002 + particle.twinkle) * 0.28;
          const depthAlpha = 0.65 + (particle.height + 0.18) * 0.8;

          drawGlowParticle(
              context,
              x,
              y,
              particle.size * perspective,
              particle.color,
              particle.alpha * flicker * depthAlpha
          );
      });

      // Glow mềm ở lõi giúp trái tim hòa vào dải ngân hà.
      const coreGradient = context.createRadialGradient(
          centerX,
          centerY,
          0,
          centerX,
          centerY,
          galaxyScale * 0.3
      );
      coreGradient.addColorStop(0, "rgba(255,80,193,0.2)");
      coreGradient.addColorStop(0.35, "rgba(176,51,255,0.08)");
      coreGradient.addColorStop(1, "rgba(0,0,0,0)");
      context.fillStyle = coreGradient;
      context.beginPath();
      context.arc(centerX, centerY, galaxyScale * 0.3, 0, Math.PI * 2);
      context.fill();

      const beat =
          1 +
          Math.pow(Math.max(0, Math.sin(elapsed * GALAXY_CONFIG.heartBeatSpeed)), 8) * 0.12;
      const heartScale = Math.min(cssWidth, cssHeight) * 0.105 * beat;
      
      const heartRotation = Math.sin(elapsed * 0.00045) * 0.34 + introPointer.dragRotationX;
      const cosRotation = Math.cos(heartRotation);
      const sinRotation = Math.sin(heartRotation);

      heartParticles.forEach((particle) => {
          const rotatedX =
              particle.x * cosRotation - particle.z * sinRotation;
          const rotatedZ =
              particle.x * sinRotation + particle.z * cosRotation;
          const perspective = 1 + rotatedZ * 0.32;
          const flicker =
              0.78 + Math.sin(elapsed * 0.003 + particle.twinkle) * 0.22;

          drawGlowParticle(
              context,
              centerX + rotatedX * heartScale * perspective,
              centerY + particle.y * heartScale * perspective,
              particle.size * perspective * beat,
              particle.color,
              particle.alpha * flicker
          );
      });

      updateOrbitItems(elapsed, cssWidth, cssHeight);
      galaxyAnimationFrame = window.requestAnimationFrame(renderGalaxyFrame);
  }

  function handleIntroPointerDown(event) {
      introPointer.isDragging = true;
      introPointer.startX = event.clientX;
      introPointer.startY = event.clientY;
      introPointer.velocity = 0;
  }

  function handleIntroPointerMove(event) {
      if (!introPointer.isDragging) return;
      
      const deltaX = event.clientX - introPointer.startX;
      const deltaY = event.clientY - introPointer.startY;
      
      const rotXChange = deltaX * 0.004;
      const rotYChange = deltaY * 0.003;
      
      introPointer.targetDragRotationX += rotXChange;
      introPointer.targetDragRotationY = Math.max(-0.6, Math.min(0.6, introPointer.targetDragRotationY + rotYChange));
      
      introPointer.velocity = rotXChange;
      
      introPointer.startX = event.clientX;
      introPointer.startY = event.clientY;
  }

  function handleIntroPointerUp() {
      introPointer.isDragging = false;
  }

  function openIntroMessage(item) {
      if (!introMessageModal) {
          return;
      }

      introLastFocusedElement = item;
      introMessageTitle.textContent = item.dataset.introTitle || "For you";
      introMessageText.textContent = item.dataset.introMessage || "";
      introMessageModal.classList.add("is-open");
      introMessageModal.setAttribute("aria-hidden", "false");

      window.setTimeout(() => closeIntroMessageButton.focus(), 100);
  }

  function closeIntroMessage() {
      if (!introMessageModal) {
          return;
      }

      introMessageModal.classList.remove("is-open");
      introMessageModal.setAttribute("aria-hidden", "true");

      if (introLastFocusedElement) {
          introLastFocusedElement.focus();
      }
  }

  /** Zoom vào trái tim rồi mới để lộ màn hình mật mã bên dưới. */
  function enterOurUniverse() {
      if (!isGalaxyIntroActive) {
          return;
      }

      closeIntroMessage();
      galaxyIntro.classList.add("is-entering");

      window.setTimeout(() => {
          galaxyIntro.classList.add("is-hidden");
          galaxyIntro.setAttribute("aria-hidden", "true");
          isGalaxyIntroActive = false;
          window.cancelAnimationFrame(galaxyAnimationFrame);
          lockScreen.focus?.();

          if (keypadNumberButtons[0]) {
              keypadNumberButtons[0].focus();
          }
      }, 1050);
  }

  function handleIntroKeyboard(event) {
      if (!isGalaxyIntroActive) {
          return;
      }

      if (
          event.key === "Escape" &&
          introMessageModal.classList.contains("is-open")
      ) {
          event.preventDefault();
          closeIntroMessage();
      }
  }

  function initializeGalaxyIntro() {
      if (!galaxyIntro || !galaxyCanvas) {
          isGalaxyIntroActive = false;
          return;
      }

      galaxyCanvas.style.touchAction = "none";

      createGalaxyParticles();
      resizeGalaxyCanvas();
      galaxyStartTime = 0;
      galaxyAnimationFrame = window.requestAnimationFrame(renderGalaxyFrame);

      orbitItems.forEach((item) => {
          item.addEventListener("click", () => openIntroMessage(item));
      });

      enterUniverseButton.addEventListener("click", enterOurUniverse);
      closeIntroMessageButton.addEventListener("click", closeIntroMessage);
      introMessageModal
          .querySelector("[data-close-intro-message]")
          .addEventListener("click", closeIntroMessage);

      const introSection = document.getElementById("galaxyIntro");
      if (introSection) {
          introSection.addEventListener("pointerdown", handleIntroPointerDown, { passive: true });
          window.addEventListener("pointermove", handleIntroPointerMove, { passive: true });
          window.addEventListener("pointerup", handleIntroPointerUp, { passive: true });
          window.addEventListener("pointercancel", handleIntroPointerUp, { passive: true });
      }
      window.addEventListener("resize", resizeGalaxyCanvas, {
          passive: true
      });
      document.addEventListener("keydown", handleIntroKeyboard);
  }

  /**
   * Hiển thị thông báo nhỏ ở cuối màn hình.
   *
   * @param {string} message Nội dung thông báo.
   */
  function showToast(message) {
      window.clearTimeout(toastTimer);

      toast.textContent = message;
      toast.classList.add("is-visible");

      toastTimer = window.setTimeout(() => {
          toast.classList.remove("is-visible");
      }, 2600);
  }

  /**
   * Escape một chuỗi trước khi đưa vào SVG.
   *
   * @param {string} value Chuỗi cần xử lý.
   * @returns {string}
   */
  function escapeSvgText(value) {
      return value
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;")
          .replaceAll("'", "&apos;");
  }

  /* =========================================================
     5. TẠO ẢNH MINH HỌA SVG
  ========================================================= */

  /**
   * Tạo ảnh minh họa pastel dạng SVG Data URL.
   *
   * Ưu điểm:
   * - Không cần tải ảnh từ Internet.
   * - Không bị lỗi khi chưa có thư mục gallery.
   * - Có thể thay bằng ảnh thật sau này.
   *
   * @param {object} memory Dữ liệu ảnh minh họa.
   * @param {number} index Chỉ số ảnh.
   * @returns {string} Data URL dùng được cho thuộc tính src.
   */
  function createPlaceholderImage(memory, index) {
      const title = escapeSvgText(memory.title);
      const subtitle = escapeSvgText(memory.subtitle);
      const number = String(index + 1).padStart(2, "0");

      const svg = `
          <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1200"
              height="750"
              viewBox="0 0 1200 750"
          >
              <defs>
                  <linearGradient
                      id="backgroundGradient"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="1"
                  >
                      <stop offset="0%" stop-
                      color="${memory.colorOne}" />
                      <stop offset="100%" stop-
                      color="${memory.colorTwo}" />
                  </linearGradient>

                  <radialGradient id="lightGradient">
                      <stop
                          offset="0%"
                          stop-color="#ffffff"
                          stop-opacity="0.8"
                      />
                      <stop
                          offset="100%"
                          stop-color="#ffffff"
                          stop-opacity="0"
                      />
                  </radialGradient>

                  <filter id="softShadow">
                      <feDropShadow
                          dx="0"
                          dy="20"
                          stdDeviation="20"
                          flood-color="#9f5276"
                          flood-opacity="0.2"
                      />
                  </filter>
              </defs>

              <rect
                  width="1200"
                  height="750"
                  rx="40"
                  fill="url(#backgroundGradient)"
              />

              <circle
                  cx="160"
                  cy="120"
                  r="230"
                  fill="url(#lightGradient)"
              />

              <circle
                  cx="1090"
                  cy="690"
                  r="300"
                  fill="url(#lightGradient)"
                  opacity="0.6"
              />

              <circle
                  cx="1010"
                  cy="125"
                  r="95"
                  fill="#ffffff"
                  fill-opacity="0.2"
              />

              <circle
                  cx="110"
                  cy="620"
                  r="65"
                  fill="#ffffff"
                  fill-opacity="0.22"
              />

              <g
                  transform="translate(600 305)"
                  filter="url(#softShadow)"
              >
                  <path
                      d="
                          M 0 145
                          C -42 105 -190 15 -190 -85
                          C -190 -175 -80 -205 0 -115
                          C 80 -205 190 -175 190 -85
                          C 190 15 42 105 0 145
                          Z
                      "
                      fill="#ffffff"
                      fill-opacity="0.82"
                  />

                  <path
                      d="
                          M 0 105
                          C -30 75 -135 10 -135 -62
                          C -135 -125 -57 -145 0 -80
                          C 57 -145 135 -125 135 -62
                          C 135 10 30 75 0 105
                          Z
                      "
                      fill="${memory.accent}"
                      fill-opacity="0.88"
                  />

                  <text
                      x="0"
                      y="-15"
                      text-anchor="middle"
                      fill="#ffffff"
                      font-family="Arial, sans-serif"
                      font-size="65"
                      font-weight="700"
                  >
                      ${number}
                  </text>
              </g>

              <g fill="#ffffff" fill-opacity="0.8">
                  <text
                      x="95"
                      y="90"
                      font-family="Arial, sans-serif"
                      font-size="26"
                  >
                      ♥
                  </text>

                  <text
                      x="1050"
                      y="220"
                      font-family="Arial, sans-serif"
                      font-size="32"
                  >
                      ✦
                  </text>

                  <text
                      x="200"
                      y="580"
                      font-family="Arial, sans-serif"
                      font-size="34"
                  >
                      ♥
                  </text>

                  <text
                      x="950"
                      y="590"
                      font-family="Arial, sans-serif"
                      font-size="24"
                  >
                      ♥
                  </text>
              </g>

              <text
                  x="600"
                  y="570"
                  text-anchor="middle"
                  fill="#70445a"
                  font-family="Georgia, serif"
                  font-size="52"
                  font-weight="700"
              >
                  ${title}
              </text>

              <text
                  x="600"
                  y="625"
                  text-anchor="middle"
                  fill="#70445a"
                  fill-opacity="0.72"
                  font-family="Arial, sans-serif"
                  font-size="24"
              >
                  ${subtitle}
              </text>
          </svg>
      `;

      return `data:image/svg+xml;charset=UTF-8,
      ${encodeURIComponent(svg)}`;
  }

  /**
   * Tạo ảnh avatar mặc định nếu image_c5395a.png chưa tồn tại.
   *
   * @returns {string} Data URL của avatar mặc định.
   */
  function createDefaultAvatar() {
      const svg = `
          <svg
              xmlns="http://www.w3.org/2000/svg"
              width="500"
              height="500"
              viewBox="0 0 500 500"
          >
              <defs>
                  <linearGradient id="avatarBg" x1="0" y1="0"
                  x2="1" y2="1">
                      <stop offset="0%" stop-color="#ffc2da" />
                      <stop offset="100%" stop-color="#d9c8ff" /
                      >
                  </linearGradient>
              </defs>

              <rect width="500" height="500"
              fill="url(#avatarBg)" />

              <circle
                  cx="105"
                  cy="95"
                  r="85"
                  fill="#ffffff"
                  fill-opacity="0.24"
              />

              <circle
                  cx="430"
                  cy="390"
                  r="125"
                  fill="#ffffff"
                  fill-opacity="0.2"
              />

              <path
                  d="
                      M 250 390
                      C 205 350 90 265 90 170
                      C 90 90 185 65 250 145
                      C 315 65 410 90 410 170
                      C 410 265 295 350 250 390
                      Z
                  "
                  fill="#ffffff"
                  fill-opacity="0.88"
              />

              <path
                  d="
                      M 250 335
                      C 220 308 145 250 145 188
                      C 145 136 207 120 250 172
                      C 293 120 355 136 355 188
                      C 355 250 280 308 250 335
                      Z
                  "
                  fill="#eb6799"
              />

              <text
                  x="250"
                  y="455"
                  text-anchor="middle"
                  fill="#70445a"
                  font-family="Arial, sans-serif"
                  font-size="25"
                  font-weight="700"
              >
                  MY LOVE
              </text>
          </svg>
      `;

      return `data:image/svg+xml;charset=UTF-8,
      ${encodeURIComponent(svg)}`;
  }

  /**
   * Gắn ảnh mặc định nếu file image_c5395a.png chưa tồn tại.
   */
  function setupAvatarFallbacks() {
      const avatarElements = [
          lockAvatar,
          dashboardAvatar,
          vinylAvatar
      ];

      avatarElements.forEach((image) => {
          if (!image) {
              return;
          }

          image.addEventListener("error", () => {
              image.src = createDefaultAvatar();
          });
      });
  }

  /* =========================================================
     6. TẠO TRÁI TIM BAY TRÊN NỀN
  ========================================================= */

  /**
   * Tạo các trái tim nhỏ trang trí nền.
   */
  function createBackgroundHearts() {
      const totalHearts = window.innerWidth < 600 ? 14 : 22;

      for (let index = 0; index < totalHearts; index += 1) {
          const heart = document.createElement("span");

          heart.className = "background-heart";
          heart.textContent = "♥";

          heart.style.left = `${randomBetween(0, 100)}%`;
          heart.style.fontSize = `${randomBetween(12, 34)}px`;

          heart.style.setProperty(
              "--heart-duration",
              `${randomBetween(11, 21)}s`
          );

          heart.style.setProperty(
              "--heart-delay",
              `${randomBetween(-20, 0)}s`
          );

          heartBackground.appendChild(heart);
      }
  }

  /* =========================================================
     7. MÀN HÌNH MẬT KHẨU
  ========================================================= */

  /**
   * Cập nhật trạng thái các chấm mật khẩu.
   *
   * @param {boolean} showError Có hiển thị trạng thái lỗi
   không.
   */
  function updatePasscodeDots(showError = false) {
      passcodeDots.forEach((dot, index) => {
          const isFilled = index < enteredPasscode.length;

          dot.classList.toggle("is-filled", isFilled);
          dot.classList.toggle(
              "is-error",
              showError && isFilled
          );
      });
  }

  /**
   * Đưa thông báo về trạng thái ban đầu.
   */
  function resetLockMessage() {
      lockMessage.textContent = "Gợi ý: Một ngày thật đặc biệt";

      lockMessage.classList.remove(
          "is-error",
          "is-success"
      );
  }

  /**
   * Thêm một chữ số vào mật khẩu.
   *
   * @param {string} number Chữ số được bấm.
   */
  function appendPasscodeNumber(number) {
      if (
          enteredPasscode.length >=
          CORRECT_PASSCODE.length
      ) {
          return;
      }

      resetLockMessage();

      enteredPasscode += number;
      updatePasscodeDots();

      /**
       * Khi đủ bốn số, website tự kiểm tra mật khẩu.
       */
      if (
          enteredPasscode.length ===
          CORRECT_PASSCODE.length
      ) {
          window.setTimeout(validatePasscode, 170);
      }
  }

  /**
   * Xóa toàn bộ mật khẩu.
   */
  function clearPasscode() {
      enteredPasscode = "";
      updatePasscodeDots();
      resetLockMessage();
  }

  /**
   * Xóa chữ số cuối cùng.
   */
  function deleteLastPasscodeNumber() {
      enteredPasscode = enteredPasscode.slice(0, -1);
      updatePasscodeDots();
      resetLockMessage();
  }

  /**
   * Kiểm tra mật khẩu.
   */
  function validatePasscode() {
      if (enteredPasscode === CORRECT_PASSCODE) {
          unlockWebsite();
          return;
      }

      handleWrongPasscode();
  }

  /**
   * Xử lý trường hợp nhập sai mật khẩu.
   */
  function handleWrongPasscode() {
      lockMessage.textContent =
          "Mật mã chưa đúng rồi, thử lại nhé!";

      lockMessage.classList.add("is-error");
      lockMessage.classList.remove("is-success");

      updatePasscodeDots(true);

      /**
       * Xóa rồi thêm lại class để animation rung có thể
       * chạy nhiều lần liên tiếp.
       */
      lockCard.classList.remove("is-shaking");
      void lockCard.offsetWidth;
      lockCard.classList.add("is-shaking");

      /**
       * Rung nhẹ trên thiết bị hỗ trợ Vibration API.
       */
      if ("vibrate" in navigator) {
          navigator.vibrate([80, 50, 80]);
      }

      window.setTimeout(() => {
          enteredPasscode = "";
          updatePasscodeDots();
          lockCard.classList.remove("is-shaking");
      }, 650);
  }

  /**
   * Mở khóa và hiển thị dashboard.
   */
  function unlockWebsite() {
      lockMessage.textContent =
          "Đúng rồi! Chào mừng tình yêu của tớ ♥";

      lockMessage.classList.add("is-success");
      lockMessage.classList.remove("is-error");

      lockScreen.classList.add("is-unlocking");
      mainDashboard.classList.add("is-visible");

      mainDashboard.setAttribute("aria-hidden", "false");

      window.setTimeout(() => {
          lockScreen.setAttribute("aria-hidden", "true");

          if (menuButtons[0]) {
              menuButtons[0].focus();
          }
      }, 850);
  }

  /**
   * Hỗ trợ nhập mật khẩu bằng bàn phím vật lý.
   *
   * @param {KeyboardEvent} event Sự kiện bàn phím.
   */
  function handlePasscodeKeyboard(event) {
      if (
          isGalaxyIntroActive ||
          lockScreen.classList.contains("is-unlocking")
      ) {
          return;
      }

      if (/^\d$/.test(event.key)) {
          appendPasscodeNumber(event.key);
          return;
      }

      if (event.key === "Backspace") {
          deleteLastPasscodeNumber();
          return;
      }

      if (event.key === "Escape") {
          clearPasscode();
      }
  }

  /* =========================================================
     8. QUẢN LÝ MODAL
  ========================================================= */

  /**
   * Mở modal theo id.
   *
   * @param {string} modalId ID của modal cần mở.
   */
  function openModal(modalId) {
      const modal = document.getElementById(modalId);

      if (!modal) {
          return;
      }

      if (activeModal && activeModal !== modal) {
          closeModal(activeModal);
      }

      lastFocusedElement = document.activeElement;
      activeModal = modal;

      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");

      document.body.classList.add("modal-open");

      const closeButton = modal.querySelector(".modal-close");

      window.setTimeout(() => {
          if (closeButton) {
              closeButton.focus();
          }
      }, 100);

      if (modalId === "imageModal") {
          renderGallery(false);
      }

      if (modalId === "giftModal") {
          window.setTimeout(() => {
              releaseGiftBubbles(10);
          }, 350);
      }
  }

  /**
   * Đóng modal.
   *
   * @param {HTMLElement|null} modal Modal cần đóng.
   */
  function closeModal(modal = activeModal) {
      if (!modal) {
          return;
      }

      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");

      if (modal.id === "musicModal") {
          stopMusicPreview();
      }

      if (modal.id === "letterModal") {
          resetEnvelope();
      }

      if (modal.id === "giftModal") {
          clearGiftBubbles();
      }

      if (activeModal === modal) {
          activeModal = null;
      }

      const hasOpenModal = modals.some((item) => {
          return item.classList.contains("is-open");
      });

      if (!hasOpenModal) {
          document.body.classList.remove("modal-open");
      }

      if (
          lastFocusedElement &&
          typeof lastFocusedElement.focus === "function"
      ) {
          lastFocusedElement.focus();
      }
  }

  /**
   * Giữ focus trong modal khi người dùng bấm Tab.
   *
   * @param {KeyboardEvent} event Sự kiện bàn phím.
   */
  function trapModalFocus(event) {
      if (!activeModal || event.key !== "Tab") {
          return;
      }

      const focusableElements = Array.from(
          activeModal.querySelectorAll(
              [
                  "button:not([disabled])",
                  "[href]",
                  "input:not([disabled])",
                  "[tabindex]:not([tabindex='-1'])"
              ].join(",")
          )
      ).filter((element) => {
          return element.offsetParent !== null;
      });

      if (focusableElements.length === 0) {
          return;
      }

      const firstElement = focusableElements[0];

      const lastElement =
          focusableElements[focusableElements.length - 1];

      if (
          event.shiftKey &&
          document.activeElement === firstElement
      ) {
          event.preventDefault();
          lastElement.focus();
      } else if (
          !event.shiftKey &&
          document.activeElement === lastElement
      ) {
          event.preventDefault();
          firstElement.focus();
      }
  }

  /**
   * Điều khiển modal bằng bàn phím.
   *
   * @param {KeyboardEvent} event Sự kiện bàn phím.
   */
  function handleModalKeyboard(event) {
      if (!activeModal) {
          return;
      }

      if (event.key === "Escape") {
          closeModal(activeModal);
          return;
      }

      trapModalFocus(event);

      if (activeModal.id === "imageModal") {
          if (event.key === "ArrowLeft") {
              showPreviousImage();
          }

          if (event.key === "ArrowRight") {
              showNextImage();
          }
      }
  }

  /* =========================================================
     9. MUSIC PREVIEW
     Chưa phát âm thanh, chỉ chạy hiệu ứng đĩa than.
  ========================================================= */

  /**
   * Bật hoặc tắt hiệu ứng đĩa than.
   */
  function toggleMusicPreview() {
      isMusicPreviewActive = !isMusicPreviewActive;

      vinylRecord.classList.toggle(
          "is-spinning",
          isMusicPreviewActive
      );

      musicPreviewButton.classList.toggle(
          "is-active",
          isMusicPreviewActive
      );

      musicPreviewButton.innerHTML = isMusicPreviewActive
          ? '<span aria-hidden="true">❚❚</span> Dừng hiệu ứng'
          : '<span aria-hidden="true">▶</span> Xem hiệu ứng';

      if (isMusicPreviewActive) {
          showToast(
              "Hiện tại mới có hiệu ứng. Nhạc sẽ được thêm sau nhé!"
          );
      }
  }

  /**
   * Dừng hiệu ứng khi đóng modal.
   */
  function stopMusicPreview() {
      isMusicPreviewActive = false;

      vinylRecord.classList.remove("is-spinning");
      musicPreviewButton.classList.remove("is-active");

      musicPreviewButton.innerHTML =
          '<span aria-hidden="true">▶</span> Xem hiệu ứng';
  }

  /* =========================================================
     10. PHONG THƯ VÀ TYPEWRITER
  ========================================================= */

  /**
   * Tạo hiệu ứng rung nhẹ thay cho âm thanh pop.
   *
   * Hiện tại website chưa dùng pop.mp3 theo yêu cầu mới.
   */
  function createEnvelopePopEffect() {
      envelope.animate(
          [
              {
                  transform: "translateY(0) scale(1)"
              },
              {
                  transform: "translateY(-8px) scale(1.02)"
              },
              {
                  transform: "translateY(0) scale(1)"
              }
          ],
          {
              duration: 420,
              easing: "ease-out"
          }
      );
  }

  /**
   * Gõ từng ký tự của lá thư.
   */
  function typeNextLetterCharacter() {
      if (letterCharacterIndex >= LETTER_CONTENT.length) {
          typingCursor.classList.remove("is-visible");
          letterTypingTimer = null;
          return;
      }

      const currentCharacter = LETTER_CONTENT.charAt(
          letterCharacterIndex
      );

      typedLetter.textContent += currentCharacter;
      letterCharacterIndex += 1;

      let typingDelay = 30;

      if (currentCharacter === "\n") {
          typingDelay = 170;
      } else if (/[.!?]/.test(currentCharacter)) {
          typingDelay = 115;
      } else if (currentCharacter === ",") {
          typingDelay = 65;
      }

      letterTypingTimer = window.setTimeout(
          typeNextLetterCharacter,
          typingDelay
      );
  }

  /**
   * Mở phong thư.
   *
   * Hàm được gắn vào window để có thể gọi trực tiếp:
   * openEnvelope()
   */
  function openEnvelope() {
      if (isEnvelopeOpened) {
          return;
      }

      isEnvelopeOpened = true;

      envelope.classList.add("is-open");
      envelope.setAttribute(
          "aria-label",
          "Phong thư đã mở"
      );

      envelopeHint.classList.add("is-hidden");

      createEnvelopePopEffect();

      typedLetter.textContent = "";
      letterCharacterIndex = 0;

      window.clearTimeout(letterTypingTimer);

      /**
       * Đợi phong bì mở xong rồi mới bắt đầu gõ chữ.
       */
      letterTypingTimer = window.setTimeout(() => {
          typingCursor.classList.add("is-visible");
          typeNextLetterCharacter();
      }, 720);
  }

  // Cho phép gọi openEnvelope() trong phạm vi toàn cục.
  window.openEnvelope = openEnvelope;

  /**
   * Đưa phong thư về trạng thái đóng.
   */
  function resetEnvelope() {
      window.clearTimeout(letterTypingTimer);

      letterTypingTimer = null;
      letterCharacterIndex = 0;
      isEnvelopeOpened = false;

      envelope.classList.remove("is-open");

      envelope.setAttribute(
          "aria-label",
          "Mở phong thư"
      );

      envelopeHint.classList.remove("is-hidden");

      typedLetter.textContent = "";
      typingCursor.classList.remove("is-visible");
  }

  /**
   * Hỗ trợ mở thư bằng Enter hoặc Space.
   *
   * @param {KeyboardEvent} event Sự kiện bàn phím.
   */
  function handleEnvelopeKeyboard(event) {
      if (
          event.key === "Enter" ||
          event.key === " "
      ) {
          event.preventDefault();
          openEnvelope();
      }
  }

  /* =========================================================
     11. IMAGE CAROUSEL
  ========================================================= */

  /**
   * Tạo các chấm chỉ báo gallery.
   */
  function createGalleryDots() {
      galleryDots.innerHTML = "";

      PLACEHOLDER_MEMORIES.forEach((memory, index) => {
          const dot = document.createElement("button");

          dot.type = "button";
          dot.className = "gallery-dot";

          dot.setAttribute(
              "aria-label",
              `Hiển thị ảnh số ${index + 1}`
          );

          dot.addEventListener("click", () => {
              goToGalleryImage(index);
          });

          galleryDots.appendChild(dot);
      });
  }

  /**
   * Cập nhật trạng thái các chấm gallery.
   */
  function updateGalleryDots() {
      const dots = Array.from(
          galleryDots.querySelectorAll(".gallery-dot")
      );

      dots.forEach((dot, index) => {
          const isActive = index === currentGalleryIndex;

          dot.classList.toggle("is-active", isActive);

          if (isActive) {
              dot.setAttribute("aria-current", "true");
          } else {
              dot.removeAttribute("aria-current");
          }
      });
  }

  /**
   * Hiển thị ảnh gallery hiện tại.
   *
   * @param {boolean} animate Có chạy hiệu ứng chuyển ảnh không.
   */
  function renderGallery(animate = true) {
      if (PLACEHOLDER_MEMORIES.length === 0) {
          galleryCaption.textContent =
              "Chưa có dữ liệu ảnh minh họa.";

          galleryCounter.textContent = "0 / 0";
          return;
      }

      const selectedMemory =
          PLACEHOLDER_MEMORIES[currentGalleryIndex];

      window.clearTimeout(galleryChangeTimer);

      if (animate) {
          galleryImage.classList.add("is-changing");

          galleryChangeTimer = window.setTimeout(() => {
              setGalleryImageData(selectedMemory);
          }, 220);
      } else {
          setGalleryImageData(selectedMemory);
      }

      updateGalleryDots();
  }

  /**
   * Gán dữ liệu ảnh vào giao diện.
   *
   * @param {object} memory Dữ liệu ảnh.
   */
  function setGalleryImageData(memory) {
      galleryImage.src = createPlaceholderImage(
          memory,
          currentGalleryIndex
      );

      galleryImage.alt =
          `Ảnh minh họa: ${memory.title}`;

      galleryMiniLabel.textContent =
          `Memory ${String(currentGalleryIndex + 1).padStart(2,
          "0")}`;

      galleryCaption.textContent = memory.caption;

      galleryCounter.textContent =
          `${currentGalleryIndex + 1} / ` +
          `${PLACEHOLDER_MEMORIES.length}`;

      window.setTimeout(() => {
          galleryImage.classList.remove("is-changing");
      }, 60);
  }

  /**
   * Chuyển đến một ảnh cụ thể.
   *
   * @param {number} index Chỉ số ảnh.
   */
  function goToGalleryImage(index) {
      if (PLACEHOLDER_MEMORIES.length === 0) {
          return;
      }

      currentGalleryIndex =
          (
              index +
              PLACEHOLDER_MEMORIES.length
          ) % PLACEHOLDER_MEMORIES.length;

      renderGallery();
  }

  /**
   * Hiển thị ảnh trước.
   */
  function showPreviousImage() {
      goToGalleryImage(currentGalleryIndex - 1);
  }

  /**
   * Hiển thị ảnh tiếp theo.
   */
  function showNextImage() {
      goToGalleryImage(currentGalleryIndex + 1);
  }

  /* =========================================================
     12. BONG BÓNG GIFT
  ========================================================= */

  /**
   * Tạo một bong bóng chứa ảnh minh họa.
   *
   * @param {number} index Chỉ số bong bóng.
   * @returns {HTMLDivElement}
   */
  function createPhotoBubble(index) {
      const bubble = document.createElement("div");
      const image = document.createElement("img");

      const memoryIndex =
          index % PLACEHOLDER_MEMORIES.length;

      const memory =
          PLACEHOLDER_MEMORIES[memoryIndex];

      const size = randomBetween(64, 125);
      const duration = randomBetween(8, 14);
      const delay = randomBetween(0, 2.6);

      bubble.className = "photo-bubble";

      bubble.style.setProperty(
          "--bubble-left",
          `${randomBetween(1, 91)}%`
      );

      bubble.style.setProperty(
          "--bubble-size",
          `${size}px`
      );

      bubble.style.setProperty(
          "--bubble-duration",
          `${duration}s`
      );

      bubble.style.setProperty(
          "--bubble-delay",
          `${delay}s`
      );

      bubble.style.setProperty(
          "--bubble-drift-one",
          `${randomBetween(-85, 85)}px`
      );

      bubble.style.setProperty(
          "--bubble-drift-two",
          `${randomBetween(-100, 100)}px`
      );

      bubble.style.setProperty(
          "--bubble-drift-three",
          `${randomBetween(-80, 80)}px`
      );

      bubble.style.setProperty(
          "--bubble-rotate-start",
          `${randomBetween(-15, 15)}deg`
      );

      bubble.style.setProperty(
          "--bubble-rotate-end",
          `${randomBetween(-20, 20)}deg`
      );

      image.src = createPlaceholderImage(
          memory,
          memoryIndex
      );

      image.alt = "";

      bubble.appendChild(image);

      /**
       * Xóa bong bóng sau khi animation bay hoàn tất.
       */
      bubble.addEventListener("animationend", (event) => {
          if (event.animationName === "bubbleRise") {
              bubble.remove();
          }
      });

      return bubble;
  }

  /**
   * Thả một nhóm bong bóng.
   *
   * @param {number} count Số bong bóng cần tạo.
   */
  function releaseGiftBubbles(
      count = DEFAULT_BUBBLE_COUNT
  ) {
      if (PLACEHOLDER_MEMORIES.length === 0) {
          return;
      }

      const fragment = document.createDocumentFragment();

      for (let index = 0; index < count; index += 1) {
          fragment.appendChild(
              createPhotoBubble(index)
          );
      }

      giftBubbleLayer.appendChild(fragment);
  }

  /**
   * Chạy animation mở hộp quà.
   */
  function animateGiftBox() {
      giftBox.classList.remove("is-opening");
      void giftBox.offsetWidth;
      giftBox.classList.add("is-opening");

      window.setTimeout(() => {
          giftBox.classList.remove("is-opening");
      }, 750);
  }

  /**
   * Xóa tất cả bong bóng hiện tại.
   */
  function clearGiftBubbles() {
      giftBubbleLayer.innerHTML = "";
  }

  /* =========================================================
     13. ĐĂNG KÝ SỰ KIỆN
  ========================================================= */

  /**
   * Bàn phím số màn hình khóa.
   */
  keypadNumberButtons.forEach((button) => {
      button.addEventListener("click", () => {
          appendPasscodeNumber(
              button.dataset.number
          );
      });
  });

  clearPasscodeButton.addEventListener(
      "click",
      clearPasscode
  );

  deletePasscodeButton.addEventListener(
      "click",
      deleteLastPasscodeNumber
  );

  document.addEventListener(
      "keydown",
      handlePasscodeKeyboard
  );

  /**
   * Các nút menu mở modal.
   */
  menuButtons.forEach((button) => {
      button.addEventListener("click", () => {
          openModal(button.dataset.modal);
      });
  });

  /**
   * Nút đóng và backdrop modal.
   */
  closeModalElements.forEach((element) => {
      element.addEventListener("click", () => {
          closeModal(element.closest(".modal"));
      });
  });

  document.addEventListener(
      "keydown",
      handleModalKeyboard
  );

  /**
   * Music preview.
   */
  musicPreviewButton.addEventListener(
      "click",
      toggleMusicPreview
  );

  /**
   * Letter.
   */
  envelope.addEventListener(
      "click",
      openEnvelope
  );

  envelope.addEventListener(
      "keydown",
      handleEnvelopeKeyboard
  );

  /**
   * Gallery.
   */
  previousImageButton.addEventListener(
      "click",
      showPreviousImage
  );

  nextImageButton.addEventListener(
      "click",
      showNextImage
  );

  /**
   * Gift.
   */
  releaseBubblesButton.addEventListener(
      "click",
      () => {
          animateGiftBox();

          releaseGiftBubbles(
              DEFAULT_BUBBLE_COUNT
          );

          showToast(
              "Một trời yêu thương đang bay đến bên cậu ♥"
          );
      }
  );

  /* =========================================================
     14. KHỞI TẠO WEBSITE
  ========================================================= */

  /**
   * Khởi tạo trạng thái ban đầu của website.
   */
  function initializeWebsite() {
      setupAvatarFallbacks();
      createBackgroundHearts();
      
      initializePreIntro();

      createGalleryDots();
      renderGallery(false);

      updatePasscodeDots();

      mainDashboard.setAttribute(
          "aria-hidden",
          "true"
      );

      lockScreen.setAttribute(
          "aria-hidden",
          "false"
      );
  }

  /**
   * Chạy sau khi DOM sẵn sàng.
   */
  if (document.readyState === "loading") {
      document.addEventListener(
          "DOMContentLoaded",
          initializeWebsite
      );
  } else {
      initializeWebsite();
  }

  /* =========================================================
     PRE-INTRO & WARP SPEED EFFECT
  ========================================================= */
  let warpAnimationFrame = null;
  let warpParticles = [];
  const WARP_PARTICLE_COUNT = 450;

  function initializePreIntro() {
      const preIntroScreen = document.getElementById("preIntroScreen");
      const exploreHeartBtn = document.getElementById("exploreHeartBtn");
      const warpCanvas = document.getElementById("warpCanvas");
      const galaxyIntroSection = document.getElementById("galaxyIntro");

      if (!preIntroScreen || !warpCanvas || !exploreHeartBtn) {
          initializeGalaxyIntro();
          if(galaxyIntroSection) galaxyIntroSection.classList.remove("is-hidden-initially");
          return;
      }

      function resizeWarpCanvas() {
          const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75);
          warpCanvas.width = window.innerWidth * pixelRatio;
          warpCanvas.height = window.innerHeight * pixelRatio;
      }
      window.addEventListener("resize", resizeWarpCanvas, { passive: true });
      resizeWarpCanvas();

      const CUTE_HEART_COLORS = [
          "#ff75a0",
          "#ff8fb1",
          "#ffaec9",
          "#ffccd5",
          "#fbcfe8",
          "#e9d5ff",
          "#ffffff",
          "#ff9eaa"
      ];

      for (let i = 0; i < WARP_PARTICLE_COUNT; i++) {
          warpParticles.push({
              x: (Math.random() - 0.5) * 2500,
              y: (Math.random() - 0.5) * 2500,
              z: Math.random() * 2500,
              color: CUTE_HEART_COLORS[Math.floor(Math.random() * CUTE_HEART_COLORS.length)],
              rot: (Math.random() - 0.5) * 0.6,
              rotSpeed: (Math.random() - 0.5) * 0.015,
              baseScale: 0.85 + Math.random() * 0.45
          });
      }

      function drawCuteHeart(ctx, x, y, size, rotation, color, alpha) {
          ctx.save();
          ctx.translate(x, y);
          if (rotation) {
              ctx.rotate(rotation);
          }
          ctx.globalAlpha = alpha;
          ctx.fillStyle = color;
          if (size > 4.2) {
              ctx.shadowBlur = 6;
              ctx.shadowColor = color;
          }
          
          ctx.beginPath();
          const topY = -size * 0.35;
          const bottomY = size * 0.85;
          ctx.moveTo(0, topY);
          ctx.bezierCurveTo(-size * 0.75, -size * 1.0, -size * 1.3, -size * 0.05, 0, bottomY);
          ctx.bezierCurveTo(size * 1.3, -size * 0.05, size * 0.75, -size * 1.0, 0, topY);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
      }

      let warpSpeed = 1;
      let isWarping = false;

      function renderWarpFrame() {
          if (preIntroScreen.classList.contains("is-hidden")) return;

          const ctx = warpCanvas.getContext("2d");
          const width = warpCanvas.width;
          const height = warpCanvas.height;
          const cx = width / 2;
          const cy = height / 2;

          ctx.fillStyle = isWarping ? "rgba(5, 1, 10, 0.18)" : "rgba(5, 1, 10, 0.4)";
          ctx.fillRect(0, 0, width, height);

          warpParticles.forEach(p => {
              const previousZ = p.z;
              p.z -= warpSpeed;
              if (p.z <= 0) {
                  p.x = (Math.random() - 0.5) * 2500;
                  p.y = (Math.random() - 0.5) * 2500;
                  p.z = 2500;
              }

              p.rot += p.rotSpeed;

              const k = 800 / p.z;
              const px = cx + p.x * k;
              const py = cy + p.y * k;
              
              const depthProgress = (2500 - p.z) / 2500;
              const heartSize = Math.max(1.8, (depthProgress * 6.5 + 1.6) * (p.baseScale || 1));
              const alpha = Math.min(1, Math.max(0.4, depthProgress * 0.85 + 0.35));

              if (isWarping) {
                  const prevK = 800 / previousZ;
                  const prevPx = cx + p.x * prevK;
                  const prevPy = cy + p.y * prevK;
                  
                  ctx.save();
                  ctx.strokeStyle = p.color;
                  ctx.lineWidth = Math.max(1, heartSize * 0.5);
                  ctx.globalAlpha = Math.min(1, alpha * 1.2);
                  ctx.beginPath();
                  ctx.moveTo(prevPx, prevPy);
                  ctx.lineTo(px, py);
                  ctx.stroke();
                  ctx.restore();

                  drawCuteHeart(ctx, px, py, heartSize * 1.25, p.rot, p.color, alpha);
              } else {
                  drawCuteHeart(ctx, px, py, heartSize, p.rot, p.color, alpha);
              }
          });

          if (isWarping) {
              warpSpeed = Math.min(warpSpeed * 1.06, 120);
          } else {
              warpSpeed = 1.5;
          }

          warpAnimationFrame = window.requestAnimationFrame(renderWarpFrame);
      }

      renderWarpFrame();

      exploreHeartBtn.addEventListener("click", () => {
          isWarping = true;
          document.querySelector(".pre-intro-content").classList.add("is-fading-out");
          
          setTimeout(() => {
              preIntroScreen.classList.add("is-hidden");
              window.cancelAnimationFrame(warpAnimationFrame);
              
              galaxyIntroSection.classList.remove("is-hidden");
              
              // Init the main galaxy intro now
              initializeGalaxyIntro();
          }, 2400);
      });
  }
