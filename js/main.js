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
      galaxyParticleCount: 3800,
      heartParticleCount: 2200,
      backgroundStarCount: 750,
      colors: [
          "#ff0055", // Crimson Ruby Pink (hồng đỏ rực rỡ)
          "#e6004c", // Deep Rose Red (đỏ hồng nhung)
          "#ff1a66", // Glowing Crimson Rose (hồng đỏ dạ quang)
          "#ff2a7a", // Vivid Hot Rose (hồng đỏ tươi)
          "#ff4d88", // Coral Rose Pink (hồng đỏ san hô)
          "#ff6699", // Soft Rose Pink (hồng thắm)
          "#ff99bb", // Light Ruby Sparkle (bụi sáng hồng)
          "#ffffff"  // Pure White Diamond (kim cương trắng)
      ],
      rotationSpeed: 0.000045,
      heartBeatSpeed: 0.0024,
      galaxyBranches: 2,
      galaxyTurns: 3.2
  };

  /* =========================================================
     2. TRUY CẬP CÁC PHẦN TỬ HTML
  ========================================================= */

  // Intro galaxy
  const galaxyIntro = document.getElementById("galaxyIntro");
  const galaxyCanvas = document.getElementById("galaxyCanvas");
  const orbitLayer = document.getElementById("orbitLayer");
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
  const introMessageBackdrop = document.querySelector(
      ".intro-message-backdrop"
  );
  const closeIntroMessageButton = document.getElementById(
      "closeIntroMessageButton"
  );
  const zoomInBtn = document.getElementById("zoomInBtn");
  const zoomOutBtn = document.getElementById("zoomOutBtn");
  const zoomResetBtn = document.getElementById("zoomResetBtn");

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

  // Trạng thái Three.js cho Chặng 2 (Interactive 3D Heart Galaxy)
  let threeScene = null;
  let threeCamera = null;
  let threeRenderer = null;
  let threeClock = null;
  let threeAnimFrame = null;
  let galaxyUniverseGroup = null;
  let galaxyDiskGroup = null;
  let heartPointsGroup = null;
  let outerHeartPoints = null;
  let innerHeartPoints = null;
  let galaxyPoints = null;
  let ambientDustPoints = null;
  let blackHoleCore = null;
  let accretionRing = null;
  let backgroundStars = null;
  let shootingStars = [];

  let mouseX = 0;
  let mouseY = 0;
  let targetCamX = 0;
  let targetCamY = 0;
  let targetCamDist = 60;
  let currentCamDist = 60;
  let dragRotX = 0;
  let dragRotY = 0;
  let targetDragRotX = 0;
  let targetDragRotY = 0;
  let isDraggingStage2 = false;
  let lastPointerX = 0;
  let lastPointerY = 0;
  let pinchStartDist = 0;
  let basePinchDist = 60;

  let isGalaxyIntroActive = true;
  let introLastFocusedElement = null;
  let isEnteringStage3 = false;
  let enterStage3StartTime = 0;
  let stage2EntranceStartTime = 0;
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
     INTRO THREE.JS: INTERACTIVE 3D HEART GALAXY (CHẶNG 2)
  ========================================================= */

  /**
   * Tạo texture hạt phát sáng mềm với tâm sáng và viền mờ ảo diệu.
   */
  function createParticleTexture() {
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");

      // Quầng sáng tròn mềm mại
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.18, "rgba(255, 215, 235, 0.95)");
      gradient.addColorStop(0.45, "rgba(255, 55, 140, 0.45)");
      gradient.addColorStop(1, "rgba(20, 0, 35, 0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(32, 32, 32, 0, Math.PI * 2);
      ctx.fill();

      // Tia sao chữ thập tạo hiệu ứng vì sao kim cương lấp lánh (Star flare)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.65)";
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      ctx.moveTo(32, 5);
      ctx.lineTo(32, 59);
      ctx.moveTo(5, 32);
      ctx.lineTo(59, 32);
      ctx.stroke();

      // Điểm sáng trung tâm sắc nét
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(32, 32, 3.2, 0, Math.PI * 2);
      ctx.fill();

      return new THREE.CanvasTexture(canvas);
  }

  /**
   * Khởi tạo hệ thống Trái tim 3D lồng ghép:
   * - Tăng kích thước tổng thể lên một chút (baseScale = 0.84)
   * - Hạt phát sáng như các vì sao lấp lánh
   * - Đường nét thanh mảnh, sắc sảo
   */
  function createDualHeartSystem(particleTexture) {
      heartPointsGroup = new THREE.Group();

      // 1. Trái tim viền ngoài (2,800 hạt, thanh mảnh, kích thước tăng nhẹ cân đối)
      const outerCount = 2800;
      const outerGeo = new THREE.BufferGeometry();
      const outerPos = new Float32Array(outerCount * 3);
      const outerColors = new Float32Array(outerCount * 3);

      for (let i = 0; i < outerCount; i++) {
          const t = Math.PI * 2 * Math.random();
          const baseScale = 0.84;
          let x = 16 * Math.pow(Math.sin(t), 3) * baseScale;
          let y = (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * baseScale;

          // Đường nét mỏng, sắc sảo
          let z = (Math.random() - 0.5) * 3.6 * (1.0 - Math.abs(x) / 16);
          const jitter = 0.68;
          x += (Math.random() - 0.5) * jitter;
          y += (Math.random() - 0.5) * jitter;
          z += (Math.random() - 0.5) * jitter;

          outerPos[i * 3] = x;
          outerPos[i * 3 + 1] = y + 12.5;
          outerPos[i * 3 + 2] = z;

          const p = Math.random();
          if (p > 0.8) {
              // Hạt sao kim cương trắng
              outerColors[i * 3] = 1.0;
              outerColors[i * 3 + 1] = 0.95;
              outerColors[i * 3 + 2] = 0.98;
          } else if (p > 0.35) {
              // Hạt hồng đỏ dạ quang rực rỡ
              outerColors[i * 3] = 1.0;
              outerColors[i * 3 + 1] = 0.18;
              outerColors[i * 3 + 2] = 0.58;
          } else {
              // Hạt ruby tím nhung
              outerColors[i * 3] = 0.92;
              outerColors[i * 3 + 1] = 0.06;
              outerColors[i * 3 + 2] = 0.4;
          }
      }

      outerGeo.setAttribute("position", new THREE.BufferAttribute(outerPos, 3));
      outerGeo.setAttribute("color", new THREE.BufferAttribute(outerColors, 3));

      const outerMat = new THREE.PointsMaterial({
          size: 1.4,
          map: particleTexture,
          vertexColors: true,
          transparent: true,
          opacity: 0.95,
          blending: THREE.AdditiveBlending,
          depthWrite: false
      });
      outerHeartPoints = new THREE.Points(outerGeo, outerMat);
      heartPointsGroup.add(outerHeartPoints);

      // 2. Trái tim sao nhỏ lồng bên trong (1,300 hạt tinh tế)
      const innerCount = 1300;
      const innerGeo = new THREE.BufferGeometry();
      const innerPos = new Float32Array(innerCount * 3);
      const innerColors = new Float32Array(innerCount * 3);

      for (let i = 0; i < innerCount; i++) {
          const t = Math.PI * 2 * Math.random();
          const u = Math.pow(Math.random(), 0.6);
          const innerScale = 0.52;

          let x = 16 * Math.pow(Math.sin(t), 3) * innerScale * u;
          let y = (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * innerScale * u;

          const rDist = Math.sqrt(Math.pow(x / 10, 2) + Math.pow(y / 10, 2));
          const maxZ = Math.sqrt(Math.max(0, 1 - Math.min(1, rDist))) * 3.0;
          let z = (Math.random() - 0.5) * 2 * maxZ;

          const jitter = 0.52;
          x += (Math.random() - 0.5) * jitter;
          y += (Math.random() - 0.5) * jitter;
          z += (Math.random() - 0.5) * jitter;

          innerPos[i * 3] = x;
          innerPos[i * 3 + 1] = y + 12.5;
          innerPos[i * 3 + 2] = z;

          const p = Math.random();
          if (p > 0.7) {
              innerColors[i * 3] = 1.0;
              innerColors[i * 3 + 1] = 0.9;
              innerColors[i * 3 + 2] = 0.96;
          } else if (p > 0.3) {
              innerColors[i * 3] = 1.0;
              innerColors[i * 3 + 1] = 0.25;
              innerColors[i * 3 + 2] = 0.68;
          } else {
              innerColors[i * 3] = 0.88;
              innerColors[i * 3 + 1] = 0.1;
              innerColors[i * 3 + 2] = 0.46;
          }
      }

      innerGeo.setAttribute("position", new THREE.BufferAttribute(innerPos, 3));
      innerGeo.setAttribute("color", new THREE.BufferAttribute(innerColors, 3));

      const innerMat = new THREE.PointsMaterial({
          size: 1.2,
          map: particleTexture,
          vertexColors: true,
          transparent: true,
          opacity: 0.88,
          blending: THREE.AdditiveBlending,
          depthWrite: false
      });
      innerHeartPoints = new THREE.Points(innerGeo, innerMat);
      heartPointsGroup.add(innerHeartPoints);

      if (galaxyUniverseGroup) {
          galaxyUniverseGroup.add(heartPointsGroup);
      } else {
          threeScene.add(heartPointsGroup);
      }
  }

  /**
   * Khởi tạo Dải Ngân Hà xoắn ốc 3 nhánh mở rộng bao la (radius = 65, 9,500 hạt)
   * nằm bên dưới trái tim và liên kết chặt chẽ vào galaxyUniverseGroup.
   */
  function createSpiralGalaxy(particleTexture) {
      galaxyDiskGroup = new THREE.Group();
      galaxyDiskGroup.position.set(0, -6, 0);
      galaxyDiskGroup.rotation.x = 0.36;
      galaxyDiskGroup.rotation.z = -0.08;

      const galaxyParticleCount = 9500;
      const galaxyGeo = new THREE.BufferGeometry();
      const galaxyPos = new Float32Array(galaxyParticleCount * 3);
      const galaxyColors = new Float32Array(galaxyParticleCount * 3);

      const arms = 3;
      const galaxyRadius = 65;

      for (let i = 0; i < galaxyParticleCount; i++) {
          const r = Math.pow(Math.random(), 1.4) * galaxyRadius;
          const spinAngle = r * 0.20;
          const armAngle = ((i % arms) * 2 * Math.PI) / arms;

          const randomX = (Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.36) * (r + 4);
          const randomY = (Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.22) * (r + 2);
          const randomZ = (Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.36) * (r + 4);

          const angle = armAngle + spinAngle;
          const x = Math.cos(angle) * r + randomX;
          const z = Math.sin(angle) * r + randomZ;
          const y = randomY;

          galaxyPos[i * 3] = x;
          galaxyPos[i * 3 + 1] = y;
          galaxyPos[i * 3 + 2] = z;

          const distRatio = r / galaxyRadius;
          if (distRatio < 0.2) {
              galaxyColors[i * 3] = 1.0;
              galaxyColors[i * 3 + 1] = 0.92;
              galaxyColors[i * 3 + 2] = 0.98;
          } else if (distRatio < 0.62) {
              galaxyColors[i * 3] = 1.0;
              galaxyColors[i * 3 + 1] = 0.18 + (1 - distRatio) * 0.35;
              galaxyColors[i * 3 + 2] = 0.68;
          } else {
              galaxyColors[i * 3] = 0.78;
              galaxyColors[i * 3 + 1] = 0.08;
              galaxyColors[i * 3 + 2] = 0.56;
          }
      }

      galaxyGeo.setAttribute("position", new THREE.BufferAttribute(galaxyPos, 3));
      galaxyGeo.setAttribute("color", new THREE.BufferAttribute(galaxyColors, 3));

      const galaxyMaterial = new THREE.PointsMaterial({
          size: 1.15,
          map: particleTexture,
          vertexColors: true,
          transparent: true,
          opacity: 0.9,
          blending: THREE.AdditiveBlending,
          depthWrite: false
      });

      galaxyPoints = new THREE.Points(galaxyGeo, galaxyMaterial);
      galaxyDiskGroup.add(galaxyPoints);

      // Lõi trung tâm
      const centerGeo = new THREE.SphereGeometry(2.3, 32, 32);
      const centerMat = new THREE.MeshBasicMaterial({ color: 0x06000c });
      blackHoleCore = new THREE.Mesh(centerGeo, centerMat);
      galaxyDiskGroup.add(blackHoleCore);

      // Vành đai phát sáng xung quanh lõi
      const ringGeo = new THREE.RingGeometry(2.5, 5.2, 48);
      const ringMat = new THREE.MeshBasicMaterial({
          color: 0xff1a66,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.88,
          blending: THREE.AdditiveBlending
      });
      accretionRing = new THREE.Mesh(ringGeo, ringMat);
      accretionRing.rotation.x = Math.PI / 2;
      galaxyDiskGroup.add(accretionRing);

      if (galaxyUniverseGroup) {
          galaxyUniverseGroup.add(galaxyDiskGroup);
      } else {
          threeScene.add(galaxyDiskGroup);
      }
  }

  /**
   * Tạo đám mây bụi vũ trụ li ti lấp lánh (3,800 hạt) bao quanh không gian 3D.
   */
  function createAmbientDust(particleTexture) {
      const dustCount = 3800;
      const dustGeo = new THREE.BufferGeometry();
      const dustPos = new Float32Array(dustCount * 3);
      const dustColors = new Float32Array(dustCount * 3);

      for (let i = 0; i < dustCount; i++) {
          const rad = 25 + Math.random() * 65;
          const theta = Math.random() * Math.PI * 2;
          const phi = (Math.random() - 0.5) * Math.PI * 0.85;

          dustPos[i * 3] = rad * Math.cos(phi) * Math.sin(theta);
          dustPos[i * 3 + 1] = rad * Math.sin(phi) + 4;
          dustPos[i * 3 + 2] = rad * Math.cos(phi) * Math.cos(theta);

          const p = Math.random();
          if (p > 0.7) {
              dustColors[i * 3] = 1.0;
              dustColors[i * 3 + 1] = 0.92;
              dustColors[i * 3 + 2] = 0.98;
          } else if (p > 0.3) {
              dustColors[i * 3] = 1.0;
              dustColors[i * 3 + 1] = 0.45;
              dustColors[i * 3 + 2] = 0.75;
          } else {
              dustColors[i * 3] = 0.82;
              dustColors[i * 3 + 1] = 0.22;
              dustColors[i * 3 + 2] = 0.85;
          }
      }

      dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
      dustGeo.setAttribute("color", new THREE.BufferAttribute(dustColors, 3));

      const dustMat = new THREE.PointsMaterial({
          size: 0.92,
          map: particleTexture,
          vertexColors: true,
          transparent: true,
          opacity: 0.75,
          blending: THREE.AdditiveBlending,
          depthWrite: false
      });

      ambientDustPoints = new THREE.Points(dustGeo, dustMat);
      if (galaxyUniverseGroup) {
          galaxyUniverseGroup.add(ambientDustPoints);
      } else {
          threeScene.add(ambientDustPoints);
      }
  }

  /**
   * Tạo các vì sao vũ trụ xa xăm trong không gian.
   */
  function createBackgroundStars(particleTexture) {
      const starCount = 2000;
      const starGeo = new THREE.BufferGeometry();
      const starPos = new Float32Array(starCount * 3);
      for (let i = 0; i < starCount * 3; i += 3) {
          starPos[i] = (Math.random() - 0.5) * 220;
          starPos[i + 1] = (Math.random() - 0.5) * 160;
          starPos[i + 2] = (Math.random() - 0.5) * 220;
      }
      starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
      const starMat = new THREE.PointsMaterial({
          size: 0.85,
          color: 0xffd9ec,
          transparent: true,
          opacity: 0.75,
          map: particleTexture,
          blending: THREE.AdditiveBlending,
          depthWrite: false
      });
      backgroundStars = new THREE.Points(starGeo, starMat);
      threeScene.add(backgroundStars);
  }

  /**
   * Tạo mưa sao băng rơi ngẫu nhiên qua bầu trời 3D.
   */
  function spawnShootingStar() {
      if (!threeScene || shootingStars.length >= 4) return;
      const startX = (Math.random() - 0.5) * 120 + 35;
      const startY = 38 + Math.random() * 25;
      const startZ = (Math.random() - 0.5) * 70 - 20;

      const starPoints = 14;
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(starPoints * 3);
      for (let i = 0; i < starPoints; i++) {
          pos[i * 3] = startX - i * 1.8;
          pos[i * 3 + 1] = startY - i * 1.0;
          pos[i * 3 + 2] = startZ - i * 0.5;
      }
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.LineBasicMaterial({
          color: 0xff99cc,
          transparent: true,
          opacity: 0.9,
          blending: THREE.AdditiveBlending
      });
      const line = new THREE.Line(geo, mat);
      threeScene.add(line);
      shootingStars.push({
          line,
          vx: -2.4,
          vy: -1.35,
          vz: -0.65,
          life: 0,
          maxLife: 45 + Math.random() * 30
      });
  }

  /**
   * Chiếu tọa độ 3D của các dòng chữ chúc mừng nổi lên trên tầng dải bao quanh
   * và di chuyển theo quy luật các tầng quỹ đạo đồng tâm trên đĩa ngân hà.
   */
  function update3DOrbitElements(elapsedTime) {
      if (!threeCamera || !orbitLayer || !galaxyDiskGroup) return;
      const items = orbitLayer.querySelectorAll(".orbit-item");
      if (!items.length) return;

      const width = window.innerWidth;
      const height = window.innerHeight;
      const tempVec = new THREE.Vector3();
      const totalItems = items.length;

      if (galaxyUniverseGroup) {
          galaxyUniverseGroup.updateMatrixWorld(true);
      }

      // 3 tầng quỹ đạo bao quanh bề mặt ngân hà:
      // Tầng 1 (trong): bán kính 24
      // Tầng 2 (giữa): bán kính 36
      // Tầng 3 (ngoài): bán kính 50
      const tierRadii = [24, 36, 50, 26, 38, 52, 28, 40, 54, 32];

      items.forEach((item, index) => {
          // Góc phân bố quy luật xung quanh đĩa ngân hà
          const baseAngle = (index / totalItems) * Math.PI * 2;
          const radius = tierRadii[index % tierRadii.length];

          // Nổi lên hẳn trên tầng dải bao quanh (Y = 2.2 + sóng nhấp nhô nhẹ)
          const elevatedY = 2.2 + Math.sin(elapsedTime * 1.5 + index * 0.8) * 0.45;

          tempVec.set(
              Math.cos(baseAngle) * radius,
              elevatedY,
              Math.sin(baseAngle) * radius
          );

          // Chuyển đổi tọa độ sang World Space
          tempVec.applyMatrix4(galaxyDiskGroup.matrixWorld);

          // Chiếu tọa độ 3D sang màn hình 2D
          tempVec.project(threeCamera);

          const isVisible = tempVec.z < 1.0;
          if (!isVisible) {
              item.style.opacity = "0";
              return;
          }

          const screenX = (tempVec.x * 0.5 + 0.5) * width;
          const screenY = (-(tempVec.y * 0.5) + 0.5) * height;

          const depthScale = THREE.MathUtils.clamp(1.04 - tempVec.z * 0.42, 0.65, 1.2);
          let opacity = THREE.MathUtils.clamp(1.18 - tempVec.z * 0.65, 0.4, 1.0);

          // Khi mới phóng to vào chặng 2, lời chúc hiện ra êm dịu
          const entranceElapsed = performance.now() - stage2EntranceStartTime;
          if (entranceElapsed < 1200) {
              const fadeIn = Math.max(0, (entranceElapsed - 400) / 800);
              opacity *= fadeIn;
          }

          item.style.transform = `translate3d(${screenX}px, ${screenY}px, 0) translate(-50%, -50%) scale(${depthScale})`;
          item.style.opacity = opacity.toFixed(2);
          item.style.zIndex = Math.round(160 - tempVec.z * 80);
      });
  }

  /**
   * Mở modal hiển thị lời chúc ngọt ngào khi bấm vào lời chúc trong vũ trụ.
   */
  function openIntroMessage(button) {
      if (!introMessageModal || !introMessageTitle || !introMessageText) return;
      introLastFocusedElement = button;
      introMessageTitle.textContent = button.dataset.introTitle || "Happy Birthday!";
      introMessageText.textContent = button.dataset.introMessage || "";
      introMessageModal.classList.add("is-open");
      introMessageModal.setAttribute("aria-hidden", "false");
      closeIntroMessageButton?.focus();
  }

  /**
   * Đóng modal lời nhắn yêu thương.
   */
  function closeIntroMessage() {
      if (!introMessageModal) return;
      introMessageModal.classList.remove("is-open");
      introMessageModal.setAttribute("aria-hidden", "true");
      if (introLastFocusedElement) {
          introLastFocusedElement.focus?.();
          introLastFocusedElement = null;
      }
  }

  /**
   * Vòng lặp Render chính của Three.js
   */
  function animateThreeScene() {
      if (!isGalaxyIntroActive) return;
      threeAnimFrame = requestAnimationFrame(animateThreeScene);

      const elapsedTime = threeClock ? threeClock.getElapsedTime() : performance.now() * 0.001;

      // 0. Tính toán hiệu ứng phóng to liên tục khi mới mở chặng 2 (Entrance Zoom)
      const entranceElapsed = performance.now() - stage2EntranceStartTime;
      let entranceScale = 1.0;
      if (entranceElapsed < 1200) {
          const p = Math.min(1, entranceElapsed / 1200);
          const ease = 1 - Math.pow(1 - p, 3);
          entranceScale = THREE.MathUtils.lerp(0.28, 1.0, ease);
          currentCamDist = THREE.MathUtils.lerp(36, targetCamDist, ease);
      }

      // 1. Nhịp đập trái tim 3D
      const pulse = 1 + Math.sin(elapsedTime * 2.8) * 0.038 + Math.sin(elapsedTime * 5.6) * 0.012;
      if (heartPointsGroup) {
          heartPointsGroup.scale.set(pulse, pulse, pulse);
          heartPointsGroup.rotation.y = Math.sin(elapsedTime * 0.4) * 0.06;
      }

      // 2. Chuyển động xoay của đĩa ngân hà
      if (galaxyDiskGroup) {
          galaxyDiskGroup.rotation.y = elapsedTime * 0.065;
      }
      if (accretionRing) {
          accretionRing.rotation.z = -elapsedTime * 0.2;
      }

      // 3. Toàn bộ Vũ trụ liên kết xoay theo kéo rê / cảm ứng & phóng to lúc xuất hiện
      dragRotX += (targetDragRotX - dragRotX) * 0.08;
      dragRotY += (targetDragRotY - dragRotY) * 0.08;
      if (galaxyUniverseGroup) {
          galaxyUniverseGroup.scale.set(entranceScale, entranceScale, entranceScale);
          galaxyUniverseGroup.rotation.y = dragRotY + Math.sin(elapsedTime * 0.2) * 0.06;
          galaxyUniverseGroup.rotation.x = dragRotX;
      }

      // 4. Bụi vũ trụ li ti trôi bồng bềnh
      if (ambientDustPoints) {
          ambientDustPoints.rotation.y = elapsedTime * 0.018;
          ambientDustPoints.rotation.x = Math.sin(elapsedTime * 0.15) * 0.03;
          ambientDustPoints.material.opacity = 0.72 + Math.sin(elapsedTime * 2.8) * 0.08;
      }

      // 5. Hiệu ứng vì sao lấp lánh sinh động (Star twinkling)
      if (outerHeartPoints) {
          outerHeartPoints.material.opacity = 0.92 + Math.sin(elapsedTime * 3.8) * 0.07;
      }
      if (innerHeartPoints) {
          innerHeartPoints.material.opacity = 0.86 + Math.cos(elapsedTime * 4.2) * 0.08;
      }
      if (galaxyPoints) {
          galaxyPoints.material.opacity = 0.88 + Math.sin(elapsedTime * 2.2) * 0.07;
      }
      if (accretionRing) {
          accretionRing.material.opacity = 0.85 + Math.sin(elapsedTime * 5.0) * 0.12;
      }

      // 6. Nội suy camera mượt mà
      targetCamX += (mouseX - targetCamX) * 0.05;
      targetCamY += (mouseY - targetCamY) * 0.05;
      if (entranceElapsed >= 1200) {
          currentCamDist += (targetCamDist - currentCamDist) * 0.08;
      }

      if (isEnteringStage3) {
          const enterProgress = (performance.now() - enterStage3StartTime) / 1000;
          const zoomProgress = Math.min(1, enterProgress * 1.25);
          const easeInWarp = Math.pow(zoomProgress, 3);
          threeCamera.position.z = THREE.MathUtils.lerp(currentCamDist, 2.5, easeInWarp);
          threeCamera.position.y = THREE.MathUtils.lerp(24, 12.5, easeInWarp);
          threeCamera.position.x = THREE.MathUtils.lerp(0, 0, easeInWarp);
          threeCamera.lookAt(0, 12.5, 0);
      } else {
          threeCamera.position.x = Math.sin(targetCamX * 2) * (currentCamDist * 0.32);
          threeCamera.position.y = 24 - targetCamY * 16;
          threeCamera.position.z = currentCamDist;
          threeCamera.lookAt(0, 4.5, 0);
      }

      // 7. Mưa sao băng
      if (Math.random() < 0.02) spawnShootingStar();
      for (let i = shootingStars.length - 1; i >= 0; i--) {
          const s = shootingStars[i];
          s.line.position.x += s.vx;
          s.line.position.y += s.vy;
          s.line.position.z += s.vz;
          s.life++;
          s.line.material.opacity = Math.max(0, 0.9 * (1 - s.life / s.maxLife));
          if (s.life >= s.maxLife) {
              threeScene.remove(s.line);
              s.line.geometry.dispose();
              s.line.material.dispose();
              shootingStars.splice(i, 1);
          }
      }

      // 8. Cập nhật vị trí các lời chúc nổi trên tầng dải ngân hà
      update3DOrbitElements(elapsedTime);

      if (threeRenderer && threeScene && threeCamera) {
          threeRenderer.render(threeScene, threeCamera);
      }
  }

  /**
   * Bay xuyên qua trái tim 3D để bước vào Chặng 3 (Màn hình mật mã).
   */
  function enterOurUniverse() {
      if (!isGalaxyIntroActive || isEnteringStage3) return;
      isEnteringStage3 = true;
      enterStage3StartTime = performance.now();
      closeIntroMessage();
      galaxyIntro?.classList.add("is-entering");

      window.setTimeout(() => {
          galaxyIntro?.classList.add("is-hidden");
          galaxyIntro?.setAttribute("aria-hidden", "true");
          isGalaxyIntroActive = false;
          if (threeAnimFrame) {
              cancelAnimationFrame(threeAnimFrame);
          }
          document.body.classList.add("is-stage-light");
          lockScreen?.classList.remove("is-hidden");
          lockScreen?.setAttribute("aria-hidden", "false");
          lockScreen?.focus?.();

          if (keypadNumberButtons[0]) {
              keypadNumberButtons[0].focus();
          }
      }, 1050);
  }

  function handleIntroKeyboard(event) {
      if (!isGalaxyIntroActive) return;
      if (
          event.key === "Escape" &&
          introMessageModal?.classList.contains("is-open")
      ) {
          event.preventDefault();
          closeIntroMessage();
      }
  }

  /**
   * Khởi tạo toàn bộ không gian Three.js Interactive 3D Heart Galaxy.
   */
  function initializeGalaxyIntro() {
      if (typeof THREE === "undefined") {
          console.error("Three.js r125 library is not loaded.");
          return;
      }

      const galaxyIntroSection = document.getElementById("galaxyIntro");
      const canvas = document.getElementById("galaxyCanvas");
      if (!galaxyIntroSection || !canvas) {
          isGalaxyIntroActive = false;
          return;
      }

      if (threeAnimFrame) {
          cancelAnimationFrame(threeAnimFrame);
      }

      isGalaxyIntroActive = true;
      isEnteringStage3 = false;
      stage2EntranceStartTime = performance.now();
      currentCamDist = 36;

      const width = window.innerWidth;
      const height = window.innerHeight;

      // 1. Scene & Sương mù vũ trụ hồng tím huyền ảo
      threeScene = new THREE.Scene();
      threeScene.fog = new THREE.FogExp2(0x06010c, 0.0018);

      // 2. Camera phối cảnh (bắt đầu ở cự ly 36 và phóng mượt ra 60)
      threeCamera = new THREE.PerspectiveCamera(60, width / height, 0.1, 2000);
      threeCamera.position.set(0, 24, 36);

      // 3. WebGL Renderer
      threeRenderer = new THREE.WebGLRenderer({
          canvas: canvas,
          alpha: true,
          antialias: true
      });
      threeRenderer.setSize(width, height);
      threeRenderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      threeRenderer.setClearColor(0x000000, 0);

      threeClock = new THREE.Clock();

      // 4. Nhóm Vũ trụ liên kết chung
      galaxyUniverseGroup = new THREE.Group();
      threeScene.add(galaxyUniverseGroup);

      // 5. Khởi tạo Texture vì sao & các hệ thống hạt 3D
      const particleTexture = createParticleTexture();
      createDualHeartSystem(particleTexture);
      createSpiralGalaxy(particleTexture);
      createAmbientDust(particleTexture);
      createBackgroundStars(particleTexture);

      // 6. Thao tác cảm ứng & chuột (Kéo xoay đa chiều & Parallax)
      window.addEventListener("mousemove", (event) => {
          mouseX = (event.clientX - window.innerWidth / 2) * 0.0006;
          mouseY = (event.clientY - window.innerHeight / 2) * 0.0004;
      }, { passive: true });

      canvas.addEventListener("pointerdown", (event) => {
          isDraggingStage2 = true;
          lastPointerX = event.clientX;
          lastPointerY = event.clientY;
      });

      window.addEventListener("pointermove", (event) => {
          if (!isDraggingStage2) return;
          const deltaX = event.clientX - lastPointerX;
          const deltaY = event.clientY - lastPointerY;
          lastPointerX = event.clientX;
          lastPointerY = event.clientY;

          targetDragRotY += deltaX * 0.008;
          targetDragRotX = THREE.MathUtils.clamp(targetDragRotX + deltaY * 0.008, -0.6, 0.6);
      }, { passive: true });

      window.addEventListener("pointerup", () => {
          isDraggingStage2 = false;
      });

      window.addEventListener("pointercancel", () => {
          isDraggingStage2 = false;
      });

      // Lăn chuột phóng to thu nhỏ
      galaxyIntroSection.addEventListener("wheel", (event) => {
          event.preventDefault();
          targetCamDist = THREE.MathUtils.clamp(targetCamDist + (event.deltaY > 0 ? 4 : -4), 30, 95);
      }, { passive: false });

      // Cảm ứng 2 ngón (Pinch-to-zoom)
      canvas.addEventListener("touchstart", (event) => {
          if (event.touches.length === 2) {
              const dx = event.touches[0].clientX - event.touches[1].clientX;
              const dy = event.touches[0].clientY - event.touches[1].clientY;
              pinchStartDist = Math.hypot(dx, dy);
              basePinchDist = targetCamDist;
          }
      }, { passive: true });

      canvas.addEventListener("touchmove", (event) => {
          if (event.touches.length === 2 && pinchStartDist > 0) {
              const dx = event.touches[0].clientX - event.touches[1].clientX;
              const dy = event.touches[0].clientY - event.touches[1].clientY;
              const currentDist = Math.hypot(dx, dy);
              const scale = currentDist / pinchStartDist;
              targetCamDist = THREE.MathUtils.clamp(basePinchDist / scale, 30, 95);
          }
      }, { passive: true });

      // Sự kiện mở lời chúc
      orbitItems.forEach((item) => {
          item.addEventListener("click", () => openIntroMessage(item));
      });

      closeIntroMessageButton?.addEventListener("click", closeIntroMessage);
      introMessageBackdrop?.addEventListener("click", closeIntroMessage);

      enterUniverseButton?.addEventListener("click", enterOurUniverse);

      window.addEventListener("resize", () => {
          if (!threeCamera || !threeRenderer) return;
          const newW = window.innerWidth;
          const newH = window.innerHeight;
          threeCamera.aspect = newW / newH;
          threeCamera.updateProjectionMatrix();
          threeRenderer.setSize(newW, newH);
      }, { passive: true });

      document.addEventListener("keydown", handleIntroKeyboard);

      // Bắt đầu vòng lặp vẽ Three.js
      animateThreeScene();
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

      lockScreen.classList.add("is-hidden");
      lockScreen.setAttribute(
          "aria-hidden",
          "true"
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

      const WARP_PARTICLE_COUNT = 650;

      const CUTE_HEART_COLORS = [
          "#ff598f", // Hot romantic pink
          "#ff75a0", // Sweet rose
          "#ffaec9", // Pastel pink
          "#ffccd5", // Soft pink
          "#fbcfe8", // Baby pink
          "#e9d5ff", // Lilac lavender
          "#ffffff", // Twinkling white
          "#ff85a2"  // Warm coral pink
      ];

      for (let i = 0; i < WARP_PARTICLE_COUNT; i++) {
          warpParticles.push({
              x: (Math.random() - 0.5) * 3200,
              y: (Math.random() - 0.5) * 3200,
              z: Math.random() * 2500,
              color: CUTE_HEART_COLORS[Math.floor(Math.random() * CUTE_HEART_COLORS.length)],
              rot: (Math.random() - 0.5) * 0.8,
              rotSpeed: (Math.random() - 0.5) * 0.02,
              baseScale: 0.95 + Math.random() * 0.1
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
          if (size > 2.8) {
              ctx.shadowBlur = 4;
              ctx.shadowColor = color;
          }
          
          // Vẽ hình trái tim bé xíu, cong tròn xinh xắn
          ctx.beginPath();
          ctx.moveTo(0, -size * 0.35);
          ctx.bezierCurveTo(-size * 0.8, -size * 1.05, -size * 1.5, -size * 0.1, 0, size * 1.2);
          ctx.bezierCurveTo(size * 1.5, -size * 0.1, size * 0.8, -size * 1.05, 0, -size * 0.35);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
      }

      // Khởi tạo dữ liệu dải hạt bụi sao cho Cổng Không Gian Xoáy (Stardust Vortex Portal)
      const PORTAL_VORTEX_COUNT = 420;
      const portalVortexParticles = [];
      for (let i = 0; i < PORTAL_VORTEX_COUNT; i++) {
          portalVortexParticles.push({
              arm: i % 3,
              armOffset: (Math.floor(i / 3) / (PORTAL_VORTEX_COUNT / 3)),
              jitterAngle: (Math.random() - 0.5) * 0.35,
              size: 1.0 + Math.random() * 2.2,
              speed: 0.0016 + Math.random() * 0.0012,
              colorType: Math.random()
          });
      }

      // Khởi tạo dữ liệu Thiên Hà Trái Tim Hạt Tinh Tú (Heart Particle Galaxy)
      const PORTAL_HEART_COUNT = 360;
      const portalHeartParticles = [];
      for (let i = 0; i < PORTAL_HEART_COUNT; i++) {
          const t = Math.PI * 2 * (i / PORTAL_HEART_COUNT);
          // Công thức đường cong trái tim 3D
          const hx = 16 * Math.pow(Math.sin(t), 3);
          const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
          
          const isInner = Math.random() < 0.35;
          const scaleFactor = isInner ? (0.3 + 0.6 * Math.random()) : 1.0;
          const jitter = (Math.random() - 0.5) * 1.5;

          portalHeartParticles.push({
              x: hx * scaleFactor + jitter,
              y: hy * scaleFactor + jitter,
              size: 1.2 + Math.random() * 2.2,
              colorType: Math.random(),
              twinkleSpeed: 0.003 + Math.random() * 0.005,
              phase: Math.random() * Math.PI * 2
          });
      }

      /**
       * Vẽ Cổng Không Gian Xoáy Bụi Sao (thay thế vòng tròn nét kẻ cơ học).
       * Gồm các dải hạt bụi sao xoáy ốc huyền ảo nở rộng dần theo bán kính.
       */
      function drawPortalVortexStreams(ctx, cx, cy, radius, alpha, now) {
          if (radius <= 0 || alpha <= 0) return;
          ctx.save();
          ctx.globalAlpha = Math.min(1, alpha);

          // 1. Quầng sương mù năng lượng huyền ảo ở tâm cổng
          const hazeGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 1.35);
          hazeGrad.addColorStop(0, "rgba(255, 190, 235, 0.42)");
          hazeGrad.addColorStop(0.45, "rgba(235, 70, 170, 0.22)");
          hazeGrad.addColorStop(0.8, "rgba(160, 40, 210, 0.12)");
          hazeGrad.addColorStop(1, "rgba(5, 1, 10, 0)");
          ctx.fillStyle = hazeGrad;
          ctx.beginPath();
          ctx.arc(cx, cy, radius * 1.35, 0, Math.PI * 2);
          ctx.fill();

          // 2. Các dải hạt bụi sao xoáy ốc (Stardust Spiral Streams)
          const totalArms = 3;
          for (let i = 0; i < PORTAL_VORTEX_COUNT; i++) {
              const p = portalVortexParticles[i];
              // Khoảng cách bán kính tỏa dần từ tâm ra ngoài biên vòng sáng
              const r = p.armOffset * radius * 1.28 + 6;
              // Góc xoáy theo thời gian và bán kính tạo dạng xoắn ốc chuyển động
              const angle = (p.arm / totalArms) * Math.PI * 2 + now * p.speed + (r / 50) + p.jitterAngle;

              const px = cx + Math.cos(angle) * r;
              const py = cy + Math.sin(angle) * r;

              // Màu hạt bụi sao lấp lánh
              let pColor;
              if (p.colorType > 0.75) {
                  pColor = "rgba(255, 255, 255, 0.95)"; // Kim cương trắng
              } else if (p.colorType > 0.35) {
                  pColor = "rgba(255, 140, 205, 0.85)"; // Hồng neon
              } else {
                  pColor = "rgba(240, 60, 160, 0.75)";  // Hồng tím ruby
              }

              ctx.fillStyle = pColor;
              ctx.shadowColor = "#ff4da6";
              ctx.shadowBlur = 6;

              const pSize = Math.max(0.8, p.size * (0.8 + 0.4 * Math.sin(now * 0.004 + i)));
              ctx.beginPath();
              ctx.arc(px, py, pSize, 0, Math.PI * 2);
              ctx.fill();
          }

          ctx.restore();
      }

      /**
       * Vẽ Thiên Hà Trái Tim Hạt Tinh Tú (thay thế khối trái tim 2D đặc màu hồng).
       * Được cấu tạo từ hàng trăm hạt sao lấp lánh theo phương trình đường cong trái tim 3D.
       */
      function drawHeartParticleGalaxy(ctx, cx, cy, size, alpha, now) {
          if (size <= 0 || alpha <= 0) return;
          ctx.save();
          ctx.globalAlpha = Math.min(1, alpha);

          // 1. Quầng sáng êm dịu tỏa ra từ tâm cụm sao trái tim
          const glowGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * 1.5);
          glowGrad.addColorStop(0, "rgba(255, 255, 255, 0.45)");
          glowGrad.addColorStop(0.35, "rgba(255, 120, 195, 0.28)");
          glowGrad.addColorStop(0.75, "rgba(220, 40, 130, 0.14)");
          glowGrad.addColorStop(1, "rgba(5, 1, 10, 0)");
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(cx, cy, size * 1.5, 0, Math.PI * 2);
          ctx.fill();

          // 2. Nhịp đập trái tim nhẹ nhàng
          const heartbeatPulse = 1 + Math.sin(now * 0.006) * 0.045;
          const scale = (size / 16) * heartbeatPulse;

          // 3. Vẽ từng hạt tinh tú cấu thành trái tim
          for (let i = 0; i < PORTAL_HEART_COUNT; i++) {
              const p = portalHeartParticles[i];
              const px = cx + p.x * scale;
              const py = cy + p.y * scale;

              // Nhấp nháy nhẹ từng hạt tạo cảm giác thiên hà sao sống động
              const twinkle = 0.7 + Math.sin(now * p.twinkleSpeed + p.phase) * 0.3;

              let pColor;
              if (p.colorType > 0.7) {
                  pColor = `rgba(255, 255, 255, ${twinkle})`;
              } else if (p.colorType > 0.3) {
                  pColor = `rgba(255, 140, 205, ${twinkle * 0.9})`;
              } else {
                  pColor = `rgba(255, 50, 150, ${twinkle * 0.85})`;
              }

              ctx.fillStyle = pColor;
              ctx.shadowColor = "#ff2a9d";
              ctx.shadowBlur = Math.min(14, size * 0.4 + 4);

              // Khi kích thước lớn (bay lại gần), hạt sao nở to tương ứng
              const pSize = Math.max(0.9, p.size * Math.min(2.5, 0.7 + size * 0.035));
              ctx.beginPath();
              ctx.arc(px, py, pSize, 0, Math.PI * 2);
              ctx.fill();
          }

          ctx.restore();
      }
      let warpSpeed = 1.2;
      let isWarping = false;
      let warpStartTime = 0;
      let hasTransitionedToGalaxy = false;

      function renderWarpFrame() {
          if (preIntroScreen.classList.contains("is-hidden")) return;

          const ctx = warpCanvas.getContext("2d");
          const width = warpCanvas.width;
          const height = warpCanvas.height;
          const cx = width / 2;
          const cy = height / 2;

          const now = performance.now();
          const elapsedWarp = isWarping ? (now - warpStartTime) : 0;

          // Tính toán hệ số laser theo các giai đoạn
          let laserAlpha = 1.0;
          if (isWarping) {
              if (elapsedWarp < 2000) {
                  laserAlpha = 1.0;
              } else if (elapsedWarp < 3200) {
                  // Sau 2s: Laser giảm dần nhường chỗ cho vòng sáng
                  laserAlpha = 1.0 - ((elapsedWarp - 2000) / 1200) * 0.45;
              } else {
                  // Sau 3.2s: Đi qua vòng sáng, laser kết thúc hoàn toàn
                  laserAlpha = Math.max(0, 1.0 - ((elapsedWarp - 3200) / 600));
              }
          }

          if (isWarping) {
              ctx.fillStyle = "rgba(5, 1, 10, 0.22)";
              ctx.fillRect(0, 0, width, height);
          } else {
              // Nền đen vũ trụ sâu thẳm
              ctx.fillStyle = "#05010a";
              ctx.fillRect(0, 0, width, height);
          }

          // Vẽ các hạt / tia laser bay từ tâm
          warpParticles.forEach(p => {
              const previousZ = p.z;
              p.z -= warpSpeed;
              if (p.z <= 0) {
                  p.x = (Math.random() - 0.5) * 3200;
                  p.y = (Math.random() - 0.5) * 3200;
                  p.z = 2500;
              }

              p.rot += p.rotSpeed;

              const k = 800 / p.z;
              const px = cx + p.x * k;
              const py = cy + p.y * k;

              if (px < -40 || px > width + 40 || py < -40 || py > height + 40) {
                  return;
              }
              
              const depthProgress = (2500 - p.z) / 2500;
              const heartSize = (4.0 + depthProgress * 2.0) * (p.baseScale || 1);
              const alpha = Math.min(1, Math.max(0.45, depthProgress * 0.7 + 0.45));

              if (isWarping) {
                  if (laserAlpha > 0.02) {
                      const prevK = 800 / previousZ;
                      const prevPx = cx + p.x * prevK;
                      const prevPy = cy + p.y * prevK;
                      
                      ctx.save();
                      ctx.strokeStyle = p.color;
                      ctx.lineWidth = Math.max(1.5, heartSize * 0.4);
                      ctx.globalAlpha = Math.min(1, alpha * 1.2 * laserAlpha);
                      ctx.beginPath();
                      ctx.moveTo(prevPx, prevPy);
                      ctx.lineTo(px, py);
                      ctx.stroke();
                      ctx.restore();

                      drawCuteHeart(ctx, px, py, heartSize * 1.2, p.rot, p.color, alpha * laserAlpha);
                  }
              } else {
                  drawCuteHeart(ctx, px, py, heartSize, p.rot, p.color, alpha);
              }
          });

          // Hiệu ứng chuyển cảnh: Sau khoảng 2s xuất hiện vòng sáng và trái tim phóng to dần
          if (isWarping) {
              if (elapsedWarp >= 2000 && elapsedWarp < 3200) {
                  // Giai đoạn: Vòng sáng nhỏ xuất hiện ở giữa và nhìn thấy trái tim ở xa
                  const p1 = (elapsedWarp - 2000) / 1200;
                  const ringRadius = 15 + p1 * 50;
                  const ringAlpha = Math.min(1, p1 * 1.2);
                  drawPortalVortexStreams(ctx, cx, cy, ringRadius, ringAlpha, now);

                  const centerHeartSize = 6 + p1 * 14;
                  drawHeartParticleGalaxy(ctx, cx, cy, centerHeartSize, Math.min(1, p1 * 1.2), now);
              } else if (elapsedWarp >= 3200) {
                  // Giai đoạn: Bay xuyên qua vòng sáng, vòng sáng mở rộng và trái tim phóng to liên tục
                  const p2 = Math.min(1, (elapsedWarp - 3200) / 1200);
                  const easeZoom = Math.pow(p2, 2.6);
                  const maxDim = Math.max(width, height);

                  // Vòng sáng nở to bao trùm toàn bộ màn hình
                  const ringRadius = 65 + easeZoom * (maxDim * 1.4);
                  const ringAlpha = Math.max(0, 1 - p2 * 0.6);
                  drawPortalVortexStreams(ctx, cx, cy, ringRadius, ringAlpha, now);

                  // Trái tim ở giữa phóng to liên tục từ xa lại gần
                  const targetHeartMax = Math.min(width, height) * 0.22;
                  const centerHeartSize = 20 + easeZoom * targetHeartMax;
                  drawHeartParticleGalaxy(ctx, cx, cy, centerHeartSize, 1, now);
              }

              // Gia tốc laser trong 2s đầu
              if (elapsedWarp < 2500) {
                  warpSpeed = Math.min(warpSpeed * 1.055, 110);
              }

              // Bắt đầu hòa tan mượt mà sang Stage 2 tại 4.1s (cross-dissolve hoàn toàn trong không gian tối)
              if (elapsedWarp >= 4100 && !hasTransitionedToGalaxy) {
                  hasTransitionedToGalaxy = true;
                  galaxyIntroSection.classList.remove("is-hidden");
                  galaxyIntroSection.setAttribute("aria-hidden", "false");
                  initializeGalaxyIntro();
                  preIntroScreen.style.transition = "opacity 0.45s ease";
                  preIntroScreen.style.opacity = "0";
              }

              // Sau khi hòa tan hoàn toàn (4.55s), ẩn hẳn Stage 1 và ngắt vòng lặp warp
              if (elapsedWarp >= 4550) {
                  preIntroScreen.classList.add("is-hidden");
                  window.cancelAnimationFrame(warpAnimationFrame);
                  return;
              }
          } else {
              warpSpeed = 1.5;
          }

          warpAnimationFrame = window.requestAnimationFrame(renderWarpFrame);
      }

      renderWarpFrame();

      exploreHeartBtn.addEventListener("click", () => {
          isWarping = true;
          warpStartTime = performance.now();
          document.querySelector(".pre-intro-content").classList.add("is-fading-out");
      });
  }
